// Shopping cart page.
import { CartList } from '../../components/cart/CartList.jsx';
import { CartSummary } from '../../components/cart/CartSummary.jsx';
import { EmptyCart } from '../../components/cart/EmptyCart.jsx';

export function CartPage({ cart, change, remove, addN }) {
  const itemCount = cart.reduce((sum, item) => sum + item.q, 0);

  if (!cart.length) return <EmptyCart />;

  return (
    <>
      <div className="pagehead">
        <small>CART</small>
        <h1>Your Shopping Cart</h1>
        <p>
          {itemCount} item(s). Stock and price are re-checked by the store
          when you place the order.
        </p>
      </div>
      <div className="cartlayout">
        <CartList items={cart} onChange={change} onRemove={remove} />
        <CartSummary cart={cart} />
      </div>
    </>
  );
}
