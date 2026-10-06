import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppErrorBoundary } from './ErrorBoundary.jsx';
import { AppShell, AppShellContext } from './components/layout/AppShell.jsx';
import { ProtectedRoute } from './components/layout/ProtectedRoute.jsx';
import { AccountPage } from './pages/customer/AccountPage.jsx';
import { AboutPage } from './pages/customer/AboutPage.jsx';
import { CartPage } from './pages/customer/CartPage.jsx';
import { CheckoutPage } from './pages/customer/CheckoutPage.jsx';
import { ContactPage } from './pages/customer/ContactPage.jsx';
import { HelpPage } from './pages/customer/HelpPage.jsx';
import { HomePage } from './pages/customer/HomePage.jsx';
import { InvoicePage } from './pages/customer/InvoicePage.jsx';
import { PrivacyPage } from './pages/customer/PrivacyPage.jsx';
import { TermsPage } from './pages/customer/TermsPage.jsx';
import { RefundPolicyPage } from './pages/customer/RefundPolicyPage.jsx';
import { LoginPage } from './pages/customer/LoginPage.jsx';
import { NotificationsPage } from './pages/customer/NotificationsPage.jsx';
import { OrderSuccessPage } from './pages/customer/OrderSuccessPage.jsx';
import { OrdersPage } from './pages/customer/OrdersPage.jsx';
import { PaymentPage } from './pages/customer/PaymentPage.jsx';
import { ProductDetailPage } from './pages/customer/ProductDetailPage.jsx';
import { ProductListingPage } from './pages/customer/ProductListingPage.jsx';
import { RegisterPage } from './pages/customer/RegisterPage.jsx';
import { TrackOrderPage } from './pages/customer/TrackOrderPage.jsx';
import { WishlistPage } from './pages/customer/WishlistPage.jsx';
import { PartnerDashboardPage } from './pages/partner/PartnerDashboardPage.jsx';
import { PartnerInventoryPage } from './pages/partner/PartnerInventoryPage.jsx';
import { PartnerOrdersPage } from './pages/partner/PartnerOrdersPage.jsx';
import { DeliveryDashboardPage } from './pages/delivery/DeliveryDashboardPage.jsx';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.jsx';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage.jsx';
import { AdminOrderDetailPage } from './pages/admin/AdminOrderDetailPage.jsx';
import { AdminProductsPage } from './pages/admin/AdminProductsPage.jsx';
import { AdminProductFormPage } from './pages/admin/AdminProductFormPage.jsx';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage.jsx';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage.jsx';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage.jsx';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage.jsx';
import { AdminCouponsPage } from './pages/admin/AdminCouponsPage.jsx';
import { AdminDeliveryPage } from './pages/admin/AdminDeliveryPage.jsx';
import { AdminInvoicesPage } from './pages/admin/AdminInvoicesPage.jsx';
import { AdminPartnerShopsPage } from './pages/admin/AdminPartnerShopsPage.jsx';
import { AdminReportsPage } from './pages/admin/AdminReportsPage.jsx';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage.jsx';
import { AdminWhatsAppPage } from './pages/admin/AdminWhatsAppPage.jsx';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage.jsx';
import { AdminAuditLogPage } from './pages/admin/AdminAuditLogPage.jsx';
import { PartnerProfilePage } from './pages/partner/PartnerProfilePage.jsx';
import { PartnerProductsPage } from './pages/partner/PartnerProductsPage.jsx';
import { PartnerOrderDetailPage } from './pages/partner/PartnerOrderDetailPage.jsx';
import { AssignedDeliveriesPage } from './pages/delivery/AssignedDeliveriesPage.jsx';
import { DeliveryDetailPage } from './pages/delivery/DeliveryDetailPage.jsx';
import { DeliveryHistoryPage } from './pages/delivery/DeliveryHistoryPage.jsx';
import { DeliveryProfilePage } from './pages/delivery/DeliveryProfilePage.jsx';

function AppRoutes() {
  const {
    catalog, navCategories, user, wishlist, wishlistError, wishlistLoading,
    syncWishlistFromServer, toggleWishlist, cart, add, addN, change, remove,
    clearCart, onAuth, onLogout
  } = useContext(AppShellContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage add={add} addN={addN} catalog={catalog} categories={navCategories} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
      <Route path="/search" element={<ProductListingPage add={add} addN={addN} catalog={catalog} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
      <Route path="/product/:id" element={<ProductDetailPage add={add} addN={addN} catalog={catalog} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
      <Route path="/cart" element={<CartPage cart={cart} change={change} remove={remove} addN={addN} />} />
      <Route path="/wishlist" element={<WishlistPage catalog={catalog} wishlist={wishlist} add={add} addN={addN} toggleWishlist={toggleWishlist} user={user} error={wishlistError} loading={wishlistLoading} reload={syncWishlistFromServer} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} user={user} onCartCleared={clearCart} />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />
      <Route path="/invoice/:id" element={<InvoicePage />} />
      <Route path="/orders" element={<OrdersPage user={user} />} />
      <Route path="/track/:id" element={<TrackOrderPage />} />
      <Route path="/login" element={<LoginPage onAuth={onAuth} />} />
      <Route path="/register" element={<RegisterPage onAuth={onAuth} />} />
      <Route path="/account" element={<AccountPage user={user} onLogout={onLogout} />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/refund-policy" element={<RefundPolicyPage />} />

      <Route path="/admin" element={<ProtectedRoute roles={['Admin']}><AdminDashboardPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/orders" element={<ProtectedRoute roles={['Admin']}><AdminOrdersPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/orders/:id" element={<ProtectedRoute roles={['Admin']}><AdminOrderDetailPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute roles={['Admin']}><AdminProductsPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/products/new" element={<ProtectedRoute roles={['Admin']}><AdminProductFormPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/products/:id/edit" element={<ProtectedRoute roles={['Admin']}><AdminProductFormPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/categories" element={<ProtectedRoute roles={['Admin']}><AdminCategoriesPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/inventory" element={<ProtectedRoute roles={['Admin']}><AdminInventoryPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/customers" element={<ProtectedRoute roles={['Admin']}><AdminCustomersPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/payments" element={<ProtectedRoute roles={['Admin']}><AdminPaymentsPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/coupons" element={<ProtectedRoute roles={['Admin']}><AdminCouponsPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/delivery" element={<ProtectedRoute roles={['Admin']}><AdminDeliveryPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/invoices" element={<ProtectedRoute roles={['Admin']}><AdminInvoicesPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/partners" element={<ProtectedRoute roles={['Admin']}><AdminPartnerShopsPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute roles={['Admin']}><AdminReportsPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/notifications" element={<ProtectedRoute roles={['Admin']}><AdminNotificationsPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/whatsapp" element={<ProtectedRoute roles={['Admin']}><AdminWhatsAppPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute roles={['Admin']}><AdminSettingsPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/admin/audit-log" element={<ProtectedRoute roles={['Admin']}><AdminAuditLogPage user={user} onLogout={onLogout} /></ProtectedRoute>} />
      <Route path="/partner" element={<ProtectedRoute roles={['PartnerShop']}><PartnerDashboardPage /></ProtectedRoute>} />
      <Route path="/partner/inventory" element={<ProtectedRoute roles={['PartnerShop']}><PartnerInventoryPage /></ProtectedRoute>} />
      <Route path="/partner/orders" element={<ProtectedRoute roles={['PartnerShop']}><PartnerOrdersPage /></ProtectedRoute>} />
      <Route path="/partner/profile" element={<ProtectedRoute roles={['PartnerShop']}><PartnerProfilePage /></ProtectedRoute>} />
      <Route path="/partner/products" element={<ProtectedRoute roles={['PartnerShop']}><PartnerProductsPage /></ProtectedRoute>} />
      <Route path="/partner/orders/:id" element={<ProtectedRoute roles={['PartnerShop']}><PartnerOrderDetailPage /></ProtectedRoute>} />
      <Route path="/delivery" element={<ProtectedRoute roles={['DeliveryPartner']}><DeliveryDashboardPage /></ProtectedRoute>} />
      <Route path="/delivery/assigned" element={<ProtectedRoute roles={['DeliveryPartner']}><AssignedDeliveriesPage /></ProtectedRoute>} />
      <Route path="/delivery/history" element={<ProtectedRoute roles={['DeliveryPartner']}><DeliveryHistoryPage /></ProtectedRoute>} />
      <Route path="/delivery/profile" element={<ProtectedRoute roles={['DeliveryPartner']}><DeliveryProfilePage /></ProtectedRoute>} />
      <Route path="/delivery/:id" element={<ProtectedRoute roles={['DeliveryPartner']}><DeliveryDetailPage /></ProtectedRoute>} />
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppErrorBoundary>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="*" element={<AppRoutes />} />
          </Route>
        </Routes>
      </AppErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
