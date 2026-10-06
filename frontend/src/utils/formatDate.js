// Date and time helpers. The backend sends ISO-8601 timestamps; every page
// renders them through these functions so the format stays consistent.
export const formatDate = (value, options) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || '—';
  return date.toLocaleDateString('en-IN', options);
};

export const formatDateTime = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || '—';
  return date.toLocaleString('en-IN');
};

export const formatTime = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || '—';
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
};

// "Mon, 01 Jan, 10:30 AM" — used for pickup slot dropdowns.
export const formatSlot = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Converts a Date to the local "YYYY-MM-DDTHH:mm" value datetime-local inputs expect.
export const toLocalInputValue = (date) => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

export const toMinutes = (value) => {
  const [hours, minutes] = String(value || '0:0').split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
};

export const relativeDays = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
};
