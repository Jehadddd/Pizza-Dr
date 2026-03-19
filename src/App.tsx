/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  Menu as MenuIcon, 
  X, 
  Utensils, 
  Truck, 
  DollarSign, 
  ShieldCheck, 
  Pizza,
  ArrowRight,
  MessageCircle,
  Minus,
  Plus
} from 'lucide-react';
import { MENU_ITEMS, REVIEWS, CRUST_OPTIONS, SAUCE_OPTIONS, TOPPING_OPTIONS } from './constants';
import { MenuItem, CustomizationOption, CartItem } from './types';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [scrolled, setScrolled] = useState(false);

  // Customization State
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [itemToCustomize, setItemToCustomize] = useState<MenuItem | null>(null);
  const [selectedCrust, setSelectedCrust] = useState<CustomizationOption>(CRUST_OPTIONS[0]);
  const [selectedSauce, setSelectedSauce] = useState<CustomizationOption>(SAUCE_OPTIONS[0]);
  const [selectedToppings, setSelectedToppings] = useState<CustomizationOption[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrderClick = (item: MenuItem) => {
    if (item.category === 'classic' || item.category === 'premium') {
      setItemToCustomize(item);
      setSelectedCrust(CRUST_OPTIONS[0]);
      setSelectedSauce(SAUCE_OPTIONS[0]);
      setSelectedToppings([]);
      setQuantity(1);
      setIsCustomizing(true);
    } else {
      addItemToCart(item, undefined, 1);
    }
  };

  const addItemToCart = (item: MenuItem, customizations?: CartItem['customizations'], qty: number = quantity) => {
    const basePrice = item.price + (customizations ? 
      customizations.crust.price + 
      customizations.sauce.price + 
      customizations.toppings.reduce((sum, t) => sum + t.price, 0) : 0);

    const totalPrice = basePrice * qty;

    const newCartItem: CartItem = {
      ...item,
      cartId: Math.random().toString(36).substr(2, 9),
      quantity: qty,
      customizations,
      totalPrice: Number(totalPrice.toFixed(2))
    };

    setCart(prev => [...prev, newCartItem]);
    setIsCustomizing(false);
    
    // Optional: Show a success toast or feedback
  };

  const toggleTopping = (topping: CustomizationOption) => {
    setSelectedToppings(prev => 
      prev.find(t => t.id === topping.id)
        ? prev.filter(t => t.id !== topping.id)
        : [...prev, topping]
    );
  };

  const cartCount = cart.length;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#FFD166] selection:text-[#E63946]">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#E63946] p-1.5 rounded-lg">
              <Pizza className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-[#E63946]">PIZZA DR.</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm uppercase tracking-wider">
            <a href="#menu" className="hover:text-[#E63946] transition-colors">Menu</a>
            <a href="#why-us" className="hover:text-[#E63946] transition-colors">Why Us</a>
            <a href="#how-it-works" className="hover:text-[#E63946] transition-colors">How it works</a>
            <a href="#location" className="hover:text-[#E63946] transition-colors">Location</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#FFD166] text-[#E63946] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <a href="#menu" className="hidden md:block bg-[#E63946] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#d62e3b] transition-all shadow-lg shadow-red-200 active:scale-95">
              ORDER NOW
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black tracking-tighter text-[#E63946]">PIZZA DR.</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-3xl font-black tracking-tight">
              <a href="#menu" onClick={() => setIsMenuOpen(false)}>MENU</a>
              <a href="#why-us" onClick={() => setIsMenuOpen(false)}>WHY US</a>
              <a href="#how-it-works" onClick={() => setIsMenuOpen(false)}>HOW IT WORKS</a>
              <a href="#location" onClick={() => setIsMenuOpen(false)}>LOCATION</a>
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <button className="w-full bg-[#E63946] text-white py-4 rounded-2xl font-bold text-xl shadow-xl shadow-red-100">
                ORDER NOW
              </button>
              <button className="w-full border-2 border-slate-200 py-4 rounded-2xl font-bold text-xl flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" /> CALL US
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#E63946] px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              <Clock className="w-4 h-4" />
              DELIVERED IN 30 MINS OR LESS
            </div>
            <h1 className="text-5xl sm:text-7xl font-black leading-[0.9] tracking-tighter mb-6">
              CURE YOUR <br />
              <span className="text-[#E63946]">CRAVINGS</span> <br />
              INSTANTLY 🍕
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0">
              The doctor is in! Fresh ingredients, irresistible taste, and the fastest delivery in town. Your hunger doesn't stand a chance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#menu" className="w-full sm:w-auto bg-[#E63946] text-white px-10 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-red-200 hover:scale-105 transition-transform active:scale-95 flex items-center justify-center">
                ORDER NOW
              </a>
              <a href="#menu" className="w-full sm:w-auto bg-[#FFD166] text-[#E63946] px-10 py-5 rounded-2xl font-black text-xl hover:bg-[#ffc847] transition-colors active:scale-95 flex items-center justify-center">
                VIEW MENU
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative z-10">
              <img 
                src="https://picsum.photos/seed/hero-pizza/800/800" 
                alt="Delicious Pizza" 
                className="w-full h-auto rounded-full shadow-2xl border-[12px] border-white"
                referrerPolicy="no-referrer"
              />
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-[#FFD166] p-6 rounded-full shadow-xl border-4 border-white"
              >
                <span className="block text-2xl font-black text-[#E63946] leading-none">20%</span>
                <span className="block text-xs font-bold text-[#E63946]">OFF TODAY</span>
              </motion.div>
            </div>
            {/* Decorative blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-50 rounded-full -z-10 blur-3xl opacity-50"></div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-slate-50 py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black tracking-tight mb-2">LOVED BY 10,000+ CUSTOMERS</h2>
              <div className="flex items-center justify-center md:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFD166] text-[#FFD166]" />
                ))}
                <span className="ml-2 font-bold text-slate-600">4.9/5 Average Rating</span>
              </div>
            </div>
            <div className="flex -space-x-4">
              {REVIEWS.map((review) => (
                <img 
                  key={review.id}
                  src={review.avatar} 
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
                  referrerPolicy="no-referrer"
                />
              ))}
              <div className="w-12 h-12 rounded-full bg-[#E63946] border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">
                +9k
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFD166] text-[#FFD166]" />
                  ))}
                </div>
                <p className="text-slate-600 italic mb-4">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={review.avatar} alt={review.name} className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                  <span className="font-bold text-sm">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section id="menu" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4">OUR BEST SELLERS</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">The prescriptions our patients keep coming back for. Hand-crafted, oven-fired, and loaded with flavor.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MENU_ITEMS.filter(item => item.popular).map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-100 border border-slate-100 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {item.popular && (
                    <div className="absolute top-4 left-4 bg-[#FFD166] text-[#E63946] px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                      Most Popular
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black leading-tight">{item.name}</h3>
                    <span className="text-2xl font-black text-[#E63946]">${item.price}</span>
                  </div>
                  <p className="text-slate-500 mb-8 flex-1">{item.description}</p>
                  <button 
                    onClick={() => handleOrderClick(item)}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#E63946] transition-colors active:scale-95"
                  >
                    <ShoppingBag className="w-5 h-5" /> ORDER NOW
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className="inline-flex items-center gap-2 text-xl font-black text-[#E63946] hover:gap-4 transition-all">
              VIEW FULL MENU <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="bg-[#E63946] py-24 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4">WHY PIZZA DR.?</h2>
            <p className="text-red-100 max-w-2xl mx-auto">We don't just make pizza, we perform miracles. Here's why we're the best in the business.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Utensils, title: "Fresh Ingredients", desc: "Farm-to-table veggies and premium meats." },
              { icon: Truck, title: "Fast Delivery", desc: "Under 30 minutes or it's on us." },
              { icon: DollarSign, title: "Affordable Prices", desc: "Gourmet taste without the hospital bill." },
              { icon: ShieldCheck, title: "Hygienic Prep", desc: "Sterile kitchen, passionate chefs." }
            ].map((prop, i) => (
              <div key={i} className="text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <prop.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black mb-3">{prop.title}</h3>
                <p className="text-red-100">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4">HOW IT WORKS</h2>
            <p className="text-slate-500">Simple as 1, 2, 3. No appointment necessary.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 -translate-y-1/2"></div>
            
            {[
              { step: "01", title: "Choose Your Pizza", desc: "Browse our menu of medically-approved flavor combinations." },
              { step: "02", title: "Place Order", desc: "Quick checkout with our secure payment system." },
              { step: "03", title: "Fast Delivery", desc: "Track your pizza in real-time as it speeds to your door." }
            ].map((step, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-50 text-center">
                <div className="w-16 h-16 bg-[#FFD166] text-[#E63946] rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-8">
                  {step.step}
                </div>
                <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                <p className="text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto bg-[#FFD166] rounded-[40px] p-12 sm:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="flex-1 relative z-10">
            <h2 className="text-5xl sm:text-7xl font-black text-[#E63946] leading-[0.9] tracking-tighter mb-8">
              BUY 1 GET 1 <br /> FREE TODAY!
            </h2>
            <p className="text-xl font-bold text-[#E63946] mb-10 opacity-80">
              Limited time offer. Use code: <span className="bg-white px-3 py-1 rounded-lg">DOCTORFREE</span>
            </p>
            <button className="bg-[#E63946] text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-red-200 hover:scale-105 transition-transform active:scale-95">
              CLAIM OFFER NOW
            </button>
          </div>
          <div className="flex-1 relative">
            <img 
              src="https://picsum.photos/seed/promo-pizza/600/600" 
              alt="Promo Pizza" 
              className="w-full h-auto rounded-3xl shadow-2xl rotate-3"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Urgency countdown mock */}
          <div className="absolute top-8 right-8 bg-white/30 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/50">
            <span className="text-[#E63946] font-black text-lg">ENDS IN: 04:52:11</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <img 
              src="https://picsum.photos/seed/chef/800/1000" 
              alt="Our Chef" 
              className="w-full h-auto rounded-[40px] shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-8">THE STORY BEHIND THE LAB COAT</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Pizza Dr. was founded in 2015 by Dr. Marco, a former medical student who realized that the best medicine wasn't found in a pharmacy, but in a wood-fired oven.
            </p>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              We believe that every slice should be a therapeutic experience. That's why we use only the freshest ingredients, hand-kneaded dough, and a secret sauce recipe that's been passed down through generations of "flavor doctors."
            </p>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-[#E63946]">10+</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Years of Cures</span>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-4xl font-black text-[#E63946]">50+</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Locations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section id="location" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-black tracking-tighter mb-8">VISIT THE CLINIC</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                    <MapPin className="text-[#E63946] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Address</h4>
                    <p className="text-slate-600">123 Pizza Lane, Dough City, FL 33101</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                    <Phone className="text-[#E63946] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                    <p className="text-slate-600">(555) 987-6543</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                    <Clock className="text-[#E63946] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Hours</h4>
                    <p className="text-slate-600">Mon - Thu: 11am - 11pm</p>
                    <p className="text-slate-600">Fri - Sun: 11am - 2am (Late Night Cures!)</p>
                  </div>
                </div>
              </div>
              <div className="mt-12 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-xl mb-4">DELIVERY AREAS</h4>
                <div className="flex flex-wrap gap-2">
                  {['Downtown', 'Westside', 'College Town', 'Beach District', 'The Heights'].map(area => (
                    <span key={area} className="bg-slate-50 px-4 py-2 rounded-full text-sm font-bold text-slate-600 border border-slate-100">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-[500px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              {/* Mock Google Map */}
              <div className="w-full h-full bg-slate-200 relative flex items-center justify-center">
                <img 
                  src="https://picsum.photos/seed/map/1000/1000" 
                  alt="Map" 
                  className="w-full h-full object-cover opacity-50 grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="bg-[#E63946] p-4 rounded-full shadow-2xl animate-bounce">
                    <Pizza className="text-white w-8 h-8" />
                  </div>
                  <div className="mt-2 bg-white px-4 py-2 rounded-xl shadow-xl font-black text-sm">PIZZA DR. HQ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter mb-8 leading-tight">
            READY TO CURE <br /> YOUR CRAVINGS?
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto">
            Don't let hunger win. Order now and get the best pizza in town delivered to your door in 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto bg-[#E63946] text-white px-12 py-6 rounded-2xl font-black text-2xl shadow-2xl shadow-red-900/20 hover:scale-105 transition-transform active:scale-95">
              ORDER NOW
            </button>
            <button className="w-full sm:w-auto border-2 border-white/20 hover:bg-white/10 text-white px-12 py-6 rounded-2xl font-black text-2xl transition-all active:scale-95">
              CALL NOW
            </button>
          </div>
        </div>
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 rotate-12"><Pizza className="w-24 h-24" /></div>
          <div className="absolute bottom-20 right-20 -rotate-12"><Utensils className="w-32 h-32" /></div>
          <div className="absolute top-1/2 left-1/4 rotate-45"><Truck className="w-20 h-20" /></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-[#E63946] p-1.5 rounded-lg">
                  <Pizza className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-[#E63946]">PIZZA DR.</span>
              </div>
              <p className="text-slate-500 max-w-sm mb-8">
                The doctor of pizza cravings. We're on a mission to cure hunger with the freshest, fastest, and most delicious pizza in the world.
              </p>
              <div className="flex gap-4">
                {['FB', 'IG', 'TW', 'YT'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold hover:bg-[#E63946] hover:text-white transition-all">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-lg mb-6">QUICK LINKS</h4>
              <ul className="space-y-4 font-bold text-slate-500">
                <li><a href="#menu" className="hover:text-[#E63946]">Menu</a></li>
                <li><a href="#why-us" className="hover:text-[#E63946]">About Us</a></li>
                <li><a href="#location" className="hover:text-[#E63946]">Location</a></li>
                <li><a href="#" className="hover:text-[#E63946]">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-6">LEGAL</h4>
              <ul className="space-y-4 font-bold text-slate-500">
                <li><a href="#" className="hover:text-[#E63946]">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#E63946]">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#E63946]">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 text-center text-slate-400 font-bold text-sm">
            © {new Date().getFullYear()} PIZZA DR. ALL RIGHTS RESERVED. MADE WITH ❤️ FOR PIZZA LOVERS.
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#FFD166] text-[#E63946] p-4 rounded-full shadow-2xl border-4 border-white"
        >
          <MessageCircle className="w-8 h-8" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#E63946] text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-red-200 flex items-center gap-2 border-4 border-white"
        >
          <ShoppingBag className="w-6 h-6" /> ORDER NOW
        </motion.button>
      </div>

      {/* Customization Modal */}
      <AnimatePresence>
        {isCustomizing && itemToCustomize && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCustomizing(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-[32px] shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md">
                    <img src={itemToCustomize.image} alt={itemToCustomize.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">{itemToCustomize.name}</h3>
                    <p className="text-slate-500 font-bold">Base Price: ${itemToCustomize.price}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCustomizing(false)}
                  className="p-2 hover:bg-white rounded-full transition-colors shadow-sm"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-10">
                {/* Crust Selection */}
                <div>
                  <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E63946]" /> CHOOSE YOUR CRUST
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CRUST_OPTIONS.map((crust) => (
                      <button
                        key={crust.id}
                        onClick={() => setSelectedCrust(crust)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${
                          selectedCrust.id === crust.id 
                            ? 'border-[#E63946] bg-red-50' 
                            : 'border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <span className="font-bold">{crust.name}</span>
                        {crust.price > 0 && <span className="text-sm font-black text-[#E63946]">+$ {crust.price}</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sauce Selection */}
                <div>
                  <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E63946]" /> SELECT YOUR SAUCE
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SAUCE_OPTIONS.map((sauce) => (
                      <button
                        key={sauce.id}
                        onClick={() => setSelectedSauce(sauce)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${
                          selectedSauce.id === sauce.id 
                            ? 'border-[#E63946] bg-red-50' 
                            : 'border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <span className="font-bold">{sauce.name}</span>
                        {sauce.price > 0 && <span className="text-sm font-black text-[#E63946]">+$ {sauce.price}</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toppings Selection */}
                <div>
                  <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#E63946]" /> ADD EXTRA TOPPINGS
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TOPPING_OPTIONS.map((topping) => {
                      const isSelected = selectedToppings.find(t => t.id === topping.id);
                      return (
                        <button
                          key={topping.id}
                          onClick={() => toggleTopping(topping)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col gap-1 ${
                            isSelected 
                              ? 'border-[#E63946] bg-red-50' 
                              : 'border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <span className="font-bold text-sm">{topping.name}</span>
                          <span className="text-xs font-black text-[#E63946]">+$ {topping.price}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-black mb-1">Quantity</h4>
                    <p className="text-sm text-slate-500 font-bold">How many pizzas?</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-[#E63946] hover:text-[#E63946] transition-colors"
                    >
                      <Minus className="w-6 h-6" />
                    </button>
                    <span className="text-3xl font-black w-8 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-[#E63946] hover:text-[#E63946] transition-colors"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Price</p>
                  <p className="text-3xl font-black text-[#E63946]">
                    ${((
                      itemToCustomize.price + 
                      selectedCrust.price + 
                      selectedSauce.price + 
                      selectedToppings.reduce((sum, t) => sum + t.price, 0)
                    ) * quantity).toFixed(2)}
                  </p>
                </div>
                <button 
                  onClick={() => addItemToCart(itemToCustomize, {
                    crust: selectedCrust,
                    sauce: selectedSauce,
                    toppings: selectedToppings
                  })}
                  className="w-full sm:w-auto bg-[#E63946] text-white px-12 py-4 rounded-2xl font-black text-xl shadow-xl shadow-red-200 hover:scale-105 transition-transform active:scale-95"
                >
                  ADD TO CART
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
