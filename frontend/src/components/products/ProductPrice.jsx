// Price block: current price, struck-through MRP and discount chip.
export function ProductPrice({ price, mrp, discount = null }) {
  const computedDiscount = mrp > price
    ? Math.round((1 - price / mrp) * 100)
    : 0;
  const shown = discount === null ? computedDiscount : discount;

  return (
    <div className="card-price">
      <b className="price">&#8377;{Number(price).toLocaleString('en-IN')}</b>
      {mrp > price && (
        <>
          <del>&#8377;{Number(mrp).toLocaleString('en-IN')}</del>
          <span className="discount">{shown}% off</span>
        </>
      )}
    </div>
  );
}
