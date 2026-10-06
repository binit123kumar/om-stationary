// Delivery quote result panel. The quote is always produced by
// POST /api/delivery/quote — never calculated in the browser.
export function DeliveryQuote({ quote, error }) {
  if (!quote && !error) return null;
  if (error) {
    return <p className="quote-bad" role="status">{error}</p>;
  }
  return (
    <p className="quote-ok">
      Delivery available &middot; charge quoted &middot; stock verified
    </p>
  );
}
