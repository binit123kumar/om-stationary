// Indian-rupee formatting shared by every page so totals never drift apart.
// The backend returns decimal numbers; formatting happens only at render time.
export const rupees = (value) =>
  '₹' + Number(value || 0).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

export const rupeesShort = (value) =>
  '₹' + Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });

export const formatNumber = (value) => Number(value || 0).toLocaleString('en-IN');
