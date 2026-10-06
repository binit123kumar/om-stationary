// Shared validation rules. These mirror the backend data annotations exactly
// (RegisterRequest: Required, MinLength(4), MaxLength(128)) so the UI never
// accepts a payload the API would reject, and the API policy is never weakened.
export const PASSWORD_MIN = 4;
export const PASSWORD_MAX = 128;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
export const MOBILE_PATTERN = /^[6-9]\d{9}$/;
export const PINCODE_PATTERN = /^\d{6}$/;

// Accepts 10-digit, 0-prefixed 11-digit and +91 / 91-prefixed forms.
export function normaliseMobile(raw) {
  const digits = String(raw || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits;
}

export function validateRegister(form) {
  const errors = {};
  const fullName = String(form.fullName || '').trim();
  const email = String(form.email || '').trim();
  const mobile = normaliseMobile(form.phone);
  const password = String(form.password || '');

  if (!fullName) errors.fullName = 'Full name is required.';
  else if (fullName.length < 3) errors.fullName = 'Enter your full name (at least 3 characters).';
  else if (fullName.length > 120) errors.fullName = 'Full name must be 120 characters or fewer.';

  if (!email) errors.email = 'Email address is required.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address.';
  else if (email.length > 254) errors.email = 'Email address must be 254 characters or fewer.';

  if (!form.phone || !String(form.phone).trim()) errors.phone = 'Mobile number is required.';
  else if (!MOBILE_PATTERN.test(mobile)) errors.phone = 'Enter a valid 10 digit Indian mobile number.';

  if (!password) errors.password = 'Password is required.';
  else if (password.length < PASSWORD_MIN) errors.password = `Password must be at least ${PASSWORD_MIN} characters.`;
  else if (password.length > PASSWORD_MAX) errors.password = `Password must be ${PASSWORD_MAX} characters or fewer.`;

  if (!form.confirmPassword) errors.confirmPassword = 'Confirm your password.';
  else if (form.confirmPassword !== password) errors.confirmPassword = 'Passwords do not match.';

  if (!form.acceptTerms) errors.acceptTerms = 'Please accept the Terms & Conditions to continue.';
  return errors;
}

export function validateLogin(form) {
  const errors = {};
  const identifier = String(form.identifier || '').trim();
  if (!identifier) errors.identifier = 'Enter your email address or mobile number.';
  else if (!EMAIL_PATTERN.test(identifier) && !MOBILE_PATTERN.test(normaliseMobile(identifier)))
    errors.identifier = 'Enter a valid email address or 10 digit mobile number.';
  if (!form.password) errors.password = 'Password is required.';
  return errors;
}

// Checkout field validation, shared by the checkout form and the order review.
export function validateCheckoutDetails(details, fulfillment, pickupSlot) {
  const found = {};
  if (!details.customerName.trim()) found.customerName = 'Full name is required.';
  if (!/^[6-9]\d{9}$/.test(details.customerPhone.replace(/\D/g, '').slice(-10)))
    found.customerPhone = 'Enter a valid 10 digit mobile number.';
  if (details.customerEmail.trim() && !EMAIL_PATTERN.test(details.customerEmail.trim()))
    found.customerEmail = 'Enter a valid email address.';
  if (fulfillment === 'Pickup') {
    if (!pickupSlot) found.pickupSlot = 'Choose a pickup date and time.';
    else if (new Date(pickupSlot).getTime() <= Date.now()) found.pickupSlot = 'Choose a pickup time in the future.';
  }
  if (fulfillment === 'Delivery') {
    if (!details.addressLine.trim()) found.addressLine = 'Address is required for delivery.';
    if (!details.state.trim()) found.state = 'State is required for delivery.';
    if (!PINCODE_PATTERN.test(details.pincode.trim())) found.pincode = 'Enter a valid 6 digit PIN code.';
    if (!details.city.trim()) found.city = 'City is required for delivery.';
  }
  return found;
}
