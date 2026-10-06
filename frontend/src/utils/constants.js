// Central API configuration. The base URL comes from the build environment so
// the frontend never hardcodes a backend host.
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Page sizes used by the paginated catalogue and admin tables.
export const PAGE_SIZE = 24;
export const ADMIN_PAGE_SIZE = 50;

export const CART_STORAGE_KEY = 'omcart';
export const WISHLIST_STORAGE_KEY = 'omwishlist';
export const RECENT_STORAGE_KEY = 'omrecent';
export const ORDERS_STORAGE_KEY = 'omorders';
export const SESSION_STORAGE_KEY = 'omSession';
export const ADMIN_KEY_STORAGE = 'omadminkey';

export const trackingTokenKey = (orderNumber) => `omtrack:${orderNumber}`;

export const CURRENCY = 'INR';
export const CURRENCY_SYMBOL = '₹';

// Roles recognised by the backend JWT. UI guards only hide navigation; the API
// remains the source of truth for authorisation.
export const ROLES = {
  Customer: 'Customer',
  Admin: 'Admin',
  PartnerShop: 'PartnerShop',
  DeliveryPartner: 'DeliveryPartner'
};

export const ORDER_STATUSES = [
  'Pending', 'Placed', 'Confirmed', 'Accepted', 'Preparing',
  'Ready for Pickup', 'Picked Up', 'Out for Delivery', 'Delivered',
  'Delivery Failed', 'Cancelled', 'RefundPending', 'Refunded'
];

export const DELIVERY_STATUSES = [
  'Assigned', 'Accepted', 'ArrivedAtPickup', 'PickedUp',
  'OutForDelivery', 'Delivered', 'Failed', 'Cancelled'
];

export const TERMINAL_ORDER_STATUSES = ['Delivered', 'Picked Up', 'Cancelled', 'Refunded'];

// Store contact details shown on the about, contact, help
// and legal pages.
export const OM_CONTACT = {
  name: 'OM Stationary',
  address: 'G5JF+784, Ambedkar Rd, Sohgi, Bihar 800007',
  landmark: 'Opp. Shravani Enclave, Sampatchak, Patna, Bihar',
  plusCode: 'G5JF+784',
  maps: 'https://www.google.com/maps/dir/?api=1&destination=25.5305282,85.173357'
};

// Legal documents rendered by the privacy / terms /
// refund policy pages.
export const LEGAL = {
  privacy: {
    title: 'Privacy Policy',
    intro: 'This policy explains what OM Stationary collects when you use this website, and what we do with it.',
    sections: [
      ['What we collect',
        'We collect your name, mobile number, email address, delivery addresses, order details and payment status. We never ask for and never store card numbers, CVV, UPI PIN or any payment password.'],
      ['Why we collect it',
        'We use your details to process orders, deliver products, issue invoices, provide order updates and support you after delivery.'],
      ['How long we keep it',
        'We keep your order and invoice records for as long as needed for accounting and after-sales support. You can ask us to delete your account at any time.'],
      ['Who we share it with',
        'We do not sell your personal data. We share only what is strictly necessary with the delivery partner handling your order.'],
      ['Your choices',
        'You can view and edit your profile, addresses and order history from your account, and you can ask us to correct or delete your information.']
    ]
  },
  terms: {
    title: 'Terms & Conditions',
    intro: 'These terms govern your use of the OM Stationary website and the orders you place through it.',
    sections: [
      ['About us',
        'OM Stationary is an independent retailer operating from G5JF+784, Ambedkar Rd, Sohgi, Patna, Bihar 800007.'],
      ['Orders',
        'An order is accepted only after the store confirms it. We may cancel an order if an item is unavailable or an obvious pricing error is found, and we will refund any amount collected.'],
      ['Pricing',
        'Prices include all charges shown at checkout. Prices and stock can change, and the price at the time your order is accepted is the price that applies.'],
      ['Delivery',
        'Delivery is available in configured PIN codes. Delivery is attempted during business hours. Risk and title pass to you on delivery.'],
      ['Pickup',
        'Pickup orders must be collected within the requested window. Uncollected orders may be cancelled and refunded.'],
      ['Liability',
        'We are responsible for delivering the goods described on your invoice. Nothing in these terms limits your statutory consumer rights.']
    ]
  },
  refund: {
    title: 'Refund Policy',
    intro: 'We want refunds to be simple and fair. This policy explains when and how they work.',
    sections: [
      ['Damaged or wrong items',
        'Contact us within 48 hours of delivery with photographs. We will arrange a replacement or a full refund.'],
      ['Order cancelled by us',
        'If we cancel your order, any amount collected is refunded in full to the original payment method.'],
      ['Cash on delivery',
        'For cash on delivery orders, a refund is processed by our team and settled to your account within 5-7 working days of approval.'],
      ['Online payments',
        'Refunds go back to the original payment method and may take 5-7 working days to appear, depending on your bank or provider.'],
      ['Non-refundable cases',
        'Change-of-mind returns are not accepted on opened stationery, unless the product is faulty or incorrect.']
    ]
  }
};
