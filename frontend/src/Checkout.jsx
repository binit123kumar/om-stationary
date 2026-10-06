import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, Banknote, CheckCircle2, ChevronRight, Clock, CreditCard, Loader2, Lock, MapPin, Navigation, Phone, QrCode, ShieldCheck, Store, Truck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { apiBase, apiFetch, readSession } from './session.js';

const rupees = (value) => '\u20b9' + Number(value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const rupeesShort = (value) => '\u20b9' + Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
const isOnlinePayment = method => /upi/i.test(String(method || ''));

/**
 * Turns any failed fetch into a customer-safe message. Stack traces and raw HTML never reach the UI.
 */
async function readFailure(response, fallback) {
  if (response.status === 0) return 'Could not reach the OM Stationary service. Please check your connection and try again.';
  if (response.status === 429) return 'Too many requests. Please wait a moment and try again.';
  const body = await response.json().catch(() => ({}));
  const detail = body?.detail || body?.title ||
    (Array.isArray(body?.errors) && body.errors.length ? body.errors[0]?.msg : '');
  return typeof detail === 'string' && detail.trim() ? detail : fallback;
}

function useStoreConfig() {
  const [config, setConfig] = useState(null);
  useEffect(() => {
    let active = true;
    Promise.all([
      fetch(`${apiBase}/api/delivery/options`).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(`${apiBase}/api/payments/options`).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(`${apiBase}/api/locations/om-stationary`).then(r => r.ok ? r.json() : null).catch(() => null)
    ]).then(([delivery, payments, location]) => {
      if (!active) return;
      setConfig({
        delivery: delivery || { enabled: false, cities: [], charge: null },
        payments: payments || { cashOnDelivery: true, onlineUpi: false, verificationAvailable: false, taxRatePercent: 0 },
        location
      });
    });
    return () => { active = false; };
  }, []);
  return config;
}

/**
 * Blocks checkout until the customer is authenticated. The cart is never cleared or reset by the
 * detour, and after signing in the customer lands straight back on /checkout.
 */
function AuthGate({ reason }) {
  const next = '/checkout';
  return <section className="auth-3d-page">
    <div className="auth-3d-orb orb-a" /><div className="auth-3d-orb orb-b" />
    <div className="auth-3d-card">
      <div className="auth-brand-3d"><span>OM</span><div><b>OM STATIONARY</b><small>Everything you need, one place.</small></div></div>
      <small className="auth-kicker">SECURE CHECKOUT</small>
      <h1>Sign in to continue</h1>
      <p className="auth-sub">{reason || 'Checkout needs an account so your order, invoice and tracking are saved to your profile.'}</p>
      <div className="auth-gate-points">
        <p><Lock size={16} /> Your cart is kept exactly as it is</p>
        <p><ShieldCheck size={16} /> Order and invoice stay linked to your account</p>
        <p><Store size={16} /> Track every order from your account</p>
      </div>
      <div className="auth-gate-actions">
        <Link className="btn wide" to={`/login?return=${encodeURIComponent(next)}`}>Login</Link>
        <Link className="outline wide" to={`/register?return=${encodeURIComponent(next)}`}>Create account</Link>
      </div>
      <p className="auth-switch"><Link to="/cart">Back to cart</Link></p>
    </div>
  </section>;
}

function OrderTotals({ items, subtotal, discount, deliveryCharge, taxRatePercent, taxAmount, grandTotal, payableLabel = 'Grand Total', showDelivery = true }) {
  return <div className="flow-totals">
    {items.map(item => <p className="flow-item" key={item.id}>
      <span>{item.name} &times; {item.q}</span><b>{rupees(item.price * item.q)}</b>
    </p>)}
    <hr />
    <p className="flow-total"><span>Items subtotal</span><b>{rupees(subtotal)}</b></p>
    {Number(discount) > 0 && <p className="flow-total discount"><span>Discount</span><b>&minus; {rupees(discount)}</b></p>}
    <p className="flow-total"><span>Taxable value</span><b>{rupees(subtotal - (Number(discount) || 0))}</b></p>
    <p className="flow-total"><span>GST ({Number(taxRatePercent || 0).toLocaleString('en-IN')}%)</span><b>{rupees(taxAmount)}</b></p>
    {showDelivery && <p className="flow-total"><span>Delivery</span><b>{Number(deliveryCharge) > 0 ? rupees(deliveryCharge) : 'Free'}</b></p>}
    <p className="flow-grand"><span>{payableLabel}</span><b>{rupees(grandTotal)}</b></p>
  </div>;
}

/**
 * Exact-amount UPI payment step.
 *
 * The QR is rendered exclusively from the payload the backend returned for this order. If the
 * gateway/webhook is not configured the panel says so and refuses to imply a payment happened.
 */
function UpiPaymentPanel({ order, options, onVerified }) {
  const [intent, setIntent] = useState(null);
  const [state, setState] = useState('loading');
  const [message, setMessage] = useState('');
  const [checking, setChecking] = useState(false);
  const [lastStatus, setLastStatus] = useState('');
  const timerRef = useRef(null);

  const loadIntent = useCallback(async () => {
    setState('loading'); setMessage('');
    try {
      const response = await apiFetch(`/api/payments/orders/${encodeURIComponent(order.orderNumber)}/intent`, { method: 'POST' });
      if (response.status === 404) { setState('unavailable'); setMessage('This order could not be found.'); return; }
      if (!response.ok) { setState('unconfigured'); setMessage(await readFailure(response, 'Payment verification not configured.')); return; }
      const data = await response.json();
      if (data?.status === 'Paid') { setState('paid'); onVerified?.(); return; }
      if (!data?.configured || !data?.qrData) {
        setState('unconfigured');
        setMessage(data?.detail || 'Payment verification not configured.');
        return;
      }
      setIntent(data);
      setState('ready');
    } catch {
      setState('unavailable');
      setMessage('Could not start the payment. Please try again.');
    }
  }, [order.orderNumber, onVerified]);

  useEffect(() => { loadIntent(); return () => clearInterval(timerRef.current); }, [loadIntent]);

  // The backend is the only authority on payment state. This poll asks it; it never decides.
  const verify = useCallback(async () => {
    if (checking) return;
    setChecking(true); setMessage('');
    try {
      const response = await apiFetch(`/api/payments/orders/${encodeURIComponent(order.orderNumber)}/status`, { method: 'POST' });
      if (!response.ok) { setMessage(await readFailure(response, 'Could not verify the payment yet.')); return; }
      const data = await response.json();
      setLastStatus(data?.paymentStatus || data?.status || '');
      if (data?.status === 'Paid' || data?.paymentStatus === 'Paid') {
        clearInterval(timerRef.current);
        setState('paid');
        onVerified?.();
        return;
      }
      if (data?.status === 'ReviewRequired') {
        clearInterval(timerRef.current);
        setState('review');
        setMessage(data.detail || 'The gateway reported a different amount than this order total. Our team will review it.');
        return;
      }
      if (data?.status === 'Failed') {
        clearInterval(timerRef.current);
        setState('failed');
        setMessage('The payment was not completed. You can try paying again.');
        return;
      }
      setMessage(data?.detail || 'Payment not confirmed yet. Complete the UPI payment and verify again.');
    } catch {
      setMessage('Could not reach the payment service. Please try again.');
    } finally {
      setChecking(false);
    }
  }, [checking, order.orderNumber, onVerified]);

  useEffect(() => {
    if (state !== 'ready') return undefined;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(verify, 12000);
    return () => clearInterval(timerRef.current);
  }, [state, verify]);

  if (state === 'paid') {
    return <div className="payment-glass payment-state-box">
      <div className="success-check"><CheckCircle2 size={44} /></div>
      <h2>Payment verified</h2>
      <p>The OM Stationary service confirmed this payment. Your invoice is ready.</p>
      <Link className="btn wide" to={`/invoice/${encodeURIComponent(order.orderNumber)}`}>View invoice</Link>
      <Link className="outline wide" to={`/track/${encodeURIComponent(order.orderNumber)}`}>Track order</Link>
    </div>;
  }

  return <div className="payment-glass">
    <div className="payment-head">
      <span className="payment-icon"><QrCode size={24} /></span>
      <div><small>OM STATIONARY</small><h1>Pay {rupees(order.totalAmount)}</h1></div>
    </div>

    <dl className="payment-facts">
      <div><dt>Order number</dt><dd>{order.orderNumber}</dd></div>
      <div><dt>Exact amount payable</dt><dd className="payment-amount">{rupees(order.totalAmount)}</dd></div>
      <div><dt>Payment method</dt><dd>Online Payment (UPI)</dd></div>
      {options?.upiVpa && <div><dt>UPI ID</dt><dd>{options.upiVpa}</dd></div>}
      <div><dt>Payment status</dt><dd><span className="pill pending">{lastStatus || 'Pending verification'}</span></dd></div>
    </dl>

    {state === 'loading' && <p className="payment-loading"><Loader2 size={16} className="spin" /> Creating your payment request…</p>}

    {state === 'ready' && <>
      <div className="qr-shell">
        {intent.qrImageBase64
          ? <img src={`data:image/png;base64,${intent.qrImageBase64}`} alt={`UPI QR code for ${rupees(order.totalAmount)}`} width="230" height="230" />
          : <QRCodeSVG value={intent.qrData} size={230} level="M" includeMargin bgColor="#ffffff" fgColor="#0a1f38" />}
      </div>
      <p className="payment-upi">Scan with any UPI app to pay <b>{rupees(order.totalAmount)}</b>. Payment verification is unavailable; the order remains pending until the store confirms it.</p>
    </>}

    {(state === 'unconfigured' || state === 'unavailable') && <div className="payment-warning" role="alert">
      <AlertTriangle size={18} />
      <span><b>Payment verification not configured</b>{message}<br />Your order has <b>not</b> been marked as paid. Contact the store to settle this order, or place a new order using Pay on Shop.</span>
    </div>}

    {state === 'review' && <div className="payment-warning" role="alert"><AlertTriangle size={18} /><span><b>Payment needs review</b>{message}</span></div>}
    {state === 'failed' && <div className="payment-warning" role="alert"><AlertTriangle size={18} /><span><b>Payment not completed</b>{message}</span></div>}
    {state === 'ready' && message && <p className="payment-upi" role="status">{message}</p>}

    {state === 'ready' && <div className="payment-actions">
      <button className="btn wide" onClick={verify} disabled={checking}>
        {checking ? <><Loader2 size={16} className="spin" /> Verifying with OM Stationary…</> : 'I have paid — verify payment'}
      </button>
      <button className="outline wide" onClick={loadIntent}>Refresh payment QR</button>
      <Link className="outline wide" to={`/track/${encodeURIComponent(order.orderNumber)}`}>Track order</Link>
    </div>}

    <p className="payment-note"><Lock size={13} /> Your payment is confirmed only after the OM Stationary service verifies it. Do not close this page expecting an instant success.</p>
  </div>;
}

function CodConfirmation({ order, onContinue }) {
  return <div className="payment-glass payment-state-box">
    <div className="success-check cod"><Banknote size={44} /></div>
    <h2>Order placed &middot; {order.orderNumber}</h2>
    <p>Pay <b>{rupees(order.totalAmount)}</b> at the shop when you collect your order.</p>
    <p className="payment-upi">Payment status: <b>Pending &middot; Pay on Shop (COD)</b>. It only becomes Paid after the store confirms the cash receipt.</p>
    <Link className="btn wide" to={`/invoice/${encodeURIComponent(order.orderNumber)}`}>View invoice</Link>
    <Link className="outline wide" to={`/track/${encodeURIComponent(order.orderNumber)}`}>Track order</Link>
    <button className="outline wide" onClick={onContinue}>Continue shopping</button>
  </div>;
}

export function CheckoutPage({ cart, user, onCartCleared }) {
  const navigate = useNavigate();
  const config = useStoreConfig();

  const [fulfillment, setFulfillment] = useState('Pickup');
  const [payment, setPayment] = useState('COD');
  const [pickupSlot, setPickupSlot] = useState('');
  const [details, setDetails] = useState({
    customerName: '', customerPhone: '', customerEmail: '', addressLine: '', landmark: '', city: '', state: '', pincode: '', billingAddress: ''
  });
  const [coordinates, setCoordinates] = useState(null);
  const [geoError, setGeoError] = useState('');
  const [locating, setLocating] = useState(false);
  const [quote, setQuote] = useState(null);
  const [quoteError, setQuoteError] = useState('');
  const [quoting, setQuoting] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);

  const signedIn = !!readSession()?.accessToken && !!user;
  const deliveryOptions = config?.delivery;
  const paymentOptions = config?.payments;
  const pickupAvailable = config?.location?.pickupAvailable !== false;
  const deliveryAvailable = !!deliveryOptions?.enabled;
  const onlineUpiAvailable = !!paymentOptions?.onlineUpi;

  const cartSubtotal = useMemo(() => cart.reduce((sum, item) => sum + Number(item.price || 0) * item.q, 0), [cart]);
  const itemsPayload = useMemo(() => cart.map(item => ({ productId: item.id, quantity: item.q })), [cart]);

  useEffect(() => {
    if (user) setDetails(current => ({
      ...current,
      customerName: current.customerName || user.fullName || user.name || '',
      customerPhone: current.customerPhone || user.phone || '',
      customerEmail: current.customerEmail || user.email || ''
    }));
  }, [user]);

  // Delivery availability, serviceable cities and charges always come from the API.
  useEffect(() => {
    if (!deliveryOptions) return;
    if (deliveryOptions.cities?.length === 1) {
      setDetails(current => ({ ...current, city: current.city || deliveryOptions.cities[0] }));
    }
    if (!deliveryAvailable && fulfillment === 'Delivery') setFulfillment('Pickup');
  }, [deliveryOptions, deliveryAvailable, fulfillment]);

  useEffect(() => {
    if (fulfillment !== 'Pickup') return;
    const fallback = new Date(Date.now() + 60 * 60 * 1000);
    fallback.setMinutes(0, 0, 0);
    setPickupSlot(current => current || toLocalInputValue(fallback));
  }, [fulfillment]);

  useEffect(() => { setQuote(null); setQuoteError(''); }, [fulfillment, coordinates, details.pincode, details.city, itemsPayload]);

  // Pickup slots: the next three 30-minute windows, bounded by the configured shop hours.
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
    if (!navigator.geolocation) { setGeoError('This device cannot share a location. Delivery needs it to confirm the distance.'); return; }
    setLocating(true); setGeoError('');
    navigator.geolocation.getCurrentPosition(
      position => { setCoordinates({ latitude: position.coords.latitude, longitude: position.coords.longitude }); setLocating(false); },
      () => { setGeoError('Location permission was denied. Delivery needs your location to confirm the delivery distance.'); setLocating(false); },
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

  const setDetail = (key) => (event) => {
    const value = event.target.value;
    setDetails(current => ({ ...current, [key]: value }));
    setFieldErrors(current => (current[key] ? { ...current, [key]: '' } : current));
  };

  const validate = () => {
    const found = {};
    if (!details.customerName.trim()) found.customerName = 'Full name is required.';
    if (!/^[6-9]\d{9}$/.test(details.customerPhone.replace(/\D/g, '').slice(-10))) found.customerPhone = 'Enter a valid 10 digit mobile number.';
    if (details.customerEmail.trim() && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(details.customerEmail.trim())) found.customerEmail = 'Enter a valid email address.';
    if (fulfillment === 'Pickup') {
      if (!pickupSlot) found.pickupSlot = 'Choose a pickup date and time.';
      else if (new Date(pickupSlot).getTime() <= Date.now()) found.pickupSlot = 'Choose a pickup time in the future.';
    }
    if (fulfillment === 'Delivery') {
      if (!details.addressLine.trim()) found.addressLine = 'Address is required for delivery.';
      if (!details.state.trim()) found.state = 'State is required for delivery.';
      if (!/^\d{6}$/.test(details.pincode.trim())) found.pincode = 'Enter a valid 6 digit PIN code.';
      if (!details.city.trim()) found.city = 'City is required for delivery.';
      if (!coordinates) found.pincode = found.pincode || 'Share your location so the store can confirm the delivery distance.';
    }
    setFieldErrors(found);
    return Object.keys(found).length === 0;
  };

  const requestQuote = async () => {
    if (!validate()) return;
    setQuoting(true); setError('');
    try {
      const response = await apiFetch('/api/delivery/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fulfillmentMethod: 'Delivery', city: details.city.trim(), pincode: details.pincode.trim(),
          latitude: coordinates?.latitude, longitude: coordinates?.longitude,
          couponCode: couponCode.trim(), items: itemsPayload
        })
      });
      if (!response.ok) { setQuote(null); setQuoteError(await readFailure(response, 'Could not check delivery availability.')); return; }
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

  const applyCoupon = async () => {
    setCouponMessage(''); setCoupon(null);
    if (!couponCode.trim()) { setCouponMessage('Enter a coupon code first.'); return; }
    try {
      const response = await apiFetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim(), items: itemsPayload })
      });
      if (!response.ok) { setCouponMessage(await readFailure(response, 'This coupon is not valid.')); return; }
      const data = await response.json();
      setCoupon(data);
      setCouponMessage(`Coupon applied. You save ${rupees(data.discountAmount ?? 0)}.`);
    } catch {
      setCouponMessage('Could not reach the coupon service. Please try again.');
    }
  };

  const placeOrder = async () => {
    if (placing || order) return;
    if (!validate()) { setError('Please correct the highlighted fields.'); return; }
    if (fulfillment === 'Delivery' && !quote?.available) { setError('Please refresh the delivery quote before placing the order.'); return; }
    if (payment === 'UPI' && !onlineUpiAvailable) { setError('Online payment is not available. Choose Pay on Shop.'); return; }
    setPlacing(true); setError('');
    try {
      const response = await apiFetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
        })
      });
      if (!response.ok) { setError(await readFailure(response, 'Your order could not be placed. Please try again.')); return; }
      const created = await response.json();
      // Persist the tracking token the API returned so the customer can return to this real order.
      rememberOrder(created.orderNumber, created.trackingToken);
      // Snapshot the confirmed lines from the order response: the cart is cleared immediately
      // afterwards, so the confirmation screen cannot read them from `cart` any more.
      setOrder({
        ...created,
        confirmedItems: (created.items || []).map((line, index) => ({
          id: line.productId ?? `line-${index}`,
          name: line.productName,
          q: line.quantity,
          price: line.unitPrice
        }))
      });
      onCartCleared?.();
    } catch {
      setError('Could not reach the OM Stationary service. Your order was not placed. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (!signedIn) return <AuthGate reason="Please sign in or create an account to place this order. Your cart is saved and will still be here when you return." />;

  if (!cart.length && !order) return <div className="empty">
    <Store size={44} /><h1>Your cart is empty</h1><p>Add something to your cart before checking out.</p>
    <Link className="btn" to="/search">Continue shopping</Link>
  </div>;

  if (!config) return <div className="catalog-state">Loading checkout options…</div>;

  if (order) {
    const onlinePending = isOnlinePayment(order.paymentMethod);
    return <section className="checkout-flow-3d">
      <div className="payment-3d-page-wrap">
        {onlinePending
          ? <UpiPaymentPanel order={order} options={paymentOptions} onVerified={() => {}} />
          : <CodConfirmation order={order} onContinue={() => navigate('/search')} />}
      </div>
      <aside className="flow-summary-card">
        <h3>Order placed</h3>
        <dl className="flow-facts">
          <div><dt>Order number</dt><dd>{order.orderNumber}</dd></div>
          <div><dt>Fulfillment</dt><dd>{order.fulfillmentMethod}</dd></div>
          <div><dt>Payment method</dt><dd>{isOnlinePayment(order.paymentMethod) ? 'Online Payment (UPI)' : 'Pay on Shop (COD)'}</dd></div>
          <div><dt>Payment status</dt><dd>{order.paymentStatus}</dd></div>
          <div><dt>Invoice</dt><dd>{order.invoiceNumber || 'Generated'}</dd></div>
        </dl>
        <OrderTotals items={order.confirmedItems || []} subtotal={order.subtotal} discount={order.discountAmount}
          deliveryCharge={order.deliveryCharge} taxRatePercent={taxRate} taxAmount={order.taxAmount}
          grandTotal={order.totalAmount} payableLabel="Amount payable" />
        <small>The store verifies stock, pricing and delivery charges on the server. The invoice is generated from this confirmed order.</small>
      </aside>
    </section>;
  }

  return <section className="checkout-flow-3d">
    <div className="flow-main-card">
      <div className="flow-title">
        <small>SECURE CHECKOUT</small>
        <h1>Complete your order</h1>
        <p>Prices, stock and delivery charges are verified by OM Stationary before the order is saved.</p>
      </div>

      <div className="flow-section">
        <h2 className="flow-sub">Fulfillment</h2>
        <div className="payment-choice-grid">
          <label className={fulfillment === 'Pickup' ? 'payment-choice selected' : 'payment-choice'}>
            <input type="radio" name="fulfillment" checked={fulfillment === 'Pickup'} disabled={!pickupAvailable}
              onChange={() => setFulfillment('Pickup')} />
            <Store size={22} /><span><b>Pickup</b><small>{pickupAvailable ? 'Collect from OM Stationary' : 'Pickup is being configured'}</small></span>
          </label>
          <label className={fulfillment === 'Delivery' ? 'payment-choice selected' : 'payment-choice'}>
            <input type="radio" name="fulfillment" checked={fulfillment === 'Delivery'} disabled={!deliveryAvailable}
              onChange={() => setFulfillment('Delivery')} />
            <Truck size={22} /><span><b>Delivery</b><small>{deliveryAvailable ? `From ${rupeesShort(deliveryOptions.charge ?? 0)} in serviceable PIN codes` : 'Delivery is not available right now'}</small></span>
          </label>
        </div>

        {fulfillment === 'Pickup' && <div className="pickup-panel">
          <p className="pickup-address">{config.location?.address || 'The OM Stationary pickup address is being configured.'}</p>
          {config.location?.hours && <p className="pickup-meta"><Clock size={15} /> {config.location.hours}</p>}
          {config.location?.phone && <a className="pickup-meta" href={`tel:${config.location.phone}`}><Phone size={15} /> {config.location.phone}</a>}
          <label className="flow-field">Pickup date &amp; time
            <select value={pickupSlot} onChange={event => setPickupSlot(event.target.value)}>
              <option value="">Select a pickup slot</option>
              {pickupSlots.map(slot => <option key={slot} value={slot}>{formatSlot(slot)}</option>)}
            </select>
          </label>
          {fieldErrors.pickupSlot && <small className="field-error" role="alert">{fieldErrors.pickupSlot}</small>}
        </div>}

        {fulfillment === 'Delivery' && <div className="delivery-panel">
          <div className="flow-fields">
            <label className="flow-field flow-field-wide">Address
              <input value={details.addressLine} onChange={setDetail('addressLine')} maxLength={300} placeholder="House / street" autoComplete="street-address" />
              {fieldErrors.addressLine && <small className="field-error" role="alert">{fieldErrors.addressLine}</small>}
            </label>
            <label className="flow-field">Landmark (optional)
              <input value={details.landmark} onChange={setDetail('landmark')} maxLength={300} />
            </label>
            <label className="flow-field">City
              <select value={details.city} onChange={setDetail('city')}>
                {(deliveryOptions.cities || []).map(city => <option key={city} value={city}>{city}</option>)}
              </select>
              {fieldErrors.city && <small className="field-error" role="alert">{fieldErrors.city}</small>}
            </label>
            <label className="flow-field">State
              <input value={details.state} onChange={setDetail('state')} maxLength={80} placeholder="Bihar" autoComplete="address-state" />
              {fieldErrors.state && <small className="field-error" role="alert">{fieldErrors.state}</small>}
            </label>
            <label className="flow-field">PIN code
              <input value={details.pincode} onChange={setDetail('pincode')} maxLength={6} inputMode="numeric" placeholder="800007" autoComplete="postal-code" />
              {fieldErrors.pincode && <small className="field-error" role="alert">{fieldErrors.pincode}</small>}
            </label>
          </div>
          <div className="geo-row">
            <button type="button" className="outline" onClick={requestLocation} disabled={locating}>
              <Navigation size={16} /> {locating ? 'Locating…' : coordinates ? 'Location confirmed — update' : 'Use my location'}
            </button>
            {geoError && <small role="alert">{geoError}</small>}
          </div>
          <button type="button" className="btn" onClick={requestQuote} disabled={quoting || !coordinates}>
            {quoting ? 'Checking availability…' : 'Check delivery availability & price'}
          </button>
          {quote?.available
            ? <p className="quote-ok"><CheckCircle2 size={16} /> Delivery available &middot; charge {rupees(quote.deliveryCharge)} &middot; stock verified</p>
            : quoteError && <p className="quote-bad" role="status">{quoteError}</p>}
        </div>}
      </div>

      <div className="flow-section">
        <h2 className="flow-sub">Customer details</h2>
        <div className="flow-fields">
          <label className="flow-field">Full name
            <input value={details.customerName} onChange={setDetail('customerName')} maxLength={120} autoComplete="name" />
            {fieldErrors.customerName && <small className="field-error" role="alert">{fieldErrors.customerName}</small>}
          </label>
          <label className="flow-field">Mobile number
            <input value={details.customerPhone} onChange={setDetail('customerPhone')} maxLength={15} inputMode="numeric" autoComplete="tel" placeholder="10 digit mobile" />
            {fieldErrors.customerPhone && <small className="field-error" role="alert">{fieldErrors.customerPhone}</small>}
          </label>
          <label className="flow-field flow-field-wide">Email address
            <input type="email" value={details.customerEmail} onChange={setDetail('customerEmail')} maxLength={254} autoComplete="email" placeholder="For your invoice and order updates" />
            {fieldErrors.customerEmail && <small className="field-error" role="alert">{fieldErrors.customerEmail}</small>}
          </label>
          {fulfillment === 'Delivery' && <label className="flow-field flow-field-wide">Billing address (optional)
            <input value={details.billingAddress} onChange={setDetail('billingAddress')} maxLength={600} placeholder="Leave blank to use your delivery address" />
          </label>}
        </div>
      </div>

      <div className="flow-section">
        <h2 className="flow-sub">Payment method</h2>
        <div className="payment-choice-grid">
          <label className={payment === 'UPI' ? 'payment-choice selected' : 'payment-choice'}>
            <input type="radio" name="payment" checked={payment === 'UPI'} disabled={!onlineUpiAvailable} onChange={() => setPayment('UPI')} />
            <QrCode size={22} /><span><b>Online Payment (UPI)</b><small>{onlineUpiAvailable ? `Pay the exact amount by QR (${paymentOptions.onlineProvider})` : 'Not available for this store yet'}</small></span>
          </label>
          <label className={payment === 'COD' ? 'payment-choice selected' : 'payment-choice'}>
            <input type="radio" name="payment" checked={payment === 'COD'} onChange={() => setPayment('COD')} />
            <Banknote size={22} /><span><b>Pay on Shop (COD)</b><small>Pay cash when you collect your order</small></span>
          </label>
        </div>
        <p className="payment-note"><ShieldCheck size={13} /> {payment === 'COD'
          ? 'Your order stays Pending until the store confirms the cash receipt. It is never marked paid automatically.'
          : 'You will get an exact-amount UPI QR. The order stays Pending until our payment service verifies your payment.'}</p>
      </div>
    </div>

    <aside className="flow-summary-card">
      <h3>Order summary</h3>
      <OrderTotals items={cart} subtotal={subtotal} discount={discount} deliveryCharge={deliveryCharge}
        taxRatePercent={taxRate} taxAmount={taxAmount} grandTotal={grandTotal}
        payableLabel={payment === 'UPI' ? 'Exact payable amount' : 'Grand Total'} />

      <div className="coupon-entry">
        <label className="flow-field">Coupon code
          <input value={couponCode} onChange={event => { setCouponCode(event.target.value.toUpperCase()); setCoupon(null); setCouponMessage(''); }} maxLength={40} placeholder="Enter code" />
        </label>
        <button type="button" className="outline" onClick={applyCoupon}>Apply</button>
        {couponMessage && <small role="status">{couponMessage}</small>}
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="btn wide" disabled={!readyForOrder || (payment === 'UPI' && !onlineUpiAvailable)} onClick={placeOrder}>
        {placing ? 'Placing your order…' : payment === 'UPI' ? `Pay ${rupees(grandTotal)} by UPI` : 'Place order · Pay on Shop'}
      </button>
      <small><Lock size={12} /> Stock, price, delivery charge and GST are re-verified by the API before your order is saved.</small>
      <Link className="outline wide" to="/cart">Back to cart</Link>
    </aside>
  </section>;
}

function toMinutes(value) {
  const [hours, minutes] = String(value || '0:0').split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

function toLocalInputValue(date) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function formatSlot(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export function rememberOrder(orderNumber, trackingToken) {
  try {
    const saved = JSON.parse(localStorage.getItem('omorders') || '[]');
    localStorage.setItem('omorders', JSON.stringify([orderNumber, ...(Array.isArray(saved) ? saved.filter(x => x !== orderNumber) : [])].slice(0, 12)));
    if (trackingToken) localStorage.setItem(`omtrack:${orderNumber}`, trackingToken);
  } catch { /* tracking still works for a signed-in owner */ }
}
