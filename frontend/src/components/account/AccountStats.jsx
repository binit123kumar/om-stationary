// Account statistics (order count, wishlist size).
export function AccountStats({ orderCount = 0, wishlistCount = 0 }) {
  return (
    <div className="account-stats">
      <div className="adminstat">
        <b>{orderCount}</b>
        <span>Orders</span>
      </div>
      <div className="adminstat">
        <b>{wishlistCount}</b>
        <span>Saved products</span>
      </div>
    </div>
  );
}
