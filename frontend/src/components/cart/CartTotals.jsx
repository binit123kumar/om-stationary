// Cart money breakdown. The storefront shows the item subtotal;
// delivery charges and coupons are quoted by the API at checkout,
// so they are deliberately zero here rather than invented.
export function CartTotals({ cart }) {
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.q, 0);
  const gst = 0;
  const delivery = 0;
  const total = subtotal + gst + delivery;

  const inr = (value) => '₹' + Number(value).toLocaleString('en-IN');

  return (
    <>
      <p><span>Items subtotal</span><b>{inr(subtotal)}</b></p>
      <p><span>Discount</span><b>&#8377;0</b></p>
      <p><span>Taxable value</span><b>{inr(subtotal)}</b></p>
      <p><span>GST (0%)</span><b>{inr(gst)}</b></p>
      <p>
        <span>Delivery</span>
        <b>{delivery ? inr(delivery) : 'Free (pickup)'}</b>
      </p>
      <hr />
      <p className="total">
        <span>Grand Total</span>
        <b>{inr(total)}</b>
      </p>
    </>
  );
}
