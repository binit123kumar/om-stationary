// Exact-amount UPI payment step.
//
// The QR is rendered exclusively from the payload the backend returned
// for this order. If the gateway/webhook is not configured the panel
// says so and refuses to imply a payment happened.
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle, CheckCircle2, Loader2, Lock, QrCode
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { createPaymentIntent, verifyPayment } from '../../services/paymentService.js';
import { readFailure } from '../../services/api.js';
import { rupees } from '../../utils/formatCurrency.js';

export function UpiPaymentPanel({ order, options, onVerified }) {
  const [intent, setIntent] = useState(null);
  const [state, setState] = useState('loading');
  const [message, setMessage] = useState('');
  const [checking, setChecking] = useState(false);
  const [lastStatus, setLastStatus] = useState('');
  const timerRef = useRef(null);

  const loadIntent = useCallback(async () => {
    setState('loading');
    setMessage('');
    try {
      const response = await createPaymentIntent(order.orderNumber);
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

  useEffect(() => {
    loadIntent();
    return () => clearInterval(timerRef.current);
  }, [loadIntent]);

  // The backend is the only authority on payment state. This poll asks it; it never decides.
  const verify = useCallback(async () => {
    if (checking) return;
    setChecking(true);
    setMessage('');
    try {
      const response = await verifyPayment(order.orderNumber);
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
    return (
      <div className="payment-glass payment-state-box">
        <div className="success-check"><CheckCircle2 size={44} /></div>
        <h2>Payment verified</h2>
        <p>The OM Stationary service confirmed this payment. Your invoice is ready.</p>
        <Link className="btn wide" to={`/invoice/${encodeURIComponent(order.orderNumber)}`}>View invoice</Link>
        <Link className="outline wide" to={`/track/${encodeURIComponent(order.orderNumber)}`}>Track order</Link>
      </div>
    );
  }

  return (
    <div className="payment-glass">
      <div className="payment-head">
        <span className="payment-icon"><QrCode size={24} /></span>
        <div>
          <small>OM STATIONARY</small>
          <h1>Pay {rupees(order.totalAmount)}</h1>
        </div>
      </div>

      <dl className="payment-facts">
        <div><dt>Order number</dt><dd>{order.orderNumber}</dd></div>
        <div><dt>Exact amount payable</dt><dd className="payment-amount">{rupees(order.totalAmount)}</dd></div>
        <div><dt>Payment method</dt><dd>Online Payment (UPI)</dd></div>
        {options?.upiVpa && <div><dt>UPI ID</dt><dd>{options.upiVpa}</dd></div>}
        <div><dt>Payment status</dt><dd><span className="pill pending">{lastStatus || 'Pending verification'}</span></dd></div>
      </dl>

      {state === 'loading' && (
        <p className="payment-loading">
          <Loader2 size={16} className="spin" /> Creating your payment request…
        </p>
      )}

      {state === 'ready' && (
        <>
          <div className="qr-shell">
            {intent.qrImageBase64
              ? (
                <img
                  src={`data:image/png;base64,${intent.qrImageBase64}`}
                  alt={`UPI QR code for ${rupees(order.totalAmount)}`}
                  width="230"
                  height="230"
                />
              )
              : <QRCodeSVG value={intent.qrData} size={230} level="M" includeMargin bgColor="#ffffff" fgColor="#0a1f38" />}
          </div>
          <p className="payment-upi">
            Scan with any UPI app to pay <b>{rupees(order.totalAmount)}</b> &mdash;
            the QR is generated by our payment gateway for this exact order total.
          </p>
        </>
      )}

      {(state === 'unconfigured' || state === 'unavailable') && (
        <div className="payment-warning" role="alert">
          <AlertTriangle size={18} />
          <span>
            <b>Payment verification not configured</b>{message}<br />
            Your order has <b>not</b> been marked as paid. Contact the store to settle this order,
            or place a new order using Pay on Shop.
          </span>
        </div>
      )}

      {state === 'review' && (
        <div className="payment-warning" role="alert">
          <AlertTriangle size={18} /><span><b>Payment needs review</b>{message}</span>
        </div>
      )}
      {state === 'failed' && (
        <div className="payment-warning" role="alert">
          <AlertTriangle size={18} /><span><b>Payment not completed</b>{message}</span>
        </div>
      )}
      {state === 'ready' && message && <p className="payment-upi" role="status">{message}</p>}

      {state === 'ready' && (
        <div className="payment-actions">
          <button className="btn wide" onClick={verify} disabled={checking}>
            {checking
              ? (<><Loader2 size={16} className="spin" /> Verifying with OM Stationary…</>)
              : 'I have paid — verify payment'}
          </button>
          <button className="outline wide" onClick={loadIntent}>Refresh payment QR</button>
          <Link className="outline wide" to={`/track/${encodeURIComponent(order.orderNumber)}`}>Track order</Link>
        </div>
      )}

      <p className="payment-note">
        <Lock size={13} /> Your payment is confirmed only after the OM Stationary service verifies it.
        Do not close this page expecting an instant success.
      </p>
    </div>
  );
}
