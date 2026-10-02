# OM STATIONARY - Customer Flow Upgrade
# Run in PowerShell. It backs up files before changing anything.
$ErrorActionPreference = "Stop"

$root = "D:\om-stationary-final"
$front = Join-Path $root "frontend"
$src = Join-Path $front "src"

if (-not (Test-Path $src)) {
  throw "Project not found at $root"
}

function Write-Utf8NoBom([string]$Path, [string]$Text) {
  [System.IO.File]::WriteAllText(
    $Path,
    $Text,
    (New-Object System.Text.UTF8Encoding($false))
  )
}

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
Copy-Item "$src\main.jsx" "$src\main.before-flow-$stamp.jsx" -Force
Copy-Item "$src\AccountPages.jsx" "$src\AccountPages.before-flow-$stamp.jsx" -Force
Copy-Item "$src\styles.css" "$src\styles.before-flow-$stamp.css" -Force
if (Test-Path "$src\session.js") {
  Copy-Item "$src\session.js" "$src\session.before-flow-$stamp.js" -Force
}

# qrcode.react is used for the exact-amount UPI QR.
Set-Location $front
npm install qrcode.react

# ---------- main.jsx ----------
$mainPath = "$src\main.jsx"
$main = [System.IO.File]::ReadAllText($mainPath)

$main = $main.Replace(
  "import {Search,ShoppingCart,User,MapPin,Truck,Clock,ChevronRight,Plus,Minus,ArrowLeft,PackageCheck,ShieldCheck,Phone,Mail,Navigation,MessageCircle,Heart,Bell} from 'lucide-react';",
  "import {Search,ShoppingCart,User,MapPin,Truck,Clock,ChevronRight,Plus,Minus,ArrowLeft,PackageCheck,ShieldCheck,Phone,Mail,Navigation,MessageCircle,Heart,Bell,Settings,CheckCircle2,CreditCard,Store,Receipt} from 'lucide-react';`r`nimport {QRCodeSVG} from 'qrcode.react';"
)

$main = $main.Replace(
  "const api=import.meta.env.VITE_API_URL||'https://localhost:7001';",
  "const api=import.meta.env.VITE_API_URL||'http://localhost:5000';"
)

# Admin button in the top header.
$oldHeader = '<Link to="/account" className="headlink"><User/></Link></div>'
$newHeader = '<Link to="/account" className="headlink"><User/></Link><Link to="/admin" className="admin-top-button"><Settings size={16}/> Admin</Link></div>'
if ($main.Contains($oldHeader)) {
  $main = $main.Replace($oldHeader, $newHeader)
}

# Quantity counter beside Add to cart.
$cardPattern = '(?s)function Card\(.*?\nfunction SearchPage'
$cardReplacement = @'
function Card({p,add,saved=false,toggleWishlist}){
  const [qty,setQty]=useState(1);
  const discount=p.mrp>p.price?Math.round((1-p.price/p.mrp)*100):0;
  const addQty=()=>{
    for(let i=0;i<qty;i++) add(p);
  };
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
      <p className="stock-note">Availability confirmed when your order is placed</p>
      <div className="add-row">
        <div className="qty-mini">
          <button type="button" onClick={()=>setQty(v=>Math.max(1,v-1))}>−</button>
          <b>{qty}</b>
          <button type="button" onClick={()=>setQty(v=>Math.min(99,v+1))}>+</button>
        </div>
        <button className="add" onClick={addQty}><Plus size={16}/> Add <span className="added-preview">{qty}</span></button>
      </div>
      <Link className="card-view" to={'/product/'+p.id}>View product <ChevronRight size={15}/></Link>
    </div>
  </article>
}
function SearchPage
'@
if ([regex]::IsMatch($main,$cardPattern)) {
  $main = [regex]::Replace($main,$cardPattern,$cardReplacement,1)
} else {
  Write-Warning "Card function pattern was not found; quantity control was not changed."
}

# Replace the old checkout with the upgraded checkout.
$checkoutPattern = '(?s)function Checkout\(.*?\nfunction Track'
$checkoutReplacement = @'
function Checkout({cart,setCart,user}){
  const nav=useNavigate();
  const location=usePickupLocation();
  const [payment,setPayment]=useState('Shop');
  const [name,setName]=useState(user?.fullName||user?.name||'');
  const [phone,setPhone]=useState(user?.phone||'');
  const [email,setEmail]=useState(user?.email||'');
  const [address,setAddress]=useState('');
  const [state,setState]=useState('Bihar');
  const [pincode,setPincode]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const [qr,setQr]=useState('');
  const [order,setOrder]=useState(null);
  const subtotal=cart.reduce((s,i)=>s+i.price*i.q,0);
  const total=subtotal;
  const upiId='paytm.s3ke6dg@pty';

  useEffect(()=>{
    if(!user) return;
    setName(user.fullName||user.name||'');
    setPhone(user.phone||'');
    setEmail(user.email||'');
  },[user]);

  if(!cart.length) return <div className="empty flow-empty"><ShoppingCart/><h1>Your cart is empty</h1><Link className="btn" to="/search">Continue shopping</Link></div>;

  if(!user) return <section className="flow-auth-gate">
    <div className="flow-orb orb-one"></div><div className="flow-orb orb-two"></div>
    <div className="flow-glass-card">
      <small>SECURE CHECKOUT</small>
      <h1>Sign in to continue</h1>
      <p>Your cart is saved. Sign in or create your OM Stationary account before checkout.</p>
      <Link className="btn wide" to="/login?return=%2Fcheckout"><User size={17}/> Login & Continue</Link>
      <Link className="outline wide" to="/register?return=%2Fcheckout">Create new account</Link>
    </div>
  </section>;

  const createOrder=async(e)=>{
    e.preventDefault();
    setError('');
    if(!name.trim()||!phone.trim()||!email.trim()){setError('Please complete your customer details.');return}
    setLoading(true);
    try{
      const body={
        customerName:name.trim(),
        customerPhone:phone.trim(),
        customerEmail:email.trim(),
        billingAddress:address.trim(),
        fulfillmentMethod:'Pickup',
        paymentMethod:payment==='Online'?'Online':'COD',
        requestedPickupDate:null,
        quotedTotal:total,
        couponCode:'',
        items:cart.map(i=>({productId:i.id,quantity:i.q})),
        addressLine:address.trim(),
        landmark:'',
        city:'',
        state:state.trim(),
        pincode:pincode.trim(),
        latitude:null,
        longitude:null
      };
      const r=await apiFetch(api+'/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      const data=await r.json();
      if(!r.ok) throw new Error(data.detail||data.title||'Order could not be placed.');

      rememberOrder(data.orderNumber,data.trackingToken);
      setOrder(data);

      if(payment==='Online'){
        let qrValue='';
        try{
          const ir=await apiFetch(api+'/api/payments/orders/'+encodeURIComponent(data.orderNumber)+'/intent',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount:data.totalAmount})});
          const intent=await ir.json().catch(()=>({}));
          if(ir.ok) qrValue=intent.qrPayload||intent.upiUri||intent.qrData||intent.paymentUri||intent.qrCode||'';
        }catch{}
        if(!qrValue){
          qrValue='upi://pay?pa='+encodeURIComponent(upiId)+'&pn='+encodeURIComponent('OM Stationary')+'&am='+encodeURIComponent(Number(data.totalAmount).toFixed(2))+'&cu=INR&tn='+encodeURIComponent(data.orderNumber);
        }
        setQr(qrValue);
      }else{
        setCart([]);
        nav('/invoice/'+data.orderNumber);
      }
    }catch(err){
      setError(err.message||'Could not connect to the order service.');
    }finally{
      setLoading(false);
    }
  };

  const verifyPayment=async()=>{
    if(!order) return;
    setLoading(true);
    setError('');
    try{
      const r=await apiFetch(api+'/api/payments/orders/'+encodeURIComponent(order.orderNumber)+'/status',{method:'POST',headers:{'Content-Type':'application/json'}});
      const d=await r.json().catch(()=>({}));
      if(!r.ok) throw new Error(d.detail||'Payment could not be verified yet.');
      const status=String(d.paymentStatus||d.status||d.state||'').toLowerCase();
      if(status==='paid'||status==='success'||status==='successful'){
        setCart([]);
        nav('/invoice/'+order.orderNumber);
      }else{
        setError('Payment is not confirmed yet. Please complete the UPI payment and try Verify Payment again.');
      }
    }catch(err){
      setError(err.message||'Payment verification is unavailable.');
    }finally{
      setLoading(false);
    }
  };

  if(qr&&order) return <section className="payment-3d-page">
    <div className="payment-glow"></div>
    <div className="payment-glass">
      <div className="payment-head"><span className="payment-icon"><CreditCard/></span><div><small>ONLINE PAYMENT</small><h1>Scan & Pay</h1></div></div>
      <div className="payment-amount">&#8377;{Number(order.totalAmount||total).toLocaleString('en-IN')}</div>
      <div className="qr-shell"><QRCodeSVG value={qr} size={270} includeMargin={true}/></div>
      <p className="payment-upi">UPI: <b>{upiId}</b></p>
      <p className="payment-order">Order: <b>{order.orderNumber}</b></p>
      <div className="payment-warning"><ShieldCheck size={18}/><span>Invoice is generated only after the payment status is verified by the payment service.</span></div>
      {error&&<p className="form-error" role="alert">{error}</p>}
      <button className="btn wide" disabled={loading} onClick={verifyPayment}>{loading?'Verifying…':'I have paid — Verify Payment'}</button>
      <button className="outline wide" onClick={()=>nav('/invoice/'+order.orderNumber)}>View pending order</button>
    </div>
  </section>;

  return <form className="checkout-flow-3d" onSubmit={createOrder}>
    <div className="flow-main-card">
      <div className="flow-title"><small>CHECKOUT</small><h1>Complete your order</h1><p>Your cart is ready. Choose how you want to pay at OM Stationary.</p></div>
      <div className="payment-choice-grid">
        <label className={payment==='Online'?'payment-choice selected':'payment-choice'}><input type="radio" checked={payment==='Online'} onChange={()=>setPayment('Online')}/><CreditCard/><span><b>Online UPI</b><small>Pay exact amount by QR</small></span></label>
        <label className={payment==='Shop'?'payment-choice selected':'payment-choice'}><input type="radio" checked={payment==='Shop'} onChange={()=>setPayment('Shop')}/><Store/><span><b>Pay on Shop</b><small>Pay when you collect</small></span></label>
      </div>

      <div className="customer-details-3d">
        <h3>Customer details</h3>
        <div className="flow-fields">
          <label>Full name<input required value={name} onChange={e=>setName(e.target.value)} autoComplete="name"/></label>
          <label>Mobile number<input required value={phone} onChange={e=>setPhone(e.target.value)} autoComplete="tel"/></label>
          <label>Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/></label>
          <label>Address<input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Pickup/contact address"/></label>
          <label>State<input value={state} onChange={e=>setState(e.target.value)}/></label>
          <label>PIN code<input value={pincode} onChange={e=>setPincode(e.target.value.replace(/\D/g,'').slice(0,6))} maxLength="6"/></label>
        </div>
      </div>

      {error&&<p className="form-error" role="alert">{error}</p>}
      <button className="btn wide" disabled={loading}>{loading?'Processing…':payment==='Online'?'Continue to Online Payment':'Place Pay on Shop Order'}</button>
    </div>

    <aside className="flow-summary-card">
      <Receipt/><h3>Order summary</h3>
      {cart.map(i=><div className="flow-item" key={i.id}><span>{i.name} × {i.q}</span><b>&#8377;{(i.price*i.q).toLocaleString('en-IN')}</b></div>)}
      <hr/>
      <div className="flow-total"><span>Subtotal</span><b>&#8377;{subtotal.toLocaleString('en-IN')}</b></div>
      <div className="flow-total"><span>GST (0%)</span><b>&#8377;0</b></div>
      <div className="flow-grand"><span>Total</span><b>&#8377;{total.toLocaleString('en-IN')}</b></div>
      <small>Tax rate is currently 0% as requested.</small>
    </aside>
  </form>
}
function InvoicePage(){
  const {id}=useParams();
  const [invoice,setInvoice]=useState(null),[error,setError]=useState(''),[loading,setLoading]=useState(true);
  useEffect(()=>{
    let active=true;
    const token=localStorage.getItem('omtrack:'+id)||'';
    apiFetch(api+'/api/orders/'+encodeURIComponent(id)+'/invoice',{headers:{'X-Tracking-Token':token}})
      .then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.detail||'Invoice is not available yet.');return d})
      .then(d=>{if(active)setInvoice(d)})
      .catch(e=>{if(active)setError(e.message)})
      .finally(()=>{if(active)setLoading(false)});
    return()=>{active=false}
  },[id]);
  if(loading)return <div className="catalog-state">Preparing professional invoice…</div>;
  if(error)return <div className="empty"><Receipt/><h1>Invoice</h1><p>{error}</p><Link className="btn" to="/orders">Go to orders</Link></div>;

  const lines=invoice.items||invoice.lines||[];
  const subtotal=Number(invoice.subtotal??invoice.subTotal??0);
  const gst=Number(invoice.taxAmount??invoice.gstAmount??0);
  const total=Number(invoice.grandTotal??invoice.totalAmount??invoice.total??0);

  return <section className="invoice-page">
    <div className="invoice-actions"><Link className="outline" to="/"><ArrowLeft/> Home</Link><button className="btn" onClick={()=>window.print()}>Print / Save PDF</button></div>
    <article className="professional-invoice">
      <header className="invoice-header">
        <div><div className="invoice-logo">OM<span>.</span></div><b>OM STATIONARY</b><small>Everything you need, one place.</small></div>
        <div className="invoice-title"><small>TAX INVOICE</small><h1>{invoice.invoiceNumber||'OM-INV'}</h1><span>{invoice.invoiceDate?new Date(invoice.invoiceDate).toLocaleString('en-IN'):new Date().toLocaleString('en-IN')}</span></div>
      </header>
      <div className="invoice-meta-grid">
        <div><b>OM Stationary</b><p>G5JF+784, Ambedkar Rd, Sohgi, Bihar 800007<br/>Opp. Shravani Enclave, Sampatchak, Patna, Bihar</p><p>GST Rate: 0%</p><p>Udyam Registration: <b>Configure in billing settings</b></p></div>
        <div><b>Bill To</b><p>{invoice.customerName||invoice.name||'-'}<br/>{invoice.customerEmail||invoice.email||'-'}<br/>{invoice.customerPhone||invoice.phone||'-'}</p><p>{invoice.billingAddress||invoice.shippingAddress||''}</p></div>
      </div>
      <table className="invoice-table"><thead><tr><th>S.No.</th><th>Item</th><th>HSN/SKU</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>
        {lines.map((x,i)=>{const q=Number(x.quantity||x.qty||1),rate=Number(x.unitPrice||x.price||0);return <tr key={i}><td>{i+1}</td><td>{x.productName||x.name||'-'}</td><td>{x.sku||x.hsn||'-'}</td><td>{q}</td><td>&#8377;{rate.toFixed(2)}</td><td>&#8377;{(q*rate).toFixed(2)}</td></tr>})}
      </tbody></table>
      <div className="invoice-bottom">
        <div><b>Payment</b><p>Method: {invoice.paymentMethod||'-'}</p><p>Status: {invoice.paymentStatus||'-'}</p><p>GST: 0% (&#8377;{gst.toFixed(2)})</p></div>
        <div className="invoice-totals"><p><span>Subtotal</span><b>&#8377;{subtotal.toFixed(2)}</b></p><p><span>GST (0%)</span><b>&#8377;{gst.toFixed(2)}</b></p><p className="invoice-grand"><span>Grand Total</span><b>&#8377;{total.toFixed(2)}</b></p></div>
      </div>
      <footer>Thank you for shopping with OM Stationary. Keep learning. Keep growing.</footer>
    </article>
  </section>
}
function Track
'@
if ([regex]::IsMatch($main,$checkoutPattern)) {
  $main = [regex]::Replace($main,$checkoutPattern,$checkoutReplacement,1)
} else {
  Write-Warning "Checkout function pattern was not found; checkout was not changed."
}

# Add invoice route.
$routeNeedle = '<Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} user={user}/>}/>'
$routeWithInvoice = $routeNeedle + '<Route path="/invoice/:id" element={<InvoicePage/>}/>'
if ($main.Contains($routeNeedle) -and -not $main.Contains('path="/invoice/:id"')) {
  $main = $main.Replace($routeNeedle,$routeWithInvoice)
}

Write-Utf8NoBom $mainPath $main

# ---------- AccountPages.jsx ----------
$accPath = "$src\AccountPages.jsx"
$acc = [System.IO.File]::ReadAllText($accPath)

if ($acc -notmatch "useLocation") {
  $acc = $acc.Replace(
    "import {Link",
    "import {useLocation,Link"
  )
}

$loginPattern = '(?s)export function LoginPage\(.*?\nexport function AccountPage'
$loginReplacement = @'
export function LoginPage({ onAuth, register = false }) {
  const location = useLocation();
  const returnTo = new URLSearchParams(location.search).get('return') || '/account';
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const [success,setSuccess]=useState(false);

  const submit=async event=>{
    event.preventDefault();
    const formElement=event.currentTarget;
    setBusy(true);setError('');
    const form=new FormData(formElement);
    const body=register
      ? {email:form.get('email'),phone:form.get('phone'),fullName:form.get('name'),password:form.get('password')}
      : {email:form.get('email'),password:form.get('password')};

    try{
      const response=await fetch(`${apiBase}/api/auth/${register?'register':'login'}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(body)
      });
      const data=await response.json();
      if(!response.ok)throw new Error(data.detail||data.title||(register?'Registration failed.':'Sign in failed.'));

      saveSession(data);

      let cart=[];
      try{
        const guest=JSON.parse(localStorage.getItem('omcart')||'[]');
        const merged=await apiFetch('/api/cart/merge',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({items:Array.isArray(guest)?guest.map(item=>({productId:item.id,quantity:item.q})):[]})
        },data.accessToken);
        if(merged.ok){
          const result=await merged.json();
          cart=mapServerCart(result.items);
        }
      }catch{}

      onAuth(data.user,cart);

      if(register){
        formElement.reset();
        setSuccess(true);
        setTimeout(()=>{window.location.href=returnTo||'/';},1300);
      }else{
        window.location.href=returnTo||'/account';
      }
    }catch(e){
      setError(e.message||'Could not connect to the account service.');
    }finally{
      setBusy(false);
    }
  };

  return <section className="auth-3d-page">
    <div className="auth-3d-orb orb-a"></div><div className="auth-3d-orb orb-b"></div>
    <div className="auth-3d-card">
      <div className="auth-brand-3d"><span>OM</span><div><b>OM STATIONARY</b><small>Everything you need, one place.</small></div></div>
      <small className="auth-kicker">{register?'NEW CUSTOMER':'WELCOME BACK'}</small>
      <h1>{register?'Create your account':'Sign in to continue'}</h1>
      <p className="auth-sub">{register?'Join OM Stationary and keep your cart, addresses and orders together.':'Sign in to continue your shopping securely.'}</p>

      <form className="auth-3d-form" onSubmit={submit}>
        {register&&<label>Full name<input name="name" required maxLength="120" autoComplete="name" placeholder="Your full name"/></label>}
        <label>Email address<input name="email" type="email" required maxLength="254" autoComplete="email" placeholder="you@example.com"/></label>
        {register&&<label>Mobile number<input name="phone" type="tel" required maxLength="20" autoComplete="tel" placeholder="Mobile number"/></label>}
        <label>Password<input name="password" type="password" required minLength={register?4:1} maxLength="128" autoComplete={register?'new-password':'current-password'} placeholder="Password"/></label>
        {register&&<label className="auth-check"><input type="checkbox" required/> I agree to the Terms & Conditions</label>}
        {error&&<p className="form-error" role="alert">{error}</p>}
        <button className="btn wide" disabled={busy}>{busy?'Please wait…':register?'Sign Up':'Login'}</button>
      </form>

      <p className="auth-switch">{register?'Already have an account?':'New to OM Stationary?'} <Link to={register?'/login':'/register'}>{register?'Login':'Create account'}</Link></p>
    </div>

    {success&&<div className="success-modal-backdrop">
      <div className="success-modal">
        <div className="success-check"><CheckCircle2 size={48}/></div>
        <small>OM STATIONARY</small>
        <h2>Successfully Registered!</h2>
        <p>Your account has been created successfully.</p>
        <button className="btn wide" onClick={()=>window.location.href=returnTo||'/'}>Go to Shopping</button>
      </div>
    </div>}
  </section>
}
export function AccountPage
'@
if ([regex]::IsMatch($acc,$loginPattern)) {
  $acc = [regex]::Replace($acc,$loginPattern,$loginReplacement,1)
} else {
  Write-Warning "LoginPage pattern was not found; auth UI was not changed."
}
Write-Utf8NoBom $accPath $acc

# ---------- session.js API default ----------
$sessionPath="$src\session.js"
if(Test-Path $sessionPath){
  $session=[System.IO.File]::ReadAllText($sessionPath)
  $session=$session.Replace("import.meta.env.VITE_API_URL || 'https://localhost:7001'","import.meta.env.VITE_API_URL || 'http://localhost:5000'")
  Write-Utf8NoBom $sessionPath $session
}

# ---------- CSS ----------
$cssPath="$src\styles.css"
$css=[System.IO.File]::ReadAllText($cssPath)
$css += @'

/* =========================================================
   OM STATIONARY - CUSTOMER FLOW / 3D PAYMENT EXPERIENCE
   ========================================================= */

.admin-top-button{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:8px 12px;
  border-radius:11px;
  background:linear-gradient(135deg,#ff6b00,#ff8a2b);
  color:#fff!important;
  font-weight:800;
  box-shadow:0 8px 22px rgba(255,107,0,.22);
  white-space:nowrap;
}
.admin-top-button:hover{transform:translateY(-2px);color:#fff!important}

.add-row{display:flex;gap:7px;align-items:center;margin-top:8px}
.qty-mini{display:flex;align-items:center;border:1px solid #dbe5f0;border-radius:9px;overflow:hidden;background:#fff}
.qty-mini button{width:28px;height:34px;border:0;background:#f4f7fb;color:#17304e;font-weight:800;cursor:pointer}
.qty-mini b{width:27px;text-align:center;font-size:12px}
.add-row .add{flex:1;margin-top:0}
.added-preview{display:inline-flex;min-width:18px;height:18px;align-items:center;justify-content:center;border-radius:50%;background:#fff;color:#ff6b00;font-size:11px;font-weight:900}

.auth-3d-page,.flow-auth-gate,.payment-3d-page{
  position:relative;
  min-height:calc(100vh - 180px);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:50px 20px 80px;
  overflow:hidden;
  background:
    radial-gradient(circle at 15% 20%,rgba(24,94,200,.25),transparent 30%),
    radial-gradient(circle at 85% 80%,rgba(124,76,220,.25),transparent 32%),
    linear-gradient(135deg,#061326,#10183a 55%,#081729);
}
.auth-3d-orb,.flow-orb{
  position:absolute;border-radius:50%;filter:blur(2px);pointer-events:none;
  box-shadow:0 0 80px rgba(49,139,255,.35);
}
.orb-a{width:330px;height:330px;background:radial-gradient(circle at 35% 30%,#2368d8,#07152c 70%);left:-100px;top:40px}
.orb-b{width:260px;height:260px;background:radial-gradient(circle at 35% 30%,#8c52e8,#111631 70%);right:-70px;bottom:20px}

.auth-3d-card,.flow-glass-card,.payment-glass{
  position:relative;z-index:2;width:min(480px,100%);padding:34px;
  border:1px solid rgba(255,255,255,.18);border-radius:28px;
  background:linear-gradient(145deg,rgba(255,255,255,.13),rgba(255,255,255,.055));
  box-shadow:0 30px 80px rgba(0,0,0,.42),inset 0 1px 0 rgba(255,255,255,.16);
  backdrop-filter:blur(24px);
  color:#fff;
  transform:perspective(1000px) rotateX(.5deg);
}
.auth-brand-3d{display:flex;align-items:center;gap:10px;margin-bottom:24px}
.auth-brand-3d>span{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:#0d4d92;color:#fff;font-weight:950;box-shadow:0 10px 25px rgba(18,103,197,.35)}
.auth-brand-3d b{display:block;font-size:14px;letter-spacing:.05em}
.auth-brand-3d small{display:block;color:#a9bdd6;font-size:9px}
.auth-kicker{color:#ff7b1a;font-weight:900;letter-spacing:.18em}
.auth-3d-card h1{font-size:34px;line-height:1.05;margin:8px 0 10px;color:#fff}
.auth-sub{color:#b8c9dd;margin-bottom:24px}
.auth-3d-form label{display:block;color:#dbe7f4;font-size:12px;font-weight:800;margin-bottom:12px}
.auth-3d-form input:not([type="checkbox"]){display:block;width:100%;box-sizing:border-box;margin-top:6px;padding:13px 14px;border:1px solid rgba(255,255,255,.14);border-radius:12px;background:rgba(255,255,255,.94);color:#142640;outline:0}
.auth-3d-form input:focus{box-shadow:0 0 0 3px rgba(50,145,255,.25)}
.auth-check{display:flex!important;align-items:center;gap:8px}
.auth-check input{width:auto!important;margin:0!important}
.auth-switch{margin-top:18px;text-align:center;color:#afc0d5}
.auth-switch a{color:#ff8a32;font-weight:900}

.success-modal-backdrop{
  position:fixed;inset:0;z-index:9999;display:grid;place-items:center;
  background:rgba(2,8,20,.72);backdrop-filter:blur(10px);
}
.success-modal{
  width:min(420px,calc(100% - 30px));padding:36px;border-radius:28px;
  text-align:center;background:#fff;color:#13223a;
  box-shadow:0 35px 100px rgba(0,0,0,.5);animation:successPop .35s ease-out;
}
.success-check{width:78px;height:78px;margin:0 auto 18px;border-radius:50%;display:grid;place-items:center;background:#e8f8ef;color:#1b9b57}
.success-modal small{font-weight:900;letter-spacing:.15em;color:#ff6b00}
.success-modal h2{font-size:28px;margin:8px 0}
.success-modal p{color:#607087}
@keyframes successPop{from{opacity:0;transform:translateY(15px) scale(.94)}to{opacity:1;transform:none}}

.checkout-flow-3d{
  width:min(1160px,calc(100% - 32px));margin:42px auto 80px;
  display:grid;grid-template-columns:minmax(0,1.45fr) minmax(300px,.65fr);gap:20px;
}
.flow-main-card,.flow-summary-card{
  border-radius:24px;padding:28px;background:#fff;
  box-shadow:0 20px 55px rgba(15,41,75,.12);border:1px solid #e5edf6;
}
.flow-main-card{background:linear-gradient(145deg,#08162c,#102b4d);color:#fff}
.flow-title small{color:#ff7b1a;font-weight:900;letter-spacing:.16em}
.flow-title h1{font-size:34px;margin:8px 0}
.flow-title p{color:#b9cbe0}
.payment-choice-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:24px 0}
.payment-choice{display:flex;align-items:center;gap:12px;padding:16px;border:1px solid rgba(255,255,255,.15);border-radius:16px;background:rgba(255,255,255,.06);cursor:pointer}
.payment-choice.selected{border-color:#ff791d;box-shadow:0 0 0 2px rgba(255,121,29,.18);background:rgba(255,121,29,.1)}
.payment-choice input{accent-color:#ff7414}
.payment-choice svg{color:#54a8ff}
.payment-choice span{display:flex;flex-direction:column;gap:3px}
.payment-choice small{color:#aebfd3}
.customer-details-3d{margin-top:22px;padding-top:22px;border-top:1px solid rgba(255,255,255,.1)}
.flow-fields{display:grid;grid-template-columns:1fr 1fr;gap:13px}
.flow-fields label{font-size:12px;font-weight:800;color:#d9e6f5}
.flow-fields label:nth-child(4){grid-column:1/-1}
.flow-fields input{width:100%;box-sizing:border-box;margin-top:6px;padding:12px;border-radius:11px;border:1px solid #d9e5f0}
.flow-summary-card svg{color:#1764c0}
.flow-summary-card h3{margin:8px 0 18px}
.flow-item,.flow-total,.flow-grand{display:flex;justify-content:space-between;gap:12px;margin:11px 0;font-size:13px}
.flow-grand{font-size:19px;padding-top:12px;border-top:2px solid #e8eef5}
.flow-summary-card small{color:#708096}
.payment-glass{width:min(520px,100%);text-align:center}
.payment-head{display:flex;align-items:center;gap:14px;text-align:left}
.payment-icon{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:#0d5bb0}
.payment-head h1{margin:4px 0;font-size:30px}
.payment-amount{font-size:38px;font-weight:950;margin:20px 0}
.qr-shell{display:grid;place-items:center;padding:18px;background:#fff;border-radius:20px;width:max-content;margin:0 auto;box-shadow:0 18px 50px rgba(0,0,0,.3)}
.payment-upi,.payment-order{color:#c0d0e3}
.payment-warning{display:flex;gap:9px;text-align:left;padding:12px;border-radius:12px;background:rgba(255,178,60,.1);color:#f4d7a5;margin:16px 0}
.payment-warning svg{flex:none;color:#ffb23c}

.invoice-page{width:min(1050px,calc(100% - 28px));margin:35px auto 70px}
.invoice-actions{display:flex;justify-content:space-between;gap:10px;margin-bottom:16px}
.professional-invoice{background:#fff;border:1px solid #dce6f0;box-shadow:0 20px 60px rgba(17,40,68,.12);padding:35px;color:#182b43}
.invoice-header{display:flex;justify-content:space-between;gap:20px;padding-bottom:22px;border-bottom:2px solid #163f76}
.invoice-logo{font-size:32px;font-weight:950;color:#0e4e92}.invoice-logo span{color:#ff7414}
.invoice-header b,.invoice-header small{display:block}
.invoice-header small{color:#69788b}
.invoice-title{text-align:right}.invoice-title h1{margin:5px 0;font-size:24px}
.invoice-meta-grid{display:grid;grid-template-columns:1fr 1fr;gap:25px;padding:24px 0}
.invoice-meta-grid p{font-size:12px;line-height:1.6;color:#596a7f}
.invoice-table{width:100%;border-collapse:collapse;font-size:12px}
.invoice-table th,.invoice-table td{border:1px solid #d9e2eb;padding:9px;text-align:left}
.invoice-table th{background:#edf3f9}
.invoice-bottom{display:flex;justify-content:space-between;gap:30px;margin-top:25px}
.invoice-totals{min-width:280px}
.invoice-totals p{display:flex;justify-content:space-between}
.invoice-grand{font-size:18px;border-top:2px solid #183f72;padding-top:10px}
.professional-invoice footer{margin-top:28px;padding-top:15px;border-top:1px solid #dce5ee;text-align:center;color:#718096;font-size:11px}

@media(max-width:850px){
  .checkout-flow-3d{grid-template-columns:1fr}
  .payment-choice-grid,.flow-fields{grid-template-columns:1fr}
  .flow-fields label:nth-child(4){grid-column:auto}
}
@media(max-width:650px){
  .auth-3d-card,.flow-glass-card,.payment-glass{padding:23px}
  .auth-3d-card h1{font-size:29px}
  .checkout-flow-3d{width:min(100% - 20px,600px);margin-top:22px}
  .invoice-header,.invoice-bottom,.invoice-meta-grid{grid-template-columns:1fr;display:grid}
  .invoice-title{text-align:left}
  .invoice-page{width:calc(100% - 16px)}
  .professional-invoice{padding:18px}
  .invoice-table{font-size:10px}
  .invoice-table th,.invoice-table td{padding:6px}
  .admin-top-button{padding:7px 9px;font-size:11px}
}
@media print{
  header,.site-footer,.invoice-actions{display:none!important}
  .invoice-page{width:100%;margin:0}
  .professional-invoice{box-shadow:none;border:0}
}
'@
Write-Utf8NoBom $cssPath $css

# ---------- build ----------
Set-Location $front
npm run build

Write-Host ""
Write-Host "====================================================" -ForegroundColor Green
Write-Host "OM STATIONARY CUSTOMER FLOW UPGRADE APPLIED" -ForegroundColor Green
Write-Host "====================================================" -ForegroundColor Green
Write-Host "Backup timestamp: $stamp"
Write-Host ""
Write-Host "Flow:"
Write-Host "Home -> Admin button"
Write-Host "Home -> Product -> quantity -> Add"
Write-Host "Cart -> Checkout -> Login/Register if needed"
Write-Host "Register -> 3D success popup -> return to checkout"
Write-Host "Checkout -> Online UPI QR OR Pay on Shop"
Write-Host "Online -> exact amount QR -> backend payment verification -> Invoice"
Write-Host "Pay on Shop -> Invoice"
Write-Host "Invoice -> GST 0% -> Print/Save PDF"
Write-Host ""
Write-Host "IMPORTANT: The invoice shows a placeholder for Udyam Registration until the real number is configured." -ForegroundColor Yellow
Write-Host "IMPORTANT: Automatic online-payment confirmation requires a real payment gateway/webhook configuration; the QR itself is not treated as proof of payment." -ForegroundColor Yellow
Write-Host ""
Write-Host "If build succeeded, run: npm run dev"
