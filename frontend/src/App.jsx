import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppErrorBoundary } from './ErrorBoundary.jsx';
import { AppShell } from './components/layout/AppShell.jsx';
import { ProtectedRoute } from './components/layout/ProtectedRoute.jsx';
import { RouteView } from './RouteView.jsx';

export function App() {
  return (
    <BrowserRouter>
      <AppErrorBoundary>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<RouteView page="home" />} />
            <Route path="/search" element={<RouteView page="search" />} />
            <Route path="/product/:id" element={<RouteView page="product" />} />
            <Route path="/cart" element={<RouteView page="cart" />} />
            <Route path="/wishlist" element={<RouteView page="wishlist" />} />
            <Route path="/checkout" element={<RouteView page="checkout" />} />
            <Route path="/payment" element={<RouteView page="payment" />} />
            <Route path="/order-success" element={<RouteView page="order-success" />} />
            <Route path="/invoice/:id" element={<RouteView page="invoice" />} />
            <Route path="/orders" element={<RouteView page="orders" />} />
            <Route path="/track/:id" element={<RouteView page="track" />} />
            <Route path="/login" element={<RouteView page="login" />} />
            <Route path="/register" element={<RouteView page="register" />} />
            <Route path="/account" element={<RouteView page="account" />} />
            <Route path="/notifications" element={<RouteView page="notifications" />} />
            <Route path="/about" element={<RouteView page="about" />} />
            <Route path="/contact" element={<RouteView page="contact" />} />
            <Route path="/help" element={<RouteView page="help" />} />
            <Route path="/privacy" element={<RouteView page="privacy" />} />
            <Route path="/terms" element={<RouteView page="terms" />} />
            <Route path="/refund-policy" element={<RouteView page="refund" />} />
            <Route path="/admin" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-home" /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-orders" /></ProtectedRoute>} />
            <Route path="/admin/orders/:id" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-order" /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-products" /></ProtectedRoute>} />
            <Route path="/admin/products/new" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-product-form" /></ProtectedRoute>} />
            <Route path="/admin/products/:id/edit" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-product-form" /></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-categories" /></ProtectedRoute>} />
            <Route path="/admin/inventory" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-inventory" /></ProtectedRoute>} />
            <Route path="/admin/customers" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-customers" /></ProtectedRoute>} />
            <Route path="/admin/payments" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-payments" /></ProtectedRoute>} />
            <Route path="/admin/coupons" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-coupons" /></ProtectedRoute>} />
            <Route path="/admin/delivery" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-delivery" /></ProtectedRoute>} />
            <Route path="/admin/invoices" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-invoices" /></ProtectedRoute>} />
            <Route path="/admin/partners" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-partners" /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-reports" /></ProtectedRoute>} />
            <Route path="/admin/notifications" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-notifications" /></ProtectedRoute>} />
            <Route path="/admin/whatsapp" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-whatsapp" /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-settings" /></ProtectedRoute>} />
            <Route path="/admin/audit-log" element={<ProtectedRoute roles={['Admin']}><RouteView page="admin-audit" /></ProtectedRoute>} />
            <Route path="/partner" element={<ProtectedRoute roles={['PartnerShop']}><RouteView page="partner-home" /></ProtectedRoute>} />
            <Route path="/partner/inventory" element={<ProtectedRoute roles={['PartnerShop']}><RouteView page="partner-inventory" /></ProtectedRoute>} />
            <Route path="/partner/orders" element={<ProtectedRoute roles={['PartnerShop']}><RouteView page="partner-orders" /></ProtectedRoute>} />
            <Route path="/partner/profile" element={<ProtectedRoute roles={['PartnerShop']}><RouteView page="partner-profile" /></ProtectedRoute>} />
            <Route path="/partner/products" element={<ProtectedRoute roles={['PartnerShop']}><RouteView page="partner-products" /></ProtectedRoute>} />
            <Route path="/partner/orders/:id" element={<ProtectedRoute roles={['PartnerShop']}><RouteView page="partner-order" /></ProtectedRoute>} />
            <Route path="/delivery" element={<ProtectedRoute roles={['DeliveryPartner']}><RouteView page="delivery-home" /></ProtectedRoute>} />
            <Route path="/delivery/assigned" element={<ProtectedRoute roles={['DeliveryPartner']}><RouteView page="delivery-assigned" /></ProtectedRoute>} />
            <Route path="/delivery/history" element={<ProtectedRoute roles={['DeliveryPartner']}><RouteView page="delivery-history" /></ProtectedRoute>} />
            <Route path="/delivery/profile" element={<ProtectedRoute roles={['DeliveryPartner']}><RouteView page="delivery-profile" /></ProtectedRoute>} />
            <Route path="/delivery/:id" element={<ProtectedRoute roles={['DeliveryPartner']}><RouteView page="delivery-detail" /></ProtectedRoute>} />
            <Route path="*" element={<RouteView page="home" />} />
          </Route>
        </Routes>
      </AppErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
