# Frontend services

- [adminService](../services/adminService.md) — adminHeaders, getDashboard, getAnalytics, getFilterOptions, listAdminOrders, updateOrderStatus, confirmOrderPayment, assignDelivery, assignDeliveryPartner, listAdminProducts, createProduct, updateProduct, deactivateProduct, adjustStock, listAdminCategories, createCategory, updateCategory, listAdminCoupons, createCoupon, updateCoupon, listAdminCustomers, listAdminPayments, listAdminInvoices, getAdminNotifications, getAdminWishlistStats, getAuditLog, getReport, exportReport, getAdminSettings, saveAdminSettings, listPartnerShops, setPartnerShopApproval, listDeliveryPartners, createDeliveryPartner, listAllAssignments, getAdminOrder
- [api](../services/api.md) — apiFetch, readFailure
- [authService](../services/authService.md) — login, register, logout, getMe
- [cartService](../services/cartService.md) — getCart, saveCart, mergeGuestCart
- [deliveryService](../services/deliveryService.md) — getDeliveryOptions, getDeliveryQuote, getPickupLocation, getMyAssignments, updateAssignmentStatus
- [invoiceService](../services/invoiceService.md) — getInvoice, downloadInvoicePdf
- [notificationService](../services/notificationService.md) — getNotifications, markNotificationRead, markAllNotificationsRead
- [orderService](../services/orderService.md) — createOrder, getOrderByNumber, getCustomerOrders, getStatusWorkflow, listAdminOrders, updateOrderStatus, confirmOrderPayment, assignDelivery, validateCoupon
- [partnerService](../services/partnerService.md) — getPartnerShop, updatePartnerShop, getPartnerInventory, updatePartnerInventory, getPartnerOrders, updatePartnerOrderStatus, registerPartnerShop
- [paymentService](../services/paymentService.md) — getPaymentOptions, createPaymentIntent, verifyPayment
- [productService](../services/productService.md) — mapProduct, listProducts, searchProducts, getProduct, listCategories
- [session](../services/session.md) — apiBase, readSession, saveSession, clearSession, mapServerCart
- [whatsappService](../services/whatsappService.md) — getWhatsAppConfig, saveWhatsAppSettings, sendWhatsAppTest, retryWhatsAppNotification
- [wishlistService](../services/wishlistService.md) — getWishlist, addToWishlist, removeFromWishlist, moveToCart

Call paths and HTTP strings are statically extracted in each report. They are not observed network traffic; backend mappings and response behavior are not asserted.
