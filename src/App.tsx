import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation, 
  useNavigate 
} from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Menu, 
  X, 
  MessageCircle, 
  Camera, 
  Phone, 
  ChevronRight,
  Star,
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_PRODUCTS, CATEGORIES } from './constants/products';
import { aiService, Product } from './services/aiService';

// --- Contexts ---

const CartContext = createContext<any>(null);
const useCart = () => useContext(CartContext);

// --- Components ---

import { VisualSearchModal, SmartAssistant } from './components/AIComponents';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  return (
    <>
      <div className="banner-top">
        <span>Free Shipping on orders over ₦100,000 across Nigeria</span>
        <div className="hidden sm:flex gap-4">
          <span>Support: +234 704 942 4476</span>
          <span>WhatsApp Support</span>
        </div>
      </div>
      <nav className="sticky top-0 z-50 bg-white px-6 sm:px-10 py-5 flex items-center justify-between border-b border-brand-primary/10 shadow-sm backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white transform rotate-45 group-hover:rotate-0 transition-transform"></div>
          </div>
          <span className="text-2xl font-bold tracking-tight text-stone-900 font-serif">
            Maple Leaf <span className="text-brand-primary">Ventures</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-wider text-stone-500">
          <Link to="/" className={`pb-1 border-b-2 transition-colors ${location.pathname === '/' ? 'text-brand-primary border-brand-primary' : 'border-transparent hover:text-brand-primary'}`}>Home</Link>
          <Link to="/shop" className={`pb-1 border-b-2 transition-colors ${location.pathname === '/shop' ? 'text-brand-primary border-brand-primary' : 'border-transparent hover:text-brand-primary'}`}>Shop</Link>
          <Link to="/about" className={`pb-1 border-b-2 transition-colors ${location.pathname === '/about' ? 'text-brand-primary border-brand-primary' : 'border-transparent hover:text-brand-primary'}`}>About Us</Link>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <div className="hidden lg:relative lg:flex items-center bg-brand-bg rounded-full px-4 py-2 border border-stone-200">
            <Search className="text-stone-400 mr-2" size={16} />
            <input type="text" placeholder="Search kitchenware..." className="bg-transparent border-none text-sm outline-none w-40" />
          </div>
          <button 
            onClick={() => setIsVisualSearchOpen(true)}
            className="p-2 text-stone-600 hover:text-brand-primary transition-colors flex items-center gap-1.5"
          >
            <Camera size={20} />
          </button>
          <Link to="/cart" className="p-2 text-stone-600 hover:text-brand-primary transition-colors relative">
            <ShoppingBag size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cart.length}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2 text-stone-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <VisualSearchModal isOpen={isVisualSearchOpen} onClose={() => setIsVisualSearchOpen(false)} />
      </nav>
    </>
  );
}

function WhatsAppButton() {
  return (
    <a 
      href="https://wa.me/2347049424476" 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center gap-2 group"
    >
      <MessageCircle size={24} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-medium whitespace-nowrap">
        Chat with Us
      </span>
    </a>
  );
}

// --- Pages ---

function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col justify-center gap-6"
            >
              <div className="inline-block self-start px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full text-xs font-bold uppercase tracking-widest">
                Premium Nigerian Kitchenware
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-stone-900 leading-[0.95] mb-2">
                Elevate Your <br />
                <span className="text-brand-primary">Kitchen</span> Experience.
              </h1>
              <p className="text-lg text-stone-600 max-w-md leading-relaxed">
                Quality cookware designed for the modern Nigerian home. Durable, elegant, and built to last generations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link to="/shop" className="btn-primary flex items-center justify-center gap-2">
                  Shop Collection
                </Link>
                <button className="btn-outline flex items-center justify-center gap-2">
                  View Catalog
                </button>
              </div>
              
              <div className="mt-8 flex items-center gap-8 border-t border-stone-200 pt-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">15k+</span>
                  <span className="text-xs text-stone-500 uppercase font-bold tracking-widest">Happy Chefs</span>
                </div>
                <div className="w-px h-10 bg-stone-200"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">4.9/5</span>
                  <span className="text-xs text-stone-500 uppercase font-bold tracking-widest">Trust Score</span>
                </div>
                <div className="w-px h-10 bg-stone-200"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-serif italic text-brand-primary">USSD</span>
                  <span className="text-xs text-stone-500 uppercase font-bold tracking-widest">Easy Payments</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl"></div>
              <div className="grid grid-cols-2 gap-6 relative z-10 w-full h-full p-4">
                <div className="vibrant-card-red translate-y-6 flex flex-col justify-end p-6">
                  <div className="w-full aspect-square bg-stone-100 rounded-[24px] mb-4 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1594385208974-2e75f9d8ad48?auto=format&fit=crop&q=80&w=600" alt="Pot" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xl font-serif font-bold mb-1">Heritage Pot Set</span>
                  <span className="text-brand-primary font-bold">₦85,000</span>
                </div>
                <div className="vibrant-card-green -translate-y-6 flex flex-col p-6">
                  <div className="w-full aspect-square bg-stone-200 rounded-[24px] mb-4 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&q=80&w=600" alt="Dining" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xl font-serif font-bold mb-1">Golden Cutlery</span>
                  <span className="text-brand-primary font-bold">₦24,500</span>
                  <button className="mt-4 w-full bg-stone-900 text-white text-[10px] py-2 rounded-full uppercase font-bold tracking-widest hover:bg-brand-primary transition-colors">Add to Cart</button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Our Essentials</h2>
            <p className="text-stone-600">Hand-picked for the modern Nigerian household.</p>
          </div>
          <Link to="/shop" className="text-brand-primary font-bold flex items-center gap-2 hover:underline">
            View All <ChevronRight size={20} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_PRODUCTS.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI Features Highlight */}
      <section className="bg-stone-900 py-24 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-brand-primary font-bold text-sm tracking-widest uppercase mb-4 block">Powered by Gemini AI</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Can't find it?<br /> <span className="opacity-50">Just take a photo.</span></h2>
              <ul className="space-y-6">
                {[
                  { title: "Visual Product Search", desc: "Upload a photo of any kitchenware and we'll find the match." },
                  { title: "Smart Chat Assistant", desc: "Get advice on pot sizes for your family size or soup type." },
                  { title: "Semantic Search", desc: "Search with goals like 'best pot for large scale rice'." }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Star className="text-brand-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
               <div className="aspect-[4/5] bg-stone-800 rounded-3xl border border-white/10 p-8 flex flex-col justify-end relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800" alt="AI Feature" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="glass-pill px-4 py-2 text-xs inline-flex items-center gap-2">
                      <Camera size={14} /> AI Analysis Running...
                    </div>
                    <p className="text-lg italic text-white/90">"Matched: Maple Pro Skillet (98% Confidence)"</p>
                    <button className="w-full btn-primary">Try Visual Search</button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { cart, setCart } = useCart();
  
  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCart([...cart, product]);
  };

  const isEven = parseInt(product.id.replace(/\D/g, '') || '0') % 2 === 0;

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={`group overflow-hidden transition-all ${isEven ? 'vibrant-card-red' : 'vibrant-card-green'}`}
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden p-6">
        <div className="w-full h-full rounded-[24px] overflow-hidden bg-stone-100">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-stone-900 border border-black/5 uppercase tracking-widest whitespace-nowrap">
          {product.category}
        </div>
      </Link>
      <div className="px-8 pb-8 pt-0">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="text-xl font-serif text-stone-900 group-hover:text-brand-primary transition-colors">{product.name}</Link>
          <div className="flex items-center gap-1 text-sm font-bold text-stone-900">
            <Star size={14} className="fill-brand-primary text-brand-primary" /> {product.rating}
          </div>
        </div>
        <p className="text-stone-500 text-sm mb-6 line-clamp-2 h-10">{product.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-brand-primary">
            ₦{product.price.toLocaleString()}
          </div>
          <button 
            onClick={addToCart} 
            className="bg-stone-900 text-white text-[10px] px-4 py-2 rounded-full uppercase font-bold tracking-widest hover:bg-brand-primary transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Shop() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      setProducts(INITIAL_PRODUCTS);
      return;
    }
    setIsSearching(true);
    const results = await aiService.semanticSearch(query, INITIAL_PRODUCTS);
    setProducts(results);
    setIsSearching(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif mb-4">Our Catalogue</h1>
        <p className="text-stone-600 mb-8">Professional tools for the Nigerian chef.</p>
        
        <form onSubmit={handleSearch} className="relative group">
          <input 
            type="text" 
            placeholder="Search by goal (e.g., 'frying dodo', 'wedding gift')"
            className="w-full bg-white border-2 border-stone-200 rounded-full py-4 px-14 focus:outline-none focus:border-brand-primary transition-all shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-brand-primary" size={20} />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-primary text-white p-2 rounded-full hover:brightness-110 active:scale-95 transition-all">
            <Search size={18} />
          </button>
        </form>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-4 no-scrollbar">
        {['All', ...CATEGORIES].map(cat => (
          <button key={cat} className={`px-6 py-2 rounded-full border border-stone-200 whitespace-nowrap text-sm font-medium transition-all ${cat === 'All' ? 'bg-brand-primary text-white border-brand-primary' : 'hover:border-brand-primary hover:text-brand-primary bg-white'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isSearching ? 'opacity-50' : 'opacity-100'}`}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-stone-500 italic">No products matched your search. Try something else!</p>
        </div>
      )}
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl font-serif leading-tight">Our Story: From <span className="text-brand-primary">Lagos to Linux</span></h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            Maple Leaf Ventures Limited began with a simple observation: Nigerian home cooks deserve professional-grade tools that respect our culinary traditions.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed">
            Whether it's the high-heat retention needed for the perfect party rice or the durability required for daily soup making, our products are engineered to excel in the vibrant, high-demand kitchens of Nigeria.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-8">
             <div>
               <div className="text-3xl font-serif font-bold text-brand-primary">2018</div>
               <div className="text-sm text-stone-500 font-bold uppercase tracking-widest">Founded</div>
             </div>
             <div>
               <div className="text-3xl font-serif font-bold text-brand-primary">50+</div>
               <div className="text-sm text-stone-500 font-bold uppercase tracking-widest">Products</div>
             </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1556910110-ad52744a79a2?auto=format&fit=crop&q=80&w=1200" alt="Kitchen Team" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-xl max-w-xs border border-stone-100">
            <p className="font-serif italic text-stone-800">"We don't just sell pots; we provide the foundation for family memories."</p>
            <div className="mt-4 flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-brand-primary"></div>
               <div>
                 <div className="text-sm font-bold">Amaka Okafor</div>
                 <div className="text-xs text-stone-500 uppercase">Founder</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function CartPage() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((acc: number, item: any) => acc + item.price, 0);

  const removeItem = (id: string) => {
    setCart(cart.filter((i: any) => i.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <h1 className="text-4xl font-serif mb-12">Your Kitchenware Bag</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-100 shadow-sm">
          <ShoppingBag size={64} className="mx-auto text-stone-200 mb-6" />
          <p className="text-xl text-stone-500 mb-8">Your bag is empty. Time to start cooking!</p>
          <Link to="/shop" className="btn-primary">Browse Shop</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item: any) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex gap-6 items-center">
                <div className="w-24 h-24 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-serif font-bold text-lg">{item.name}</h3>
                  <p className="text-stone-500 text-sm">{item.category}</p>
                  <div className="mt-2 font-bold">₦{item.price.toLocaleString()}</div>
                </div>
                <button onClick={() => removeItem(item.id)} className="p-2 text-stone-400 hover:text-red-500 transition-colors">
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-lg">
              <h3 className="font-serif font-bold text-xl mb-6">Order Summary</h3>
              
              {/* Shipping Progress Bar */}
              <div className="mb-8 p-4 bg-brand-accent/5 rounded-2xl border border-brand-accent/10">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="text-brand-accent">Free Shipping Progress</span>
                  <span className="text-stone-500">{Math.min(100, (total / 100000) * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${Math.min(100, (total / 100000) * 100)}%` }}
                     className="h-full bg-brand-accent"
                   />
                </div>
                <p className="mt-3 text-[10px] text-stone-500 font-medium">
                  {total >= 100000 
                    ? "Congratulations! You've unlocked FREE Shipping in Lagos." 
                    : `Add ₦${(100000 - total).toLocaleString()} more for FREE Lagos shipping.`}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping (Lagos)</span>
                  <span className="text-brand-accent font-bold">FREE</span>
                </div>
                <div className="pt-4 border-t border-stone-100 flex justify-between font-bold text-xl text-stone-900">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                 <button className="w-full btn-primary !py-4">Proceed to Checkout</button>
                 <div className="text-center">
                   <span className="text-xs text-stone-400 uppercase tracking-widest font-bold">OR</span>
                 </div>
                 <a 
                   href={`https://wa.me/2347049424476?text=Hello, I want to order: ${cart.map((i: any) => i.name).join(', ')}`} 
                   target="_blank" 
                   rel="noreferrer"
                   className="w-full btn-outline !py-4 flex items-center justify-center gap-2"
                 >
                   <MessageCircle size={20} /> Checkout on WhatsApp
                 </a>
              </div>
              
              <div className="mt-8 pt-8 border-t border-stone-100 space-y-4">
                 <div className="flex items-center gap-3 text-xs text-stone-500">
                   <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">₦</div>
                   Pay with Bank Transfer or USSD available
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductDetail() {
  const { id } = useLocation().pathname.split('/').slice(-1) as any;
  const product = INITIAL_PRODUCTS.find(p => p.id === id) || INITIAL_PRODUCTS[0];
  const [summary, setSummary] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const { cart, setCart } = useCart();

  const addToCart = () => {
    setCart([...cart, product]);
  };

  useEffect(() => {
    const getSummary = async () => {
      setLoadingAI(true);
      const s = await aiService.summarizeReviews([
        { rating: 5, comment: "Amazing for party rice! Heat is so even." },
        { rating: 4, comment: "Best skillet I've owned in Lagos. Doesn't warp." },
        { rating: 5, comment: "Price is high but quality is unmatched." }
      ]);
      setSummary(s as any);
      setLoadingAI(false);
    };
    getSummary();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-100">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square bg-stone-100 rounded-xl overflow-hidden cursor-pointer hover:border-2 border-brand-primary transition-all">
                 <img src={product.imageUrl} alt="Thumbnail" className="w-full h-full object-cover opacity-60 hover:opacity-100" />
               </div>
             ))}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-brand-primary font-bold text-xs uppercase tracking-widest">{product.category}</span>
              <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
              <div className="flex items-center gap-1 text-sm font-bold">
                <Star size={14} className="fill-brand-primary text-brand-primary" /> {product.rating} ({product.reviewCount} reviews)
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">{product.name}</h1>
            <p className="text-stone-600 leading-relaxed mb-8">{product.description}</p>
            <div className="text-3xl font-bold text-stone-900">₦{product.price.toLocaleString()}</div>
          </div>

          <div className="p-6 bg-brand-primary/5 rounded-2xl border border-brand-primary/10">
            <div className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-3 flex items-center gap-2">
              <Star size={14} /> AI Review Summary
            </div>
            {loadingAI ? (
               <div className="animate-pulse space-y-2">
                 <div className="h-4 bg-brand-primary/10 rounded w-full"></div>
                 <div className="h-4 bg-brand-primary/10 rounded w-5/6"></div>
               </div>
            ) : (
              <p className="text-sm italic text-stone-700 leading-relaxed">"{summary}"</p>
            )}
          </div>

          <div className="space-y-4">
            <button onClick={addToCart} className="w-full btn-primary !py-4 text-lg">Add to Cart</button>
            <div className="flex gap-4">
               <a 
                 href={`https://wa.me/2347049424476?text=Hello, I'm interested in the ${product.name}`} 
                 target="_blank" 
                 rel="noreferrer"
                 className="flex-1 btn-outline flex items-center justify-center gap-2 text-sm"
               >
                 <MessageCircle size={18} /> WhatsApp Buy
               </a>
               <button className="flex-1 border-2 border-stone-200 text-stone-600 px-6 py-3 rounded-full font-medium hover:bg-stone-50 transition-all text-sm">
                 Save to Wishlist
               </button>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-200 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Delivery</h4>
              <p className="text-sm text-stone-700">Lagos: 1-2 days<br />Rest of Nigeria: 3-5 days</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Payments</h4>
              <p className="text-sm text-stone-700">Bank Transfer, Cards, USSD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-stone-100 flex flex-col">
      {/* Value Propositions Bar */}
      <div className="border-b border-stone-100 px-6 sm:px-10 py-10 flex flex-wrap items-center justify-between gap-8">
        <div className="flex flex-wrap gap-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-bg rounded-full flex items-center justify-center text-xl shadow-inner">🚚</div>
            <div>
              <div className="text-sm font-bold leading-tight">Nationwide <br />Delivery</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-bg rounded-full flex items-center justify-center text-xl shadow-inner">💳</div>
            <div>
              <div className="text-sm font-bold leading-tight">USSD & Mobile <br />Transfer</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-bg rounded-full flex items-center justify-center text-xl shadow-inner">✅</div>
            <div>
              <div className="text-sm font-bold leading-tight">Genuine <br />Products</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-stone-500 font-medium hidden lg:inline">Need help? Chat with us:</span>
          <a href="https://wa.me/2347049424476" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-2 rounded-full font-bold text-sm cursor-pointer shadow-lg hover:brightness-110 active:scale-95 transition-all">
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white font-serif font-bold">M</div>
              <span className="font-serif text-2xl font-bold">Maple Leaf <span className="text-brand-primary">Ventures</span></span>
            </Link>
            <p className="text-stone-500 max-w-sm leading-relaxed mb-4">
              Nigerian heritage kitchenware designed for professional results and home comfort. Quality that lasts a generation.
            </p>
            <p className="text-stone-400 text-xs mb-8">
              Life Camp, Abuja, Postal Code: 900108
            </p>
            <div className="flex gap-4">
              <a href="tel:+2347049424476" className="p-3 bg-stone-100 rounded-full hover:bg-brand-primary hover:text-white transition-colors"><Phone size={20} /></a>
              <a href="https://wa.me/2347049424476" className="p-3 bg-stone-100 rounded-full hover:bg-brand-primary hover:text-white transition-colors"><MessageCircle size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif font-bold mb-6 uppercase text-xs tracking-widest text-stone-400">Shop</h4>
            <ul className="space-y-4 text-sm text-stone-600 font-medium">
              <li><Link to="/shop" className="hover:text-brand-primary transition-colors">All Products</Link></li>
              <li><Link to="/shop" className="hover:text-brand-primary transition-colors">Cookware</Link></li>
              <li><Link to="/shop" className="hover:text-brand-primary transition-colors">Appliances</Link></li>
              <li><Link to="/shop" className="hover:text-brand-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold mb-6 uppercase text-xs tracking-widest text-stone-400">Company</h4>
            <ul className="space-y-4 text-sm text-stone-600 font-medium">
              <li><a href="#" className="hover:text-brand-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-stone-400 font-medium font-serif">© 2026 Maple Leaf Ventures Limited. All rights reserved.</p>
          <div className="flex gap-4 text-xs font-bold text-stone-300 uppercase tracking-widest">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- App ---

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <CartContext.Provider value={{ cart, setCart }}>
        <div className="min-h-screen bg-brand-bg flex flex-col">
          <Navbar />
          
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />
          <WhatsAppButton />
          <SmartAssistant />
        </div>
      </CartContext.Provider>
    </Router>
  );
}
