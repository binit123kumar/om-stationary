// Checkout page.
//
// Flow: fulfilment choice -> customer details -> payment method ->
// place order -> real payment step (/payment) or COD confirmation
// (/order-success). Stock, price, delivery charge and GST are always
// re-verified by the API before the order is saved.
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Lock, Navigation, Phone, ShieldCheck, Store } from 'lucide-react';
import { apiFetch, readFailure } from '../../services/api.js';
import { createOrder } from '../../services/orderService.js';
import { readSession } from '../../services/session.js';
import { AuthGate } from '../../components/checkout/AuthGate.jsx';
import { AddressForm } from '../../components/checkout/AddressForm.jsx';
import { CouponBox } from '../../components/checkout/CouponBox.jsx';
import { CustomerDetailsForm } from '../../components/checkout/CustomerDetailsForm.jsx';
import { DeliveryMethodSelector } from '../../components/checkout/DeliveryMethodSelector.jsx';
import { OrderSummary } from '../../components/checkout/OrderSummary.jsx';
import { PaymentMethodSelector } from '../../components/checkout/PaymentMethodSelector.jsx';
import { PlaceOrderButton } from '../../components/checkout/PlaceOrderButton.jsx';
import { useStoreConfig } from '../../hooks/useDelivery.js';
import { rememberOrder } from '../../utils/storage.js';
import { formatSlot, toLocalInputValue, toMinutes } from '../../utils/formatDate.js';
import { rupees, rupeesShort } from '../../utils/formatCurrency.js';
import { validateCheckoutDetails } from '../../utils/validation.js';

export function CheckoutPage({ cart, user, onCartCleared }) {
  const navigate = useNavigate();
  const config = useStoreConfig();

  const [fulfillment, setFulfillment] = useState('Pickup');
  const [payment, setPayment] = useState('COD');
  const [pickupSlot, setPickupSlot] = useState('');
  const [details, setDetails] = useState({
    customerName: '', customerPhone: '', customerEmail: '',
    addressLine: '', landmark: '', city: '', state: '', pincode: '', billingAddress: ''
  });
  const [coordinates, setCoordinates] = useState(null);
  const [geoError, setGeoError] = useState('');
  const [locating, setLocating] = useState(false);
  const [quote, setQuote] = useState(null);
  const [quoteError, setQuoteError] = useState('');
  const [quoting, setQuoting] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [placing, setPlacing] = useState(false);

  const signedIn = !!readSession()?.accessToken && !!user;
  const deliveryOptions = config?.delivery;
  const paymentOptions = config?.payments;
  const pickupAvailable = config?.location?.pickupAvailable !== false;
  const deliveryAvailable = !!deliveryOptions?.enabled;
  const onlineUpiAvailable = !!paymentOptions?.onlineUpi;

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price || 0) * item.q, 0),
    [cart]
  );
  const itemsPayload = useMemo(
    () => cart.map((item) => ({ productId: item.id, quantity: item.q })),
    [cart]
  );

  useEffect(() => {
    if (user) {
      setDetails((current) => ({
        ...current,
        customerName: current.customerName || user.fullName || user.name || '',
        customerPhone: current.customerPhone || user.phone || '',
        customerEmail: current.customerEmail || user.email || ''
      }));
    }
  }, [user]);

  // Delivery availability, serviceable cities and charges always come from the API.
  useEffect(() => {
    if (!deliveryOptions) return;
    if (deliveryOptions.cities?.length === 1) {
      setDetails((current) => ({ ...current, city: current.city || deliveryOptions.cities[0] }));
    }
    if (!deliveryAvailable && fulfillment === 'Delivery') setFulfillment('Pickup');
  }, [deliveryOptions, deliveryAvailable, fulfillment]);

  useEffect(() => {
    if (fulfillment !== 'Pickup') return;
    const fallback = new Date(Date.now() + 60 * 60 * 1000);
    fallback.setMinutes(0, 0, 0);
    setPickupSlot((current) => current || toLocalInputValue(fallback));
  }, [fulfillment]);

  useEffect(() => { setQuote(null); setQuoteError(''); }, [fulfillment, coordinates, details.pincode, details.city, itemsPayload]);

  // Pickup slots: the next three 30-minute windows, bounded by the
  // configured shop hours.
  const pickupSlots = useMemo(() => {
    const opens = config?.location?.opensAt || '09:00';
    const closes = config?.location?.closesAt || '21:00';
    const slots = [];
    const cursor = new Date();
    cursor.setMinutes(cursor.getMinutes() <= 30 ? 30 : 60, 0, 0);
    for (let dayOffset = 0; dayOffset < 3 && slots.length < 8; dayOffset++) {
      const candidate = new Date(cursor.getTime() + dayOffset * 86400000);
      const minutes = candidate.getHours() * 60 + candidate.getMinutes();
      if (minutes < toMinutes(opens) || minutes >= toMinutes(closes)) continue;
      slots.push(toLocalInputValue(candidate));
    }
    return slots;
  }, [config]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('This device cannot share a location. Delivery needs it to confirm the distance.');
      return;
    }
    setLocating(true);
    setGeoError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        setLocating(false);
      },
      () => {
        setGeoError('Location permission was denied. Delivery needs your location to confirm the delivery distance.');
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const subtotal = Number(quote?.subtotal ?? cartSubtotal);
  const discount = Number(quote?.discountAmount ?? coupon?.discountAmount ?? 0);
  const taxRate = Number(paymentOptions?.taxRatePercent ?? 0);
  const taxAmount = Number(quote?.taxAmount ?? 0);
  const deliveryCharge = fulfillment === 'Pickup' ? 0 : Number(quote?.deliveryCharge ?? 0);
  const grandTotal = Number(quote?.total ?? (subtotal + deliveryCharge - discount + taxAmount));

  const readyForOrder = useMemo(() => {
    if (!cart.length || placing) return false;
    if (fulfillment === 'Delivery' && !quote?.available) return false;
    if (fulfillment === 'Pickup' && !pickupSlot) return false;
    return true;
  }, [cart.length, placing, fulfillment, quote, pickupSlot]);

  const setDetail = (key) => (value) => {
    setDetails((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => (current[key] ? { ...current, [key]: '' } : current));
  };

  const validate = () => {
    const found = validateCheckoutDetails(details, fulfillment, pickupSlot);
    if (fulfillment === 'Delivery' && !coordinates) {
      found.pincode = found.pincode || 'Share your location so the store can confirm the delivery distance.';
    }
    setFieldErrors(found);
    return Object.keys(found).length === 0;
  };

  const requestQuote = async () => {
    if (!validate()) return;
    setQuoting(true);
    setError('');
    try {
      const response = await apiFetch('/api/delivery/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fulfillmentMethod: 'Delivery',
          city: details.city.trim(),
          pincode: details.pincode.trim(),
          latitude: coordinates?.latitude,
          longitude: coordinates?.longitude,
          couponCode: couponCode.trim(),
          items: itemsPayload
        })
      });
      if (!response.ok) {
        setQuote(null);
        setQuoteError(await readFailure(response, 'Could not check delivery availability.'));
        return;
      }
      const data = await response.json();
      setQuote(data.available ? data : null);
      setQuoteError(data.available ? '' : data.reason || 'Delivery is not available for this address right now.');
    } catch {
      setQuote(null);
      setQuoteError('Could not reach the delivery service. Please try again.');
    } finally {
      setQuoting(false);
    }
  };

  const placeOrder = async () => {
    if (placing) return;
    if (!validate()) { setError('Please correct the highlighted fields.'); return; }
    if (fulfillment === 'Delivery' && !quote?.available) {
      setError('Please refresh the delivery quote before placing the order.');
      return;
    }
    if (payment === 'UPI' && !onlineUpiAvailable) {
      setError('Online payment is not available. Choose Pay on Shop.');
      return;
    }
    setPlacing(true);
    setError('');
    try {
      const response = await createOrder({
        customerName: details.customerName.trim(),
        customerPhone: details.customerPhone.replace(/\D/g, '').slice(-10),
        customerEmail: details.customerEmail.trim(),
        billingAddress: details.billingAddress.trim(),
        fulfillmentMethod: fulfillment,
        // The API names the two real flows; "Pay on Shop" is the COD path.
        paymentMethod: payment === 'UPI' ? 'UPI' : 'COD',
        quotedTotal: fulfillment === 'Delivery' ? grandTotal : null,
        couponCode: couponCode.trim(),
        requestedPickupDate: fulfillment === 'Pickup' ? new Date(pickupSlot).toISOString() : null,
        addressLine: details.addressLine.trim(),
        landmark: details.landmark.trim(),
        city: details.city.trim(),
        state: details.state.trim(),
        pincode: details.pincode.trim(),
        latitude: coordinates?.latitude,
        longitude: coordinates?.longitude,
        items: itemsPayload
      });
      if (!response.ok) {
        setError(await readFailure(response, 'Your order could not be placed. Please try again.'));
        return;
      }
      const created = await response.json();
      // Persist the tracking token the API returned so the customer can
      // return to this real order.
      rememberOrder(created.orderNumber, created.trackingToken);
      // The payment step reads the confirmed order from the API using the
      // tracking token, so nothing is passed through the URL payload.
      onCartCleared?.();
      navigate(
        payment === 'UPI'
          ? `/payment?order=${encodeURIComponent(created.orderNumber)}`
          : `/order-success?order=${encodeURIComponent(created.orderNumber)}`,
        { replace: true }
      );
    } catch {
      setError('Could not reach the OM Stationary service. Your order was not placed. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (!signedIn) {
    return (
      <AuthGate reason="Please sign in or create an account to place this order. Your cart is saved and will still be here when you return." />
    );
  }

  if (!cart.length) {
    return (
      <div className="empty">
        <Store size={44} />
        <h1>Your cart is empty</h1>
        <p>Add something to your cart before checking out.</p>
        <Link className="btn" to="/search">Continue shopping</Link>
      </div>
    );
  }

  if (!config) return <div className="catalog-state">Loading checkout options…</div>;

  return (
    <section className="checkout-flow-3d">
      <div className="flow-main-card">
        <div className="flow-title">
          <small>SECURE CHECKOUT</small>
          <h1>Complete your order</h1>
          <p>Prices, stock and delivery charges are verified by OM Stationary before the order is saved.</p>
        </div>

        <div className="flow-section">
          <h2 className="flow-sub">Fulfillment</h2>
          <DeliveryMethodSelector
            fulfillment={fulfillment}
            pickupAvailable={pickupAvailable}
            deliveryAvailable={deliveryAvailable}
            deliveryOptions={deliveryOptions}
            onChange={setFulfillment}
          />

          {fulfillment === 'Pickup' && (
            <div className="pickup-panel">
              <p className="pickup-address">
                {config.location?.address || 'The OM Stationary pickup address is being configured.'}
              </p>
              {config.location?.hours && (
                <p className="pickup-meta"><Clock size={15} /> {config.location.hours}</p>
              )}
              {config.location?.phone && (
                <a className="pickup-meta" href={`tel:${config.location.phone}`}>
                  <Phone size={15} /> {config.location.phone}
                </a>
              )}
              <label className="flow-field">
                Pickup date &amp; time
                <select value={pickupSlot} onChange={(event) => setPickupSlot(event.target.value)}>
                  <option value="">Select a pickup slot</option>
                  {pickupSlots.map((slot) => (
                    <option key={slot} value={slot}>{formatSlot(slot)}</option>
                  ))}
                </select>
              </label>
              {fieldErrors.pickupSlot && (
                <small className="field-error" role="alert">{fieldErrors.pickupSlot}</small>
              )}
            </div>
          )}

          {fulfillment === 'Delivery' && (
            <AddressForm
              details={{ ...details, coordinatesConfirmed: !!coordinates }}
              errors={fieldErrors}
              cities={deliveryOptions.cities}
              locating={locating}
              quoting={quoting}
              geoError={geoError}
              quote={quote}
              quoteError={quoteError}
              onField={(key, value) => {
                setDetail(key)(value);
              }}
              onRequestLocation={requestLocation}
              onRequestQuote={requestQuote}
            />
          )}
        </div>

        <div className="flow-section">
          <h2 className="flow-sub">Customer details</h2>
          <CustomerDetailsForm
            details={details}
            errors={fieldErrors}
            onChange={(key, value) => {
              setDetail(key)(value);
            }}
          />
          {fulfillment === 'Delivery' && (
            <label className="flow-field flow-field-wide">
              Billing address (optional)
              <input
                value={details.billingAddress}
                maxLength={600}
                placeholder="Leave blank to use your delivery address"
                onChange={(event) => setDetail('billingAddress')(event.target.value)}
              />
            </label>
          )}
        </div>

        <div className="flow-section">
          <h2 className="flow-sub">Payment method</h2>
          <PaymentMethodSelector
            payment={payment}
            onlineUpiAvailable={onlineUpiAvailable}
            paymentOptions={paymentOptions}
            onChange={setPayment}
          />
          <p className="payment-note">
            <ShieldCheck size={13} />
            {payment === 'COD'
              ? ' Your order stays Pending until the store confirms the cash receipt. It is never marked paid automatically.'
              : ' You will get an exact-amount UPI QR. The order stays Pending until our payment service verifies your payment.'}
          </p>
        </div>
      </div>

      <aside className="flow-summary-card">
        <h3>Order summary</h3>
        <OrderSummary
          items={cart}
          subtotal={subtotal}
          discount={discount}
          deliveryCharge={deliveryCharge}
          taxRatePercent={taxRate}
          taxAmount={taxAmount}
          grandTotal={grandTotal}
          payableLabel={payment === 'UPI' ? 'Exact payable amount' : 'Grand Total'}
        />

        <CouponBox
          code={couponCode}
          onCodeChange={setCouponCode}
          items={itemsPayload}
          applied={coupon}
          onApplied={setCoupon}
        />

        {error && <p className="form-error" role="alert">{error}</p>}
        <PlaceOrderButton
          placing={placing}
          ready={readyForOrder}
          payment={payment}
          onlineUpiAvailable={onlineUpiAvailable}
          grandTotal={grandTotal}
          onPlace={placeOrder}
        />
        <small>
          <Lock size={12} /> Stock, price, delivery charge and GST are re-verified
          by the API before your order is saved.
        </small>
        <Link className="outline wide" to="/cart">Back to cart</Link>
      </aside>
    </section>
  );
}
