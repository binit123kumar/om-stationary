import React,{useEffect,useState,useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,useNavigate,useParams,useLocation,Routes,Route,Link} from 'react-router-dom';
import {Search,ShoppingCart,User,MapPin,Clock,ChevronRight,Plus,Minus,ArrowLeft,PackageCheck,ShieldCheck,Phone,Mail,Navigation,MessageCircle,Heart,Bell,ShieldAlert,CheckCircle2,TrendingUp,AlertTriangle} from 'lucide-react';
import './styles.css';
import { AccountPage, DeliveryDashboard, LoginPage, PartnerDashboard } from './AccountPages.jsx';
import { CheckoutPage } from './Checkout.jsx';
import { InvoicePage } from './Invoice.jsx';
import { apiFetch, clearSession, mapServerCart, readSession } from './session.js';

const api=import.meta.env.VITE_API_URL===undefined?'http://localhost:5000':import.meta.env.VITE_API_URL.replace(/\/$/,'');
const AdminCharts=React.lazy(()=>import('./AdminCharts.jsx'));
const cats=['Stationery','Electronics','Computer','Office Supplies','Books','Grocery','Home & Living','Personal Care','Printing & Ink'];
function App(){return <Routes><Route path="*" element={<Shell/>}/></Routes>}
class AppErrorBoundary extends React.Component{constructor(props){super(props);this.state={failed:false,error:null}}static getDerivedStateFromError(error){return{failed:true,error}}componentDidCatch(error){console.error('OM Stationary render error:',error)}render(){return this.state.failed?<main className="app-error"><div className="panel"><h1>We hit a problem loading this page</h1><p>Your cart is saved on this device. Refresh to try again.</p>{import.meta.env.DEV&&this.state.error&&<pre role="alert" style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',textAlign:'left'}}>{this.state.error.name}: {this.state.error.message}</pre>}<button className="btn" onClick={()=>window.location.reload()}>Refresh page</button></div></main>:this.props.children}}
function Shell(){const catalog=useCatalog();const navCategories=useCategories();const [user,setUser]=useState(()=>readSession()?.user||null),[cartReady,setCartReady]=useState(()=>!readSession()?.user);const notifications=useNotifications(user);
 // Wishlist is owned by SQL Server. localStorage is only a cache so the header can render
 // instantly; the server is the source of truth and is re-synced on every login/user change.
 const [wishlist,setWishlist]=useState(()=>{try{const saved=JSON.parse(localStorage.getItem('omwishlist')||'[]');return Array.isArray(saved)?saved:[]}catch{return[]}});
 const [wishlistError,setWishlistError]=useState('');
 const [wishlistLoading,setWishlistLoading]=useState(false);
 const syncWishlistFromServer=useCallback(async()=>{setWishlistLoading(true);try{const r=await apiFetch('/api/wishlist');if(r.status===401){setWishlist([]);setWishlistError('');return}if(!r.ok)throw new Error('Wishlist could not be loaded.');const rows=await r.json();const ids=(Array.isArray(rows)?rows:[]).map(x=>x.productId);setWishlist(ids);setWishlistError('');try{localStorage.setItem('omwishlist',JSON.stringify(ids))}catch{}}catch(e){setWishlistError(e.message||'Wishlist could not be loaded.')}finally{setWishlistLoading(false)}},[]);
 useEffect(()=>{if(user?.role==='Customer'){syncWishlistFromServer()}else{setWishlist([]);try{localStorage.removeItem('omwishlist')}catch{}}},[user?.id,user?.role,syncWishlistFromServer]);
 const toggleWishlist=useCallback(async id=>{const saving=!wishlist.includes(id);const previous=wishlist;setWishlist(saving?[...wishlist,id]:wishlist.filter(x=>x!==id));try{localStorage.setItem('omwishlist',JSON.stringify(saving?[...previous,id]:previous.filter(x=>x!==id)))}catch{}
   if(user?.role!=='Customer')return; // guests keep a device-local list until they sign in
   try{const r=await apiFetch('/api/wishlist/'+encodeURIComponent(id),{method:saving?'POST':'DELETE'});if(r.status===401){syncWishlistFromServer();return}if(!r.ok)throw new Error('Wishlist could not be updated.');setWishlistError('');await syncWishlistFromServer()}catch(e){setWishlist(saving?previous.filter(x=>x!==id):[...previous,id]);try{localStorage.setItem('omwishlist',JSON.stringify(previous))}catch{}setWishlistError(e.message||'Wishlist could not be updated.')}},[wishlist,user?.role,syncWishlistFromServer]);
 const [cart,setCart]=useState(()=>{try{const saved=JSON.parse(localStorage.getItem('omcart')||'[]');return Array.isArray(saved)?saved:[]}catch{return[]}}); useEffect(()=>{try{localStorage.setItem('omcart',JSON.stringify(cart))}catch(e){console.warn('Cart could not be saved locally',e)}},[cart]);useEffect(()=>{if(!user){setCartReady(true);return}let alive=true;setCartReady(false);apiFetch('/api/cart').then(async r=>{if(!r.ok)throw new Error('cart');const data=await r.json();if(alive)setCart(mapServerCart(data.items))}).catch(()=>{if(alive)setCartReady(false)}).finally(()=>{});return()=>{alive=false}},[user?.id]);useEffect(()=>{if(!user||!cartReady)return;const timer=setTimeout(()=>apiFetch('/api/cart',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:cart.map(i=>({productId:i.id,quantity:i.q}))})}).catch(()=>{}),300);return()=>clearTimeout(timer)},[cart,user?.id,cartReady]);const onAuth=(nextUser,serverCart)=>{setUser(nextUser);setCart(serverCart);setCartReady(true)};const onLogout=async()=>{const session=readSession();try{if(session?.refreshToken)await apiFetch('/api/auth/logout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({refreshToken:session.refreshToken})})}catch{}clearSession();sessionStorage.removeItem('omadminkey');setUser(null);setCart([]);setCartReady(true);setWishlist([]);try{localStorage.removeItem('omwishlist')}catch{}};
const add=p=>setCart(c=>{const x=c.find(i=>i.id===p.id);return x?c.map(i=>i.id===p.id?{...i,q:Math.min(99,i.q+1)}:i):[...c,{...p,q:1}]});
 // Adds an exact quantity in one state update, so the header count and every total move together.
 const addN=(p,n)=>{const qty=Math.max(1,Math.min(99,Math.round(Number(n)||1)));setCart(c=>{const x=c.find(i=>i.id===p.id);return x?c.map(i=>i.id===p.id?{...i,q:Math.min(99,i.q+qty)}:i):[...c,{...p,q:Math.min(99,qty)}]})};
 const change=(id,d)=>setCart(c=>c.map(i=>i.id===id?{...i,q:Math.max(0,i.q+d)}:i).filter(i=>i.q));
 const remove=(id)=>setCart(c=>c.filter(i=>i.id!==id));
return <><header><div className="top"><Link className="logo" to="/"><span>OM</span> STATIONARY<small>Your Learning & Office Partner</small></Link><form className="search" action="/search"><Search size={20}/><input name="q" list="product-suggestions" placeholder="What are you looking for today?"/><datalist id="product-suggestions">{catalog.products.map(p=><option key={p.id} value={p.name}/>)}<option value="A4 Paper"/><option value="Notebook"/><option value="Office supplies"/></datalist><button aria-label="Search"><Search size={18}/></button></form><div className="deliver"><MapPin size={20}/><div><small>Fulfillment</small><b>Check availability</b></div></div><Link to="/orders" className="headlink">Orders</Link><Link to="/wishlist" className="headlink" aria-label="Wishlist"><Heart/><span className="badge">{wishlist.length}</span></Link><Link to="/notifications" className="headlink" aria-label="Notifications"><Bell/><span className="badge">{notifications.unread}</span></Link><Link to="/cart" className="headlink"><ShoppingCart/> <b>{cart.reduce((s,i)=>s+i.q,0)}</b></Link><Link to="/account" className="headlink"><User/></Link>{user?.role==='Admin'&&<Link to="/admin" className="admin-top-button"><ShieldAlert size={17}/> Admin</Link>}</div><div className="tech-ribbon"><div className="tech-ribbon-copy"><strong>Complete E-Commerce Website <span>+ WhatsApp Notification System</span></strong><small>Modern 3D UI&nbsp; | &nbsp;Customer Website&nbsp; | &nbsp;Admin Panel&nbsp; | &nbsp;Real-time Order Updates&nbsp; | &nbsp;Secure &amp; Scalable</small></div><div className="tech-ribbon-stack" aria-label="Store technology"><span>React + Vite</span><span>ASP.NET Core 10</span><span>SQL Server</span><span>WhatsApp API</span></div></div><nav>{[...new Set([...navCategories,...catalog.products.map(p=>p.cat)])].map(c=><Link key={c} to={'/search?cat='+encodeURIComponent(c)}>{c}</Link>)}</nav></header><main><Routes><Route path="/" element={<Home add={add} addN={addN} catalog={catalog} categories={navCategories} wishlist={wishlist} toggleWishlist={toggleWishlist}/>}/><Route path="/search" element={<SearchPage add={add} addN={addN} catalog={catalog} wishlist={wishlist} toggleWishlist={toggleWishlist}/>}/><Route path="/product/:id" element={<Product add={add} addN={addN} catalog={catalog} wishlist={wishlist} toggleWishlist={toggleWishlist}/>}/><Route path="/wishlist" element={<Wishlist catalog={catalog} wishlist={wishlist} add={add} addN={addN} toggleWishlist={toggleWishlist} user={user} error={wishlistError} loading={wishlistLoading} reload={syncWishlistFromServer}/>}/><Route path="/cart" element={<Cart cart={cart} change={change} remove={remove} addN={addN}/>}/><Route path="/checkout" element={<CheckoutPage cart={cart} user={user} onCartCleared={()=>setCart([])}/>}/><Route path="/invoice/:id" element={<InvoicePage/>}/><Route path="/orders" element={<Orders user={user}/>}/><Route path="/track/:id" element={<Track/>}/><Route path="/account" element={<AccountPage user={user} onLogout={onLogout}/>}/><Route path="/login" element={<LoginPage onAuth={onAuth}/>}/><Route path="/register" element={<LoginPage register onAuth={onAuth}/>}/><Route path="/delivery" element={<DeliveryDashboard/>}/><Route path="/partner" element={<PartnerDashboard/>}/><Route path="/admin" element={<Admin user={user} onLogout={onLogout}/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="/help" element={<HelpPage/>}/><Route path="/privacy" element={<LegalPage kind="privacy"/>}/><Route path="/terms" element={<LegalPage kind="terms"/>}/><Route path="/refund-policy" element={<LegalPage kind="refund"/>}/><Route path="/notifications" element={<NotificationsPage/>}/></Routes></main><FooterMap/></>}
function useCategories(){const [categories,setCategories]=useState([]);useEffect(()=>{let active=true;fetch(api+'/api/categories').then(r=>r.ok?r.json():[]).then(rows=>{if(active&&Array.isArray(rows))setCategories(rows)}).catch(()=>{});return()=>{active=false}},[]);return categories}
function useCatalog(){const [products,setProducts]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState('');useEffect(()=>{let active=true;fetch(api+'/api/products').then(r=>r.ok?r.json():Promise.reject()).then(rows=>{if(active)setProducts(rows.map(p=>({id:p.id,name:p.name,price:p.price,mrp:p.mrp,cat:p.category,img:p.imageUrl,desc:p.description}))) }).catch(()=>{if(active)setError('Could not load products. Check the API connection and try again.')}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[]);return{products,loading,error}}
function typoMatches(text,term){const words=text.toLowerCase().split(/\W+/).filter(Boolean),query=term.split(/\W+/).filter(Boolean);return query.length>0&&query.every(q=>words.some(w=>{if(Math.abs(w.length-q.length)>1)return false;let i=0,j=0,edits=0;while(i<w.length&&j<q.length){if(w[i]===q[j]){i++;j++}else{if(++edits>1)return false;if(w.length>q.length)i++;else if(q.length>w.length)j++;else{i++;j++}}}return edits+(w.length-i)+(q.length-j)<=1}))}
function Home({add,addN,catalog,categories=[],wishlist,toggleWishlist}){const {products,loading,error}=catalog,availableCats=[...new Set([...categories,...products.map(p=>p.cat)])],[recentIds]=useState(()=>{try{const ids=JSON.parse(localStorage.getItem('omrecent')||'[]');return Array.isArray(ids)?ids:[]}catch{return[]}}),recentProducts=recentIds.map(id=>products.find(p=>p.id===id)).filter(Boolean);return <><section className="hero hero-premium"><div><p className="eyebrow">LOCAL SHOPPING, MADE SIMPLE</p><h1>Everything for Study,<br/><strong>Office & More</strong></h1><p>Quality stationery at best price. Local shop, fast delivery & easy pickup.</p><div className="purchase-actions"><Link className="btn" to="/search">SHOP NOW</Link><Link className="outline" to="/search">VIEW OFFERS</Link></div><span className="hero-note"><ShieldCheck size={16}/> Clear prices &middot; Cash on delivery &middot; Easy pickup</span></div><div className="hero-art-panel"><div className="hero-monogram">OM<span>.</span></div><div className="hero-art-label"><MapPin size={16}/> Your local essentials, one stop away</div></div></section><section className="trust"><div><Search/> Easy product search</div><div><MapPin/> Official OM pickup</div><div><ShieldCheck/> Cash on delivery</div><div><PackageCheck/> Order tracking</div></section><div className="rowhead"><div><small className="section-eyebrow">CATEGORIES</small><h2>Shop by category</h2></div></div><div className="cats">{availableCats.map(c=><Link to={'/search?cat='+encodeURIComponent(c)} key={c}>{c}<ChevronRight size={15}/></Link>)}</div><div className="rowhead"><div><small className="section-eyebrow">FROM OUR CATALOGUE</small><h2>Popular essentials</h2></div><Link to="/search">Browse all <ChevronRight size={17}/></Link></div>{loading?<div className="catalog-state">Loading catalogue...</div>:error?<div className="catalog-state error" role="alert">{error} <button className="outline" onClick={()=>location.reload()}>Retry</button></div>:products.length?<div className="grid">{products.slice(0,8).map(p=><Card key={p.id} p={p} add={add} addN={addN} saved={wishlist.includes(p.id)} toggleWishlist={toggleWishlist}/>)}</div>:<div className="catalog-state">Our catalogue is being updated. Please check back soon.</div>}{recentProducts.length>0&&<><div className="rowhead"><div><small className="section-eyebrow">YOUR RECENTLY VIEWED</small><h2>Pick up where you left off</h2></div></div><div className="grid">{recentProducts.map(p=><Card key={p.id} p={p} add={add} addN={addN} saved={wishlist.includes(p.id)} toggleWishlist={toggleWishlist}/>)}</div></>}</>}
function Card({p,add,addN,saved=false,toggleWishlist}){
  const [qty,setQty]=useState(1);
  // Catalogue and search responses can omit stock. Only enforce a limit when the
  // API actually supplied one; never reference an undeclared local variable.
  const stock=p.stock!==null&&p.stock!==undefined&&Number.isFinite(Number(p.stock))?Number(p.stock):null;
  const discount=p.mrp>p.price?Math.round((1-p.price/p.mrp)*100):0;
  // addN applies the whole quantity in one update; the loop version could desync the header count.
  const addQty=()=>addN?addN(p,qty):add(p);
  return <article className="card">
    <Link className="card-image" to={'/product/'+p.id}>
      {p.img?<img src={p.img} alt={p.name} loading="lazy"/>:<span className="image-placeholder"><PackageCheck/></span>}
    </Link>
    <button type="button" className={saved?"wishlist-toggle saved":"wishlist-toggle"} aria-label={saved?"Remove from wishlist":"Save to wishlist"} onClick={()=>toggleWishlist?.(p.id)}>
      <Heart size={17} fill={saved?"currentColor":"none"}/>
    </button>
    <div className="pad">
      <small>{p.cat}</small>
      <Link className="pname" to={'/product/'+p.id}>{p.name}</Link>
      <div className="card-price"><b className="price">&#8377;{p.price}</b>{p.mrp>p.price&&<><del>&#8377;{p.mrp}</del><span className="discount">{discount}% off</span></>}</div>
      <p className="stock-note">{stock===null?'Availability confirmed at checkout':stock>0?`${stock} in stock`:'Out of stock'}</p>
      <div className="add-row">
        <div className="qty-mini">
          <button type="button" onClick={()=>setQty(v=>Math.max(1,v-1))}>−</button>
          <b>{qty}</b>
          <button type="button" disabled={stock!==null&&qty>=stock} onClick={()=>setQty(v=>Math.min(99,stock??99, v+1))}>+</button>
        </div>
        <button className="add" disabled={stock!==null&&(stock<1||qty>stock)} onClick={addQty}><Plus size={16}/> Add {qty}</button>
      </div>
      <Link className="card-view" to={'/product/'+p.id}>View product <ChevronRight size={15}/></Link>
    </div>
  </article>
}
function SearchPage({add,addN,catalog,wishlist,toggleWishlist}){const route=useLocation(),params=new URLSearchParams(route.search),q=(params.get('q')||'').trim(),cat=params.get('cat')||'', [sort,setSort]=useState('relevance'),[page,setPage]=useState(1),[debounced,setDebounced]=useState(q),[items,setItems]=useState([]),[total,setTotal]=useState(0),[loading,setLoading]=useState(true),[error,setError]=useState(''),[categories,setCategories]=useState([]),[brand,setBrand]=useState(''),[minPrice,setMinPrice]=useState(''),[maxPrice,setMaxPrice]=useState(''),[available,setAvailable]=useState(false);useEffect(()=>{const t=setTimeout(()=>{setDebounced(q);setPage(1)},300);return()=>clearTimeout(t)},[q]);useEffect(()=>{fetch(api+'/api/categories').then(r=>r.ok?r.json():[]).then(setCategories).catch(()=>setCategories([...new Set(catalog.products.map(p=>p.cat))]))},[catalog.products]);useEffect(()=>{let active=true;setLoading(true);setError('');const params=new URLSearchParams({paginated:'true',page:String(page),pageSize:'24',sort});if(debounced)params.set('q',debounced);if(cat)params.set('category',cat);if(brand.trim())params.set('brand',brand.trim());if(minPrice)params.set('minPrice',minPrice);if(maxPrice)params.set('maxPrice',maxPrice);if(available)params.set('available','true');fetch(api+'/api/products?'+params.toString()).then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.detail||'Could not search products.');return d}).then(d=>{if(active){setItems((d.items||[]).map(p=>({id:p.id,name:p.name,price:p.price,mrp:p.mrp,cat:p.category,img:p.imageUrl,desc:p.description,brand:p.brand,sku:p.sku})));setTotal(d.total||0)}}).catch(e=>{if(active)setError(e.message)}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[debounced,cat,sort,page,brand,minPrice,maxPrice,available]);const pages=Math.max(1,Math.ceil(total/24));return <><div className="pagehead"><small>PRODUCTS</small><h1>{debounced?`Results for "${debounced}"`:cat||'Shop all products'}</h1><p>{loading?'Searching catalogue...':`${total} ${total===1?'product':'products'} in the OM Stationary catalogue`}</p></div><div className="listing-tools"><div className="category-filters"><Link className={!cat?'selected':''} to="/search">All</Link>{categories.map(c=><Link className={cat===c?'selected':''} key={c} to={'/search?cat='+encodeURIComponent(c)}>{c}</Link>)}</div><label>Sort by <select value={sort} onChange={e=>{setPage(1);setSort(e.target.value)}}><option value="relevance">Relevance</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></label></div><div className="search-filters"><label>Brand<input value={brand} onChange={e=>{setPage(1);setBrand(e.target.value)}} placeholder="Filter brand"/></label><label>Min price<input type="number" min="0" value={minPrice} onChange={e=>{setPage(1);setMinPrice(e.target.value)}}/></label><label>Max price<input type="number" min="0" value={maxPrice} onChange={e=>{setPage(1);setMaxPrice(e.target.value)}}/></label><label className="filter-check"><input type="checkbox" checked={available} onChange={e=>{setPage(1);setAvailable(e.target.checked)}}/> In stock at OM Stationary</label></div>{error?<div className="catalog-state error" role="alert">{error}</div>:loading?<div className="catalog-state">Loading products...</div>:items.length?<><div className="grid">{items.map(p=><Card key={p.id} p={p} add={add} addN={addN} saved={wishlist.includes(p.id)} toggleWishlist={toggleWishlist}/>)}</div><nav className="pagination" aria-label="Product pages"><button className="outline" disabled={page<=1} onClick={()=>setPage(page-1)}>Previous</button><span>Page {page} of {pages}</span><button className="outline" disabled={page>=pages} onClick={()=>setPage(page+1)}>Next</button></nav></>:<div className="empty"><Search size={40}/><h2>No matching products</h2><p>Try another product name or browse a category.</p><Link className="btn" to="/search">Clear search</Link></div>}</>}function Product({add,addN,catalog,wishlist,toggleWishlist}){const navigate=useNavigate(),id=useParams().id,existing=catalog.products.find(x=>x.id===Number(id)),[remote,setRemote]=useState(null),[missing,setMissing]=useState(false);useEffect(()=>{let alive=true;setRemote(null);setMissing(false);if(catalog.loading)return()=>{alive=false};if(existing){setRemote(existing);return()=>{alive=false}}fetch(api+'/api/products/'+encodeURIComponent(id)).then(async r=>{if(r.status===404){setMissing(true);return null}if(!r.ok)throw new Error('Could not load product.');return r.json()}).then(p=>{if(alive&&p)setRemote({id:p.id,name:p.name,price:p.price,mrp:p.mrp,cat:p.category,img:p.imageUrl,desc:p.description,brand:p.brand,sku:p.sku});else if(alive&&!p)setMissing(true)}).catch(()=>{if(alive)setMissing(true)});return()=>{alive=false}},[id,catalog.loading,existing?.id]);const p=existing||remote;useEffect(()=>{if(!p)return;try{const ids=JSON.parse(localStorage.getItem('omrecent')||'[]'),recent=[p.id,...(Array.isArray(ids)?ids.filter(x=>x!==p.id):[])].slice(0,6);localStorage.setItem('omrecent',JSON.stringify(recent))}catch{}},[p?.id]);if(catalog.loading&&!p)return <div className="catalog-state">Loading product...</div>;if(!p&&!missing)return <div className="catalog-state">Loading product...</div>;if(!p)return <div className="empty"><PackageCheck/><h1>Product not found</h1><Link className="btn" to="/search">Browse products</Link></div>;return <><Link className="back" to="/search"><ArrowLeft/> Back to products</Link><section className="product product-premium"><div className="product-media">{p.img?<img src={p.img} alt={p.name}/>:<span className="image-placeholder"><PackageCheck/></span>}<span className="image-caption">OM Stationary catalogue</span></div><div className="product-info"><small>{p.cat}</small><h1>{p.name}</h1>{p.brand&&<p>{p.brand}</p>}<p>{p.desc||'Product details will be updated by OM Stationary.'}</p><div className="bigprice">&#8377;{p.price} {p.mrp>p.price&&<del>&#8377;{p.mrp}</del>}</div><p className="tax-note">Final price and availability are confirmed by the shop at order placement.</p><div className="deliverybox"><b>Choose delivery or pickup at checkout</b><span>Delivery is shown only for configured cities and verified shop stock. You can also select the official OM Stationary Pickup Station.</span></div><div className="purchase-actions"><button className="wishlist-detail" onClick={()=>toggleWishlist?.(p.id)}><Heart size={17} fill={wishlist.includes(p.id)?"currentColor":"none"}/>{wishlist.includes(p.id)?"Saved":"Save"}</button><button className="btn" onClick={()=>add(p)}><Plus size={17}/> Add to cart</button><button className="outline" onClick={()=>{add(p);navigate('/checkout')}}>Buy now</button></div><div className="product-trust"><ShieldCheck size={17}/> Cash on delivery available. Online payments are not yet configured.</div></div></section></>}function Wishlist({catalog,wishlist,add,addN,toggleWishlist,user,error='',loading=false,reload}){
 // The wishlist is server-owned, so the page renders straight from /api/wishlist instead of
 // filtering catalog.products. The catalogue loader is capped at one page, so deriving the saved
 // products from it silently hid any saved item outside that first page.
 const [rows,setRows]=useState([]),[rowLoading,setRowLoading]=useState(false),[rowError,setRowError]=useState('');
 const loadRows=useCallback(async()=>{if(user?.role!=='Customer'){setRows([]);return}setRowLoading(true);setRowError('');try{const r=await apiFetch('/api/wishlist');if(r.status===401){setRows([]);return}if(!r.ok)throw new Error('Wishlist could not be loaded.');const data=await r.json();setRows((Array.isArray(data)?data:[]).map(x=>({id:x.productId,name:x.name,price:x.price,mrp:x.mrp,cat:x.category,img:x.imageUrl,brand:x.brand,sku:x.sku,stock:x.stock})))}catch(e){setRowError(e.message||'Wishlist could not be loaded.')}finally{setRowLoading(false)}},[user?.role]);
 useEffect(()=>{loadRows()},[loadRows,wishlist.length]);
 const showError=error||rowError,busy=loading||rowLoading;
 if(user?.role==='Customer')return <><div className="pagehead"><small>SAVED PRODUCTS</small><h1>Your wishlist</h1><p>Saved to your OM Stationary account - it stays on every device you sign in from.</p></div>{showError?<div className="catalog-state error" role="alert">{showError} <button className="outline" onClick={()=>{reload?.();loadRows()}}>Retry</button></div>:busy?<div className="catalog-state">Loading saved products...</div>:rows.length?<div className="grid">{rows.map(p=><Card key={p.id} p={p} add={add} addN={addN} saved toggleWishlist={toggleWishlist}/>)}</div>:<div className="empty"><Heart size={40}/><h2>Your wishlist is empty</h2><p>Tap the heart on any product to save it here.</p><Link className="btn" to="/search">Browse products</Link></div>}</>;
 const {products,loading:catalogLoading,error:catalogError}=catalog,items=products.filter(p=>wishlist.includes(p.id));return <><div className="pagehead"><small>SAVED PRODUCTS</small><h1>Your wishlist</h1><p>You&rsquo;re browsing as a guest. Sign in to save this wishlist to your account.</p></div>{showError?<div className="catalog-state error" role="alert">{showError}</div>:busy||catalogLoading?<div className="catalog-state">Loading saved products...</div>:items.length?<div className="grid">{items.map(p=><Card key={p.id} p={p} add={add} addN={addN} saved toggleWishlist={toggleWishlist}/>)}</div>:<div className="empty"><Heart size={40}/><h2>Your wishlist is empty</h2><p>Sign in and tap the heart on any product to save it here.</p><Link className="btn" to="/search">Browse products</Link></div>}</>}
function Cart({cart,change,remove,addN}){const subtotal=cart.reduce((s,i)=>s+Number(i.price)*i.q,0),gst=0,delivery=0,total=subtotal+gst+delivery;if(!cart.length)return <div className="empty"><ShoppingCart size={48}/><h1>Your cart is empty</h1><p>Browse the catalogue and add the stationery and office essentials you need.</p><Link className="btn" to="/search">Continue Shopping</Link></div>;return <><div className="pagehead"><small>CART</small><h1>Your Shopping Cart</h1><p>{cart.reduce((s,i)=>s+i.q,0)} item(s). Stock and price are re-checked by the store when you place the order.</p></div><div className="cartlayout"><div>{cart.map(i=><div className="cartitem" key={i.id}><Link to={'/product/'+i.id}>{i.img?<img src={i.img} alt={i.name}/>:<span className="image-placeholder"><PackageCheck/></span>}</Link><div className="cartitem-body"><Link to={'/product/'+i.id}><b>{i.name}</b></Link><small>{i.cat}</small>{i.mrp>i.price&&<span className="discount">{Math.round((1-i.price/i.mrp)*100)}% off</span>}<div className="qty"><button type="button" aria-label={'Decrease '+i.name} onClick={()=>change(i.id,-1)}><Minus/></button><b>{i.q}</b><button type="button" aria-label={'Increase '+i.name} onClick={()=>change(i.id,1)}><Plus/></button></div></div><div className="cartitem-end"><strong>&#8377;{Number(i.price*i.q).toLocaleString('en-IN')}</strong><small>&#8377;{Number(i.price).toLocaleString('en-IN')} each</small><button type="button" className="cart-remove" onClick={()=>remove(i.id)}>Remove</button></div></div>)}</div><aside className="summary"><h3>Order Summary</h3><p><span>Items subtotal</span><b>&#8377;{subtotal.toLocaleString('en-IN')}</b></p><p><span>Discount</span><b>&#8377;0</b></p><p><span>Taxable value</span><b>&#8377;{subtotal.toLocaleString('en-IN')}</b></p><p><span>GST (0%)</span><b>&#8377;{gst}</b></p><p><span>Delivery</span><b>{delivery?'&#8377;'+delivery:'Free (pickup)'}</b></p><hr/><p className="total"><span>Grand Total</span><b>&#8377;{total.toLocaleString('en-IN')}</b></p><small>Delivery charges for doorstep delivery are quoted by the store at checkout.</small><Link className="btn wide" to="/checkout">Proceed to Checkout</Link><Link className="outline wide" to="/search">Continue Shopping</Link></aside></div></>}
function Orders({user}){const nav=useNavigate(),[number,setNumber]=useState(''),[recent,setRecent]=useState([]),[loading,setLoading]=useState(true);useEffect(()=>{let active=true;let ids=[];try{ids=JSON.parse(localStorage.getItem('omorders')||'[]');if(!Array.isArray(ids))ids=[]}catch{};(user?.role==='Customer'?apiFetch('/api/customers/orders').then(r=>r.ok?r.json():[]):Promise.all(ids.map(id=>apiFetch(`${api}/api/orders/${encodeURIComponent(id)}`,{headers:{'X-Tracking-Token':localStorage.getItem(`omtrack:${id}`)||''}}).then(r=>r.ok?r.json():null).catch(()=>null)))).then(rows=>{if(active)setRecent(rows.filter(Boolean))}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[user?.id]);return <><div className="pagehead"><small>MY ORDERS</small><h1>Track your orders</h1><p>Orders placed on this device appear here. You can also look up an order number from your confirmation.</p></div><div className="order-lookup panel"><form onSubmit={e=>{e.preventDefault();if(number.trim())nav('/track/'+encodeURIComponent(number.trim()))}}><label className="field-label">Order number<input required value={number} onChange={e=>setNumber(e.target.value)} placeholder="OM123456789"/></label><button className="btn">Find order</button></form></div><div className="rowhead"><h2>Recent orders</h2></div>{loading?<div className="catalog-state">Loading orders...</div>:recent.length?<div className="recent-orders">{recent.map(o=><Link className="recent-order" to={'/track/'+o.orderNumber} key={o.orderNumber}><div><b>{o.orderNumber}</b><span>{o.status} ? {new Date(o.createdAt).toLocaleDateString()}</span></div><b>&#8377;{o.totalAmount}</b><ChevronRight size={18}/></Link>)}</div>:<div className="catalog-state">No recent orders on this device yet.</div>}</>}
// Lightweight notification polling for signed-in customers. The API is the source of truth:
// the bell only shows what the Notifications table actually contains.
function useNotifications(user){
  const [state,setState]=useState({unread:0,items:[]});
  const load=useCallback(async()=>{
    if(user?.role!=='Customer'){setState({unread:0,items:[]});return}
    try{
      const r=await apiFetch('/api/notifications?take=30');
      if(!r.ok)return;
      setState(await r.json());
    }catch{}
  },[user?.id,user?.role]);
  useEffect(()=>{load()},[load]);
  useEffect(()=>{
    if(user?.role!=='Customer')return;
    const timer=setInterval(load,15000);
    return()=>clearInterval(timer);
  },[load,user?.role]);
  return {...state,refresh:load};
}

function NotificationsPage(){
  const session=readSession(),[data,setData]=useState({unread:0,items:[]}),[loading,setLoading]=useState(true);
  const load=async()=>{setLoading(true);try{const r=await apiFetch('/api/notifications?take=50');if(r.ok)setData(await r.json())}catch{}finally{setLoading(false)}};
  useEffect(()=>{load()},[]);
  if(!session?.accessToken)return <div className="empty"><Bell size={40}/><h1>Sign in to see notifications</h1><p>Order updates appear here once you are signed in.</p><Link className="btn" to="/login">Sign in</Link></div>;
  const markAll=async()=>{await apiFetch('/api/notifications/read-all',{method:'POST'});load()};
  return <><div className="pagehead"><small>NOTIFICATIONS</small><h1>Your notifications</h1><p>Order updates from OM Stationary. Refreshes automatically every 15 seconds.</p>{data.unread>0&&<button className="outline" onClick={markAll}>Mark all as read</button>}</div>
  {loading?<div className="catalog-state">Loading notifications...</div>:data.items.length?<div className="notification-list">{data.items.map(n=><article className={n.isRead?'notification':'notification unread'} key={n.id}><div><b>{n.title}</b><p>{n.message}</p><small>{new Date(n.createdAt).toLocaleString()}</small></div><div className="notification-actions">{n.orderNumber&&<Link className="outline" to={'/track/'+encodeURIComponent(n.orderNumber)}>Track</Link>}{n.orderNumber&&<Link className="outline" to={`/invoice/${encodeURIComponent(n.orderNumber)}`}>Invoice</Link>}{!n.isRead&&<button type="button" className="outline" onClick={async()=>{await apiFetch('/api/notifications/'+n.id+'/read',{method:'POST'});load()}}>Mark read</button>}</div></article>)}</div>:<div className="empty"><Bell size={40}/><h2>No notifications yet</h2><p>You will be notified here when your order status changes.</p><Link className="btn" to="/orders">View my orders</Link></div>}</>;
}

const OM_CONTACT={name:'OM Stationary',address:'G5JF+784, Ambedkar Rd, Sohgi, Bihar 800007',landmark:'Opp. Shravani Enclave, Sampatchak, Patna, Bihar',plusCode:'G5JF+784',maps:'https://www.google.com/maps/dir/?api=1&destination=25.5305282,85.173357'};

function AboutPage(){
  return <><div className="pagehead"><small>ABOUT US</small><h1>OM Stationary</h1><p>Your neighbourhood stationery and office supplies store in Patna, online and in person.</p></div>
  <section className="content-prose"><h2>Who we are</h2><p>OM Stationary sells stationery, printing supplies, office supplies and school supplies directly through this website. When you order here, you are ordering from us - we stock the products, pack them and deliver them ourselves.</p>
  <h2>Visit the store</h2><p>We are at <b>{OM_CONTACT.address}</b>, {OM_CONTACT.landmark}. Our plus code is <b>{OM_CONTACT.plusCode}</b>.</p>
  <p><a className="btn" href={OM_CONTACT.maps} target="_blank" rel="noreferrer"><Navigation size={16}/> Get directions</a></p>
  <h2>How ordering works</h2><ul><li>Browse the catalogue and add products to your cart.</li><li>Choose delivery to your address, or pickup from the store.</li><li>Pay cash on delivery, or online if online payment is enabled.</li><li>Track your order from placement through to delivery.</li></ul>
  <h2>Fair pricing</h2><p>The price you see is the price you pay. Taxes and delivery charges, if any, are shown before you place the order.</p></section></>;
}

function ContactPage(){
  const location=usePickupLocation();
  return <><div className="pagehead"><small>CONTACT</small><h1>Contact OM Stationary</h1><p>Visit the store, or reach us before you order.</p></div>
  <div className="contact-layout"><section className="panel"><h2>Store address</h2><p><b>{OM_CONTACT.name}</b><br/>{OM_CONTACT.address}<br/>{OM_CONTACT.landmark}</p><p><b>Plus code:</b> {OM_CONTACT.plusCode}</p><a className="btn" href={OM_CONTACT.maps} target="_blank" rel="noreferrer"><Navigation size={16}/> Get directions</a>
  {location?.hours&&<p className="pickup-meta"><Clock size={15}/>{location.hours}</p>}{location?.phone&&<p className="pickup-meta"><Phone size={15}/><a href={'tel:'+location.phone}>{location.phone}</a></p>}{location?.email&&<p className="pickup-meta"><Mail size={15}/><a href={'mailto:'+location.email}>{location.email}</a></p>}</section>
  <section className="panel"><h2>Need help with an order?</h2><p>Open the order from your account and use the track link to see its current status. For anything else, visit the store during business hours.</p><Link className="btn" to="/help">Help &amp; support</Link><Link className="outline" to="/orders">My orders</Link></section></div></>;
}

function HelpPage(){
  const [open,setOpen]=useState(0);
  const faqs=[['How do I track my order?','Open My Orders and select Track. Every status change is recorded by the store, so the timeline always reflects the real state of your order.'],['Can I pay when the order arrives?','Yes. Cash on delivery is available in serviceable PIN codes. Online payment appears at checkout only when it is enabled for the store.'],['How do I collect from the store?','Choose Pickup at checkout and select a date and time. You will get a notification when your order is packed and ready.'],['What if an item is out of stock?','Stock is checked again on the server when you place the order. If something is unavailable you will be told before the order is created.'],['How do I change or cancel an order?','Contact the store as early as possible. Orders can only be cancelled while they have not been handed over for delivery.'],['I need password help.','Password reset is not available online yet. Contact the store using the details on the Contact page so the team can help you securely.']];
  return <><div className="pagehead"><small>HELP &amp; SUPPORT</small><h1>Frequently asked questions</h1><p>Answers to the questions we are asked most often.</p></div>
  <div className="faq-list">{faqs.map(([q,a],i)=><details className="faq" key={q} open={open===i} onToggle={e=>setOpen(e.target.open?i:-1)}><summary>{q}</summary><p>{a}</p></details>)}</div>
  <section className="panel help-cta"><h2>Still need help?</h2><p>Visit the store or get in touch during business hours.</p><Link className="btn" to="/contact">Contact us</Link></section></>;
}

const LEGAL={privacy:{title:'Privacy Policy',intro:'This policy explains what OM Stationary collects when you use this website, and what we do with it.',sections:[['What we collect','We collect your name, mobile number, email address, delivery addresses, order details and payment status. We never ask for and never store card numbers, CVV, UPI PIN or any payment password.'],['Why we collect it','We use your details to process orders, deliver products, issue invoices, provide order updates and support you after delivery.'],['How long we keep it','We keep your order and invoice records for as long as needed for accounting and after-sales support. You can ask us to delete your account at any time.'],['Who we share it with','We do not sell your personal data. We share only what is strictly necessary with the delivery partner handling your order.'],['Your choices','You can view and edit your profile, addresses and order history from your account, and you can ask us to correct or delete your information.']]},terms:{title:'Terms & Conditions',intro:'These terms govern your use of the OM Stationary website and the orders you place through it.',sections:[['About us','OM Stationary is an independent retailer operating from G5JF+784, Ambedkar Rd, Sohgi, Patna, Bihar 800007.'],['Orders','An order is accepted only after the store confirms it. We may cancel an order if an item is unavailable or an obvious pricing error is found, and we will refund any amount collected.'],['Pricing','Prices include all charges shown at checkout. Prices and stock can change, and the price at the time your order is accepted is the price that applies.'],['Delivery','Delivery is available in configured PIN codes. Delivery is attempted during business hours. Risk and title pass to you on delivery.'],['Pickup','Pickup orders must be collected within the requested window. Uncollected orders may be cancelled and refunded.'],['Liability','We are responsible for delivering the goods described on your invoice. Nothing in these terms limits your statutory consumer rights.']]},refund:{title:'Refund Policy',intro:'We want refunds to be simple and fair. This policy explains when and how they work.',sections:[['Damaged or wrong items','Contact us within 48 hours of delivery with photographs. We will arrange a replacement or a full refund.'],['Order cancelled by us','If we cancel your order, any amount collected is refunded in full to the original payment method.'],['Cash on delivery','For cash on delivery orders, a refund is processed by our team and settled to your account within 5-7 working days of approval.'],['Online payments','Refunds go back to the original payment method and may take 5-7 working days to appear, depending on your bank or provider.'],['Non-refundable cases','Change-of-mind returns are not accepted on opened stationery, unless the product is faulty or incorrect.']]}};

function LegalPage({kind}){
  const doc=LEGAL[kind];
  if(!doc)return <div className="empty"><h1>Page not found</h1><Link className="btn" to="/">Back to home</Link></div>;
  return <><div className="pagehead"><small>OM STATIONARY</small><h1>{doc.title}</h1><p>{doc.intro}</p></div>
  <section className="content-prose">{doc.sections.map(([h,p])=><div key={h}><h2>{h}</h2><p>{p}</p></div>)}<p className="muted">Last updated 1 September 2026. OM Stationary, {OM_CONTACT.address}.</p></section></>;
}
// Fallback used only until the admin's first load returns the authoritative list from the server.
// The backend sends `nextStatuses` per order, which is what the action buttons are actually built from.
const FALLBACK_NEXT_STATUSES={
 'Pending':['Confirmed'],'Placed':['Confirmed'],'Confirmed':['Preparing'],'Accepted':['Preparing'],
 'Preparing':['Ready for Pickup','Out for Delivery'],'Ready for Pickup':['Picked Up','Out for Delivery'],
 'Picked Up':['Delivered'],'Out for Delivery':['Delivered'],'Delivery Failed':['Confirmed'],
 'Delivered':[],'Cancelled':[],'RefundPending':['Refunded'],'Refunded':[]};
const ACTION_LABELS={'Confirmed':'Confirm order','Accepted':'Accept order','Preparing':'Start preparing',
 'Ready for Pickup':'Mark ready for pickup','Picked Up':'Mark picked up','Out for Delivery':'Send out for delivery',
 'Delivered':'Mark delivered','Delivery Failed':'Report delivery failed','Confirmed (retry)':'Retry confirmation',
 'RefundPending':'Request refund','Refunded':'Mark refunded'};

function AdminSectionData({title,data}){
 if(data?.error)return <section className="panel admin-orders"><h2>{title}</h2><p className="form-error" role="alert">{data.error}</p></section>;
 const rows=Array.isArray(data)?data:Array.isArray(data?.items)?data.items:data?[data]:[];
 const columns=rows.length&&rows[0]&&typeof rows[0]==='object'?Object.keys(rows[0]):[];
 return <section className="panel admin-orders"><div className="rowhead"><h2>{title}</h2><span>{data?.total??rows.length} records</span></div>
  {!rows.length?<p>No records are available.</p>:<div className="admin-data-scroll"><table className="admin-table"><thead><tr>{columns.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{rows.map((row,index)=><tr key={row.id??row.orderNumber??index}>{columns.map(c=>{const value=row[c];return <td key={c}>{value==null?'—':typeof value==='object'?JSON.stringify(value):String(value)}</td>})}</tr>)}</tbody></table></div>}
 </section>;
}
const ADMIN_SECTIONS=[
 ['dashboard','Dashboard',null],['orders','Orders','/api/orders'],['order-details','Order Details','/api/admin/orders?pageSize=100'],
 ['products','Products','/api/admin/products?pageSize=50'],['categories','Categories','/api/admin/categories'],
 ['inventory','Inventory','/api/admin/products?pageSize=50'],['customers','Customers','/api/admin/customers'],
 ['payments','Payments','/api/admin/payments'],['delivery','Delivery','/api/delivery/management/assignments'],['coupons','Coupons','/api/admin/coupons'],
 ['notifications','Notifications','/api/admin/notifications'],['invoices','Invoices','/api/admin/invoices'],
 ['reports','Reports','/api/admin/reports'],['audit-log','Audit log','/api/admin/audit-log'],
 ['whatsapp','WhatsApp','/api/admin/whatsapp'],['settings','Settings','/api/admin/settings']
];
function Admin({user,onLogout}){
 const [key,setKey]=useState(()=>sessionStorage.getItem('omadminkey')||''),[entry,setEntry]=useState(()=>sessionStorage.getItem('omadminkey')||''),
 [orders,setOrders]=useState([]),[dashboard,setDashboard]=useState(null),[products,setProducts]=useState([]),[sectionData,setSectionData]=useState(null),[error,setError]=useState(''),[loading,setLoading]=useState(false),[message,setMessage]=useState(''),[tab,setTab]=useState('dashboard'),[pendingStatus,setPendingStatus]=useState(null),[wa,setWa]=useState(null),[waBusy,setWaBusy]=useState(false),[waMessage,setWaMessage]=useState(''),[analytics,setAnalytics]=useState(null);
 const nextStatusesFor=o=>Array.isArray(o.nextStatuses)?o.nextStatuses:(FALLBACK_NEXT_STATUSES[o.status]??[]);
 const session=readSession(),hasAdminSession=user?.role==='Admin'&&!!session?.accessToken,headers={...(hasAdminSession?{Authorization:`Bearer ${session.accessToken}`}:{'X-Admin-Key':key}),'Content-Type':'application/json'};
 const load=async()=>{if(!key&&!hasAdminSession)return;setLoading(true);setError('');try{
   const [o,d,p,a]=await Promise.all([
     apiFetch(api+'/api/orders',{headers}),
     apiFetch(api+'/api/admin/dashboard',{headers}),
     apiFetch(api+'/api/admin/products?pageSize=50',{headers}),
     apiFetch(api+'/api/admin/analytics',{headers})]);
   if(o.status===401)throw new Error('Admin sign-in is required.');
   if(!o.ok)throw new Error('Could not load orders.');
   setOrders(await o.json());
   setDashboard(d.ok?await d.json():null);
   setProducts(p.ok?(await p.json()).items||[]:[]);
   setAnalytics(a.ok?await a.json():null);
   const endpoint=ADMIN_SECTIONS.find(([id])=>id===tab)?.[2];
   if(endpoint&&tab!=='dashboard'&&tab!=='orders'&&tab!=='products'&&tab!=='whatsapp'){
     const response=await apiFetch(api+endpoint,{headers});
     const payload=await response.json().catch(()=>({detail:'No response data.'}));
     setSectionData(response.ok?payload:{error:payload.detail||payload.title||`Could not load ${tab}.`});
   }else setSectionData(null);
 }catch(e){setError(e.message)}finally{setLoading(false)}};
 useEffect(()=>{load()},[key,user?.id,tab]);
 const saveKey=e=>{e.preventDefault();sessionStorage.setItem('omadminkey',entry);setKey(entry)};
  const setStatus=async(id,status)=>{setMessage('');setError('');setPendingStatus(id);try{const r=await apiFetch(`${api}/api/orders/${id}/status`,{method:'PATCH',headers,body:JSON.stringify({status})});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||`This order cannot move to ${status}.`);setMessage(`Order moved to ${status}.`);await load()}catch(e){setError(e.message||'Status update failed.')}finally{setPendingStatus(null)}};
 const assign=async(id,form)=>{const values=new FormData(form.currentTarget);try{const r=await apiFetch(`${api}/api/orders/${id}/delivery`,{method:'POST',headers,body:JSON.stringify({partnerName:values.get('partner'),trackingCode:values.get('tracking')})});const d=await r.json();if(!r.ok)throw new Error(d.detail||'Delivery assignment failed.');setMessage('Delivery assignment saved.');await load()}catch(e){setError(e.message)}};
 const markPaid=async id=>{try{const r=await apiFetch(`${api}/api/orders/${id}/payment`,{method:'PATCH',headers,body:JSON.stringify({status:'Paid'})});const d=await r.json();if(!r.ok)throw new Error(d.detail||'Could not confirm COD receipt.');setMessage('Cash receipt recorded.');await load()}catch(e){setError(e.message)}};
 const adjustStock=async(id,delta)=>{try{const r=await apiFetch(`${api}/api/admin/products/${id}/stock`,{method:'POST',headers,body:JSON.stringify({delta})});const d=await r.json();if(!r.ok)throw new Error(d.detail||'Could not update stock.');setMessage('Stock updated.');await load()}catch(e){setError(e.message)}};
 const toggleProduct=async p=>{try{const r=await apiFetch(`${api}/api/admin/products/${p.id}`,{method:'PUT',headers,body:JSON.stringify({name:p.name,sku:p.sku,brand:p.brand,unit:p.unit,category:p.category,description:p.description,shortDescription:p.description,price:p.price,mrp:p.mrp,stock:p.stock,lowStockThreshold:p.lowStockThreshold,imageUrl:p.imageUrl,isActive:!p.isActive})});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||'Could not update product.');setMessage('Product updated.');await load()}catch(e){setError(e.message)}};
 // ---- WhatsApp Business Cloud API panel -------------------------------------------------
 // This screen only ever shows whether the integration is configured. The access token lives in
 // server configuration and is never sent to the browser, so there is nothing here to leak.
 const loadWa=async()=>{setWaBusy(true);setWaMessage('');try{const r=await apiFetch(api+'/api/admin/whatsapp?take=50',{headers});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||'Could not load WhatsApp settings.');setWa(d)}catch(e){setWaMessage(e.message||'Could not load WhatsApp settings.')}finally{setWaBusy(false)}};
 useEffect(()=>{if(tab==='whatsapp')loadWa()},[tab]);
 const saveWa=async patch=>{setWaBusy(true);setWaMessage('');try{const r=await apiFetch(api+'/api/admin/whatsapp/settings',{method:'PUT',headers,body:JSON.stringify(patch)});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||'Could not save WhatsApp settings.');setWa(d);setWaMessage('WhatsApp settings saved.')}catch(e){setWaMessage(e.message||'Could not save WhatsApp settings.')}finally{setWaBusy(false)}};
 const sendTest=async()=>{setWaBusy(true);setWaMessage('');try{const r=await apiFetch(api+'/api/admin/whatsapp/test',{method:'POST',headers});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||'The test message could not be sent.');setWaMessage(d.message||(d.success?'Test message accepted by the provider.':'The provider did not accept the test message.')+(d.error?` (${d.error})`:''));await loadWa()}catch(e){setWaMessage(e.message||'The test message could not be sent.')}finally{setWaBusy(false)}};
 const retryWa=async id=>{setWaBusy(true);setWaMessage('');try{const r=await apiFetch(`${api}/api/admin/whatsapp/${id}/retry`,{method:'POST',headers});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||'Retry failed.');setWaMessage(d.success?'Notification re-sent.':'Retry attempted: '+d.status);await loadWa()}catch(e){setWaMessage(e.message||'Retry failed.')}finally{setWaBusy(false)}};
 if(!key&&!hasAdminSession)return <div className="account panel"><h1>Admin sign in</h1><p>Sign in with an Admin account to manage orders, catalogue and stock.</p><Link className="btn wide" to="/login">Sign in</Link><form onSubmit={saveKey}><label className="field-label">Legacy admin access key<input type="password" value={entry} onChange={e=>setEntry(e.target.value)}/></label><button className="outline wide">Use legacy key</button></form></div>;
 const money=v=>'&#8377;'+Number(v||0).toLocaleString('en-IN');
 return <><div className="pagehead"><small>ADMIN PANEL</small><h1>OM Stationary control centre</h1><p>Manage orders, catalogue, stock and delivery for the OM Stationary store.</p><button className="outline" onClick={onLogout}>Sign out</button></div>
 {error&&<p className="form-error" role="alert">{error}</p>}{message&&<p role="status">{message}</p>}
 {tab==='dashboard'&&dashboard&&<><div className="adminstats"><div><b>{dashboard.totalOrders}</b><span>Total orders</span></div><div><b>{dashboard.todayOrders}</b><span>Today's orders</span></div><div><b>{dashboard.pendingOrders}</b><span>Needs action</span></div><div><b>{dashboard.deliveredOrders}</b><span>Delivered</span></div><div><b>{money(dashboard.revenue)}</b><span>Revenue</span></div><div><b>{money(dashboard.codAmount)}</b><span>COD outstanding</span></div><div><b>{dashboard.customers}</b><span>Customers</span></div><div><b>{dashboard.lowStockProducts}</b><span>Low stock</span></div></div>
 {dashboard.lowStockProducts>0&&<div className="low-stock-alert" role="alert"><AlertTriangle size={20}/><div><b>Low Stock Alert</b><p>{dashboard.lowStockProducts} products need restocking. Check the Products tab to view details.</p></div><Link className="btn" to="#" onClick={()=>setTab('products')}>View Products</Link></div>}
 {analytics?.daily?.length>0&&<React.Suspense fallback={<div className="catalog-state">Loading sales charts...</div>}><AdminCharts analytics={analytics}/></React.Suspense>}
 {analytics?.topProducts&&analytics.topProducts.length>0&&<div className="admin-chart-section"><div className="rowhead"><small>TOP SELLING</small><h2>Most Popular Products</h2></div><div className="admin-products-grid">{analytics.topProducts.slice(0,5).map((p,i)=><div className="admin-product-card" key={i}><b>{i+1}. {p.productName}</b><span>{p.quantity} sold</span><b>{money(p.revenue)}</b></div>)}</div></div>}</>}
 <div className="listing-tools"><nav className="admin-section-nav" aria-label="Admin sections">{ADMIN_SECTIONS.map(([id,label])=><button type="button" key={id} className={tab===id?'selected':''} aria-current={tab===id?'page':undefined} onClick={()=>setTab(id)}>{label}</button>)}</nav><button className="outline" onClick={load} disabled={loading}>{loading?'Refreshing...':'Refresh'}</button></div>
 {sectionData&&<AdminSectionData title={ADMIN_SECTIONS.find(([id])=>id===tab)?.[1]||tab} data={sectionData}/>}
 {tab==='orders'&&<section className="panel admin-orders"><div className="rowhead"><h2>Orders</h2><span>{orders.length} total</span></div>
  {orders.map(o=><article className="admin-order" key={o.id}><div className="admin-order-head"><div><b>{o.orderNumber}</b><span>{o.customerName} &middot; {o.customerPhone}</span></div><div><b>{money(o.totalAmount)}</b><span>{o.paymentMethod} &middot; {o.paymentStatus}</span></div></div>
  <p>{o.deliveryAddress}{o.city?`, ${o.city} ${o.pincode}`:''}</p>
   <div className="admin-order-controls">
    <div className="admin-status-actions"><span className="admin-current-status">Status: <b>{o.status}</b></span>
     {nextStatusesFor(o).length?nextStatusesFor(o).map(s=><button key={s} className="outline" disabled={pendingStatus===o.id} onClick={()=>setStatus(o.id,s)}>{ACTION_LABELS[s]||s}</button>):<span className="admin-terminal">No further action available.</span>}
     {pendingStatus===o.id&&<small role="status">Saving...</small>}
    </div>
    <form className="assign-form" onSubmit={e=>{e.preventDefault();assign(o.id,e)}}><label className="field-label">Delivery partner<input name="partner" required placeholder="Partner name"/></label><label className="field-label">Tracking code<input name="tracking" placeholder="Optional"/></label><button className="outline">Assign delivery</button></form>
    {o.paymentStatus!=='Paid'&&['Delivered','Picked Up'].includes(o.status)&&<button className="outline" onClick={()=>markPaid(o.id)}>Confirm cash received</button>}
   </div></article>)}{!loading&&!orders.length&&<p>No orders yet.</p>}</section>}
 {tab==='products'&&<section className="panel admin-orders"><div className="rowhead"><h2>Products &amp; stock</h2><span>{products.length} products</span></div>
  <div className="listing-tools"><table className="admin-table"><thead><tr><th>Product</th><th>SKU</th><th>Price</th><th>Stock</th><th>Adjust</th><th>Status</th></tr></thead><tbody>
  {products.map(p=><tr key={p.id}><td><b>{p.name}</b><small>{p.category} &middot; {p.unit}</small></td><td>{p.sku||'-'}</td><td>{money(p.price)}</td><td className={p.stock<=p.lowStockThreshold?'low-stock':''}>{p.stock}</td><td><button className="outline" onClick={()=>adjustStock(p.id,10)}>+10</button><button className="outline" onClick={()=>adjustStock(p.id,-1)}>-1</button></td><td><button className="outline" onClick={()=>toggleProduct(p)}>{p.isActive?'Active':'Inactive'}</button></td></tr>)}
  </tbody></table></div></section>}
 {tab==='whatsapp'&&<section className="panel admin-orders"><div className="rowhead"><h2>WhatsApp notifications</h2><button className="outline" onClick={loadWa} disabled={waBusy}>{waBusy?'Working...':'Refresh'}</button></div>
  {waMessage&&<p role="status">{waMessage}</p>}
  {!wa&&<p>Loading WhatsApp settings...</p>}
  {wa&&<>
   <div className={wa.configuration.configured?'wa-ok':'wa-warn'}>
    <b>{wa.configuration.configured?'WhatsApp Business API is connected':'WhatsApp Business API is not configured'}</b>
    <p>{wa.configuration.note}</p>
    <p>Admin number: <b>{wa.configuration.adminNumber||'-'}</b>{wa.configuration.adminNumberNormalised?` (sends as ${wa.configuration.adminNumberNormalised})`:''} &middot; API version {wa.configuration.apiVersion}</p>
    {!wa.configuration.configured&&wa.configuration.missing.length>0&&<p><small>Set these server settings: {wa.configuration.missing.join(', ')}</small></p>}
    <p><small>The access token is stored in server configuration only. It is never returned by this API and cannot be set from the browser.</small></p>
   </div>
   <div className="wa-controls">
    <label className="wa-toggle"><input type="checkbox" checked={wa.configuration.enabled} disabled={waBusy} onChange={e=>saveWa({enabled:e.target.checked})}/> Enable WhatsApp notifications</label>
    <div className="wa-toggles">{[['newOrder','New orders'],['orderStatus','Order status changes'],['paymentUpdate','Payments received'],['lowStock','Low stock alerts'],['newCustomer','New customers']].map(([k,label])=><label className="wa-toggle" key={k}><input type="checkbox" checked={wa.eventTypes[k]} disabled={waBusy} onChange={e=>saveWa({[k]:e.target.checked})}/> {label}</label>)}</div>
    <button className="btn" onClick={sendTest} disabled={waBusy||!wa.configuration.configured}>Send test message</button>
   </div>
   <div className="rowhead"><h3>Notification log</h3><span>{wa.total} total &middot; {wa.log.filter(x=>x.status==='Sent').length} sent &middot; {wa.log.filter(x=>x.status==='Failed').length} failed &middot; {wa.log.filter(x=>x.status==='NotConfigured').length} not configured</span></div>
   {wa.log.length?wa.log.map(n=><article className="wa-log" key={n.id}>
     <div><b>{n.notificationType}{n.orderNumber?` · ${n.orderNumber}`:''}</b><span>{n.createdAt?new Date(n.createdAt).toLocaleString('en-IN'):''} &rarr; {n.recipient}</span></div>
     <span className={n.status==='Sent'?'wa-ok':n.status==='Failed'?'wa-warn':''}>{n.status}</span>
     <p>{n.message}</p>
     {n.errorMessage&&<p className="form-error">{n.errorMessage}</p>}
     {n.providerMessageId&&<small>Provider message id: {n.providerMessageId}</small>}
     {n.status==='Failed'&&<button className="outline" onClick={()=>retryWa(n.id)} disabled={waBusy}>Retry send</button>}
   </article>):<p>No notifications have been attempted yet.</p>}
  </>}
 </section>}
 </>;
}
function usePickupLocation(){
  const [location,setLocation]=useState(null);
  useEffect(()=>{
    let active=true;
    fetch(api+'/api/locations/om-stationary')
      .then(r=>r.ok?r.json():Promise.reject())
      .then(d=>{if(active)setLocation(d)})
      .catch(()=>{if(active)setLocation(null)});
    return()=>{active=false};
  },[]);
  return location;
}
function PickupStation({location,compact=false}){const address=location?.address||"",target=location?.latitude&&location?.longitude?`${location.latitude},${location.longitude}`:address,directions=address?`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(target)}`:"",map=address?`https://maps.google.com/maps?q=${encodeURIComponent(target)}&output=embed`:"";return <section className={`pickup-station${compact?" compact":""}`}><div className="pickup-copy"><div className="pickup-title"><MapPin size={19}/><div><h3>OM Stationary Pickup Station</h3>{address&&<span className="pickup-status">&#9679; Pickup available</span>}</div></div><p className="pickup-address">{address||"Set OmStationary:Address in backend configuration to show this location."}</p>{location?.hours&&<p className="pickup-meta"><Clock size={15}/>{location.hours}</p>}{location?.phone&&<a className="pickup-meta" href={`tel:${location.phone}`}><Phone size={15}/>{compact?"Contact":location.phone}</a>}{!compact&&location?.email&&<a className="pickup-meta" href={`mailto:${location.email}`}><Mail size={15}/>{location.email}</a>}{address&&<div className="pickup-actions"><a className="btn" href={directions} target="_blank" rel="noreferrer"><Navigation size={16}/> Get Directions</a>{location?.phone&&<a className="outline" href={`tel:${location.phone}`}>Contact</a>}</div>}</div>{map&&<iframe title="OM Stationary Pickup Station map" src={map} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>}</section>}
function Track(){
  const {id}=useParams(),location=usePickupLocation();
  const [order,setOrder]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
  const [payState,setPayState]=useState(''),[verifying,setVerifying]=useState(false);
  const token=()=>localStorage.getItem(`omtrack:${id}`)||'';
  useEffect(()=>{let active=true;setLoading(true);setError('');setPayState('');
    apiFetch(`${api}/api/orders/${encodeURIComponent(id)}`,{headers:{'X-Tracking-Token':token()}})
      .then(async r=>{if(r.status===404)throw new Error('We could not find that order number. Check the number, or sign in to the account that placed it.');if(r.status===429)throw new Error('Too many lookups. Please wait a moment and try again.');if(!r.ok)throw new Error('Could not load this order. Please try again.');return r.json()})
      .then(d=>{if(active)setOrder(d)})
      .catch(e=>{if(active)setError(e.message)})
      .finally(()=>{if(active)setLoading(false)});
return()=>{active=false};
  },[id]);

  // The store's payment service is the only authority on whether an online payment succeeded.
  const verifyPayment=async()=>{if(verifying)return;setVerifying(true);setPayState('');
    try{const r=await apiFetch(`/api/payments/orders/${encodeURIComponent(id)}/status`,{method:'POST',headers:{'X-Tracking-Token':token()}});
      if(!r.ok){const b=await r.json().catch(()=>({}));setPayState(b?.detail||'Payment verification is not available for this order.');return}
      const d=await r.json();
      if(d?.status==='Paid'||d?.paymentStatus==='Paid'){setPayState('Payment verified by OM Stationary.');const fresh=await apiFetch(`${api}/api/orders/${encodeURIComponent(id)}`,{headers:{'X-Tracking-Token':token()}});if(fresh.ok)setOrder(await fresh.json());return}
      if(d?.status==='ReviewRequired'){setPayState(d.detail||'The amount reported by the gateway does not match this order. Our team will review it.');return}
      if(d?.status==='Failed'){setPayState('The payment attempt was not completed. You can try paying again from the order page.');return}
      if(d?.verified===false&&d?.status==='NotConfigured'){setPayState('Payment verification not configured. The order stays Pending until the store confirms it.');return}
      setPayState(d?.detail||'Payment not confirmed yet. Complete the UPI payment and verify again.');
    }catch{setPayState('Could not reach the payment service. Please try again.')}finally{setVerifying(false)}};

  if(loading)return <div className="catalog-state">Loading order…</div>;
  if(error)return <div className="empty"><PackageCheck size={44}/><h1>Order lookup</h1><p>{error}</p><Link className="btn" to="/orders">Try another order</Link></div>;
  if(!order)return <div className="empty"><PackageCheck size={44}/><h1>Order not found</h1><Link className="btn" to="/orders">Go to orders</Link></div>;

  const pickup=order.fulfillmentMethod==='Pickup',online=/upi/i.test(String(order.paymentMethod||''));
  const paid=String(order.paymentStatus||'').toLowerCase()==='paid';
  const subtotal=Number(order.subtotal||0),discount=Number(order.discountAmount||0),tax=Number(order.taxAmount||0),
    delivery=Number(order.deliveryCharge||0),total=Number(order.totalAmount||0);

  return <><div className="pagehead"><small>ORDER TRACKING</small><h1>Order {order.orderNumber}</h1>
    <p>Placed {new Date(order.createdAt).toLocaleString()}{order.requestedDeliveryDate&&` · ${pickup?'Pickup':'Delivery'} requested for ${new Date(order.requestedDeliveryDate).toLocaleString()}`}</p>
    <div className="track-actions"><Link className="btn" to={`/invoice/${encodeURIComponent(order.orderNumber)}`}>View invoice</Link><Link className="outline" to="/orders">All my orders</Link><Link className="outline" to="/search">Continue shopping</Link></div></div>
  <div className="tracking-layout"><section className="track">
    <div className="tracking-current"><span className={paid?'pill ok':'pill pending'}>{order.status}</span>
      <p>{pickup?'Your order will be collected from OM Stationary.':'Your order is with the verified local delivery flow.'}</p></div>
    <dl className="flow-facts"><div><dt>Customer</dt><dd>{order.customerName||'—'}</dd></div>
      <div><dt>Mobile</dt><dd>{order.customerPhone||'—'}</dd></div>
      <div><dt>Email</dt><dd>{order.customerEmail||'—'}</dd></div>
      <div><dt>Fulfillment</dt><dd>{order.fulfillmentMethod}</dd></div></dl>

    <h3>Items</h3>
    {order.items?.map((i,n)=><div className="tracking-item" key={n}><span>{i.productName} &times; {i.quantity}</span><b>&#8377;{Number(i.unitPrice*i.quantity).toLocaleString('en-IN')}</b></div>)}
    <hr/>
    <div className="tracking-item"><span>Items subtotal</span><b>&#8377;{subtotal.toLocaleString('en-IN')}</b></div>
    {discount>0&&<div className="tracking-item"><span>Discount{order.couponCode?` (${order.couponCode})`:''}</span><b>&minus; &#8377;{discount.toLocaleString('en-IN')}</b></div>}
    <div className="tracking-item"><span>GST</span><b>&#8377;{tax.toLocaleString('en-IN')}</b></div>
    <div className="tracking-item"><span>Delivery</span><b>{delivery>0?`\u20b9${delivery}`:'Free'}</b></div>
    <div className="tracking-item tracking-total"><span>Total</span><b>&#8377;{total.toLocaleString('en-IN')}</b></div>

    <h3>Payment</h3>
    <p className="tracking-payment">Method: <b>{online?'Online Payment (UPI)':'Pay on Shop (COD)'}</b> &middot; Status: <b className={paid?'status-paid':'status-pending'}>{order.paymentStatus}</b></p>
    {online&&!paid&&<><button className="outline" onClick={verifyPayment} disabled={verifying}>{verifying?'Verifying with OM Stationary…':'Verify payment status'}</button>{payState&&<p className="quote-bad" role="status">{payState}</p>}</>}
    {online&&paid&&<p className="quote-ok"><CheckCircle2 size={16}/> Payment verified by OM Stationary</p>}

    {order.history?.length>0&&<><h3>Status history</h3><ol className="tracking-history">{order.history.map((h,n)=><li key={n}><b>{h.status}</b><span>{h.note||''}</span><small>{new Date(h.createdAt).toLocaleString()}</small></li>)}</ol></>}
  </section>{pickup&&<PickupStation location={location} compact/>}</div></>
}
function FooterMap(){const location=usePickupLocation();return <footer className="site-footer"><div className="footer-brand"><b>OM STATIONARY</b><span>Everything you need, one place.</span><nav className="footer-links"><Link to="/">Home</Link><Link to="/search">Shop</Link><Link to="/orders">Orders</Link><Link to="/wishlist">Wishlist</Link><Link to="/notifications">Notifications</Link><Link to="/account">Account</Link><Link to="/cart">Cart</Link><Link to="/admin">Admin</Link></nav><b>Help</b><Link to="/help">Help &amp; Support</Link><Link to="/contact">Contact</Link><Link to="/about">About Us</Link><b>Legal</b><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms &amp; Conditions</Link><Link to="/refund-policy">Refund Policy</Link>{location?.phone&&<><a href={`tel:${location.phone}`}>{location.phone}</a><a className="whatsapp-link" href={`https://wa.me/${location.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"><MessageCircle size={15}/> WhatsApp</a></>}{location?.email&&<a href={`mailto:${location.email}`}>{location.email}</a>}<span>&copy; 2026 OM Stationary</span></div><div className="footer-details"><section><h3>Visit Us</h3><b>OM Stationary</b><p>{location?.address||"Address will appear when configured."}</p>{location?.hours&&<p className="pickup-meta"><Clock size={15}/>{location.hours}</p>}</section><PickupStation location={location} compact/></div></footer>}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </BrowserRouter>
);


