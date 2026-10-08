// Cart preview shows only values it can calculate reliably. Checkout
// obtains tax, coupon and delivery values from the existing API.
export function CartTotals({ cart }) {
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.q, 0);

  const inr = (value) => '₹' + Number(value).toLocaleString('en-IN');

  return (
    <>
      <p><span>Items subtotal</span><b>{inr(subtotal)}</b></p>
      <p><span>Delivery, tax &amp; coupon</span><b>At checkout</b></p>
      <hr />
      <p className="total">
        <span>Grand Total</span>
        <b>{inr(subtotal)}</b>
      </p>
    </>
  );
}
