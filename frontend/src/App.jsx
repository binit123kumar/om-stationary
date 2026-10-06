import React, { useContext } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppShell, AppShellContext } from './components/layout/AppShell.jsx';
import { AccountPage, DeliveryDashboard, LoginPage, PartnerDashboard } from './AccountPages.jsx';
import { CheckoutPage } from './Checkout.jsx';
import { InvoicePage } from './Invoice.jsx';
import { HomePage } from './pages/customer/HomePage.jsx';
import { ProductListingPage } from './pages/customer/ProductListingPage.jsx';
import { ProductDetailPage } from './pages/customer/ProductDetailPage.jsx';
import { WishlistPage } from './pages/customer/WishlistPage.jsx';
import { CartPage } from './pages/customer/CartPage.jsx';
import { OrdersPage } from './pages/customer/OrdersPage.jsx';
import { TrackOrderPage } from './pages/customer/TrackOrderPage.jsx';
import { NotificationsPage } from './pages/customer/NotificationsPage.jsx';
import { AboutPage } from './pages/customer/AboutPage.jsx';
import { ContactPage } from './pages/customer/ContactPage.jsx';
import { HelpPage } from './pages/customer/HelpPage.jsx';
import { LegalPage } from './pages/customer/LegalPages.jsx';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.jsx';

class AppErrorBoundary extends React.Component{constructor(props){super(props);this.state={failed:false,error:null}}static getDerivedStateFromError(error){return{failed:true,error}}componentDidCatch(error){console.error('OM Stationary render error:',error)}render(){return this.state.failed?<main className="app-error"><div className="panel"><h1>We hit a problem loading this page</h1><p>Your cart is saved on this device. Refresh to try again.</p>{import.meta.env.DEV&&this.state.error&&<pre role="alert" style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',textAlign:'left'}}>{this.state.error.name}: {this.state.error.message}</pre>}<button className="btn" onClick={()=>window.location.reload()}>Refresh page</button></div></main>:this.props.children}}

function AppRoutes(){
 const {catalog,navCategories,user,wishlist,wishlistError,wishlistLoading,syncWishlistFromServer,toggleWishlist,cart,add,addN,change,remove,clearCart,onAuth,onLogout}=useContext(AppShellContext);
 return <Routes><Route path="/" element={<HomePage add={add} addN={addN} catalog={catalog} categories={navCategories} wishlist={wishlist} toggleWishlist={toggleWishlist}/>}/><Route path="/search" element={<ProductListingPage add={add} addN={addN} catalog={catalog} wishlist={wishlist} toggleWishlist={toggleWishlist}/>}/><Route path="/product/:id" element={<ProductDetailPage add={add} addN={addN} catalog={catalog} wishlist={wishlist} toggleWishlist={toggleWishlist}/>}/><Route path="/wishlist" element={<WishlistPage catalog={catalog} wishlist={wishlist} add={add} addN={addN} toggleWishlist={toggleWishlist} user={user} error={wishlistError} loading={wishlistLoading} reload={syncWishlistFromServer}/>}/><Route path="/cart" element={<CartPage cart={cart} change={change} remove={remove} addN={addN}/>}/><Route path="/checkout" element={<CheckoutPage cart={cart} user={user} onCartCleared={clearCart}/>}/><Route path="/invoice/:id" element={<InvoicePage/>}/><Route path="/orders" element={<OrdersPage user={user}/>}/><Route path="/track/:id" element={<TrackOrderPage/>}/><Route path="/account" element={<AccountPage user={user} onLogout={onLogout}/>}/><Route path="/login" element={<LoginPage onAuth={onAuth}/>}/><Route path="/register" element={<LoginPage register onAuth={onAuth}/>}/><Route path="/delivery" element={<DeliveryDashboard/>}/><Route path="/partner" element={<PartnerDashboard/>}/><Route path="/admin" element={<AdminDashboardPage user={user} onLogout={onLogout}/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="/help" element={<HelpPage/>}/><Route path="/privacy" element={<LegalPage kind="privacy"/>}/><Route path="/terms" element={<LegalPage kind="terms"/>}/><Route path="/refund-policy" element={<LegalPage kind="refund"/>}/><Route path="/notifications" element={<NotificationsPage/>}/></Routes>;
}

export function App(){return <BrowserRouter><AppErrorBoundary><Routes><Route element={<AppShell/>}><Route path="*" element={<AppRoutes/>}/></Route></Routes></AppErrorBoundary></BrowserRouter>}
export default App;
