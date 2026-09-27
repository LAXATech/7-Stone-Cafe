import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, CartItem } from '../types';
import { Utensils, Coffee, GlassWater, Cookie, Flame, Plus, Minus, Trash2, ArrowLeft, Clock, MapPin, Zap, ShoppingBag } from 'lucide-react';

interface OrderPageProps {
  items: MenuItem[];
  cart: CartItem[];
  branch: 'asaripallam' | 'rajakkamangalam';
  setBranch: (b: 'asaripallam' | 'rajakkamangalam') => void;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onSelectItemForDetail: (item: MenuItem) => void;
  onCheckout: (deliveryType: 'pickup' | 'delivery') => void;
  onOpenCart?: () => void;
}

export const OrderPage: React.FC<OrderPageProps> = ({
  items,
  cart,
  branch,
  setBranch,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onSelectItemForDetail,
  onCheckout,
  onOpenCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');

  const categories = [
    { id: 'all', label: 'All Items', icon: Utensils },
    { id: 'chai-coffee', label: 'Chai & Coffee', icon: Coffee },
    { id: 'coolers', label: 'Coolers', icon: GlassWater },
    { id: 'snacks-chaats', label: 'Snacks & Chaats', icon: Cookie },
    { id: 'grills', label: 'Grills', icon: Flame },
  ];

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  // Subtotal calculation
  const subtotal = cart.reduce((sum, ci) => {
    const addOnTotal = ci.selectedAddOns?.reduce((s, a) => s + a.price, 0) || 0;
    return sum + (ci.menuItem.price + addOnTotal) * ci.quantity;
  }, 0);

  const deliveryFee = deliveryType === 'delivery' ? 30 : 0;
  const grandTotal = subtotal + deliveryFee;

  const getItemCartInstance = (menuItemId: string) => {
    return cart.find((ci) => ci.menuItem.id === menuItemId);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] pt-4 sm:pt-6 pb-32 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Link */}
        <div className="mb-3 sm:mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-500 hover:text-[#d96528] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header with Branch Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-[#eee9de]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Ordering Live • 24/7 Kitchen Active</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight font-outfit">
              Order Online
            </h1>
            <p className="mt-1 sm:mt-2 text-xs sm:text-base text-stone-600">
              Your favorite food, just a few clicks away.
            </p>
          </div>

          {/* Select Branch Switcher matching reference */}
          <div className="w-full md:w-auto bg-white p-2.5 sm:p-3 rounded-2xl border border-[#eee9de] shadow-xs flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className="text-[11px] sm:text-xs font-bold text-stone-500 font-outfit uppercase tracking-wider block">
              Select Branch:
            </span>
            <div className="grid grid-cols-2 w-full sm:w-auto bg-[#ede7dc] p-1 rounded-full text-center">
              <button
                onClick={() => setBranch('asaripallam')}
                className={`px-3 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer truncate ${
                  branch === 'asaripallam'
                    ? 'bg-[#d96528] text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Asaripallam
              </button>
              <button
                onClick={() => setBranch('rajakkamangalam')}
                className={`px-3 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer truncate ${
                  branch === 'rajakkamangalam'
                    ? 'bg-[#d96528] text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Rajakkamangalam
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Delivery / Pickup and Branch Strip (visible only on screens < lg) */}
        <div className="lg:hidden mt-3 space-y-2">
          {/* Delivery / Pickup Toggle for mobile */}
          <div className="bg-white p-1 rounded-xl border border-[#eee9de] grid grid-cols-2 gap-1 shadow-xs">
            <button
              onClick={() => setDeliveryType('pickup')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                deliveryType === 'pickup'
                  ? 'bg-[#d96528] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🥡 Pickup</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${deliveryType === 'pickup' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'}`}>Free</span>
            </button>
            <button
              onClick={() => setDeliveryType('delivery')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                deliveryType === 'delivery'
                  ? 'bg-[#d96528] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🛵 Delivery</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${deliveryType === 'delivery' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'}`}>+₹30</span>
            </button>
          </div>

          {/* Active Branch Info Strip */}
          <div className="p-2.5 rounded-xl bg-white border border-[#eee9de] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <MapPin className="w-4 h-4 text-[#d96528] shrink-0" />
              <div className="min-w-0">
                <span className="font-bold text-stone-900 capitalize block truncate">
                  7 Stone Cafe • {branch}
                </span>
                <p className="text-[11px] text-stone-500 truncate">
                  {branch === 'asaripallam' ? 'Near White Rose Nagar, Asaripallam Rd' : 'Chotachel Rd, Ganapathipuram'}
                </p>
              </div>
            </div>
            <span className="shrink-0 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 ml-2">
              <Clock className="w-3 h-3" />
              24/7
            </span>
          </div>
        </div>

        {/* Sticky Mobile Category Horizontal Scroll Bar (visible only on screens < lg) */}
        <div className="lg:hidden sticky top-14 sm:top-16 z-30 bg-[#fbf9f5]/95 backdrop-blur-md pt-3 pb-3 -mx-4 px-4 border-b border-[#eee9de] shadow-xs">
          <div className="flex gap-2 overflow-x-auto scrollbar-none scroll-smooth">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'all'
                ? items.length
                : items.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#d96528] text-white shadow-sm'
                      : 'bg-white text-stone-700 border border-[#eee9de] active:bg-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${isActive ? 'bg-white/25 text-white' : 'bg-stone-100 text-stone-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Interactive Ordering Layout */}
        <div className="mt-4 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Categories Sidebar for Desktop (visible only on lg+) */}
          <div className="hidden lg:block lg:col-span-3 space-y-2 sticky top-28">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block px-2 mb-2 font-outfit">
              Categories
            </span>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'all'
                ? items.length
                : items.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#d96528] text-white shadow-sm'
                      : 'bg-white hover:bg-[#f5efe4] text-stone-700 border border-[#eee9de]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                    <span>{cat.label}</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Branch Highlight Info Box for Desktop */}
            <div className="mt-6 p-4 rounded-2xl bg-white border border-[#eee9de] text-xs space-y-2">
              <span className="font-bold text-stone-800 uppercase tracking-wider text-[10px] block font-outfit">
                Selected Pickup / Delivery Hub
              </span>
              <p className="font-bold text-stone-900 capitalize flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#d96528]" />
                7 Stone Cafe - {branch}
              </p>
              <p className="text-stone-500">
                {branch === 'asaripallam'
                  ? 'Near White Rose Nagar, Asaripallam Road'
                  : 'Chotachel Road, Ganapathipuram'}
              </p>
              <p className="text-[#10b981] font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Open 24 Hours
              </p>
            </div>
          </div>

          {/* Middle Column: Food Items Grid (5 cols on lg) */}
          <div className="col-span-12 lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 font-outfit">
                {categories.find((c) => c.id === selectedCategory)?.label}
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                {filteredItems.length} items
              </span>
            </div>

            {/* Responsive Items Layout: Horizontal row cards on mobile, 2-col vertical cards on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {filteredItems.map((item) => {
                const cartInstance = getItemCartInstance(item.id);

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-3 border border-[#eee9de] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#d96528]/40 transition-all flex flex-row sm:flex-col justify-between gap-3 sm:gap-0"
                  >
                    {/* Image frame: Left on mobile, Top on desktop */}
                    <div
                      onClick={() => onSelectItemForDetail(item)}
                      className="w-24 h-24 sm:w-full sm:aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 sm:mb-3 shrink-0 cursor-pointer group relative shadow-xs"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.isSignature && (
                        <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-[#d96528] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                          Must Try
                        </span>
                      )}
                    </div>

                    {/* Info & Action Button */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3
                          onClick={() => onSelectItemForDetail(item)}
                          className="font-bold text-sm text-stone-900 line-clamp-2 sm:line-clamp-1 hover:text-[#d96528] cursor-pointer font-outfit"
                        >
                          {item.name}
                        </h3>
                        <p className="text-xs text-stone-500 font-medium mt-0.5 font-outfit">
                          ₹ {item.price}
                        </p>
                      </div>

                      {/* Action Button: Stepper or Add to Cart */}
                      <div className="mt-2.5 sm:mt-3">
                        {cartInstance ? (
                          <div className="inline-flex sm:flex items-center justify-between bg-[#fbf9f5] border border-[#d96528]/40 rounded-lg p-1 w-full max-w-[120px] sm:max-w-none">
                            <button
                              onClick={() => onUpdateQuantity(cartInstance.id, -1)}
                              className="w-7 h-7 rounded bg-white hover:bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-sm shadow-xs transition-colors cursor-pointer active:scale-95"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-black text-stone-900 font-outfit px-2">
                              {cartInstance.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(cartInstance.id, 1)}
                              className="w-7 h-7 rounded bg-[#d96528] hover:bg-[#c45419] text-white flex items-center justify-center font-bold text-sm shadow-xs transition-colors cursor-pointer active:scale-95"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => onAddToCart(item)}
                            className="w-full bg-[#d96528] hover:bg-[#c45419] text-white py-1.5 px-3 rounded-lg text-xs font-bold transition-all shadow-xs hover:shadow active:scale-98 cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: "Your Cart" Box for Desktop (Hidden on mobile < lg) */}
          <div className="hidden lg:block lg:col-span-4 bg-white rounded-2xl p-5 border border-[#eee9de] shadow-[0_4px_25px_rgba(0,0,0,0.04)] sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-stone-900 font-outfit">
                  Your Cart
                </h3>
                {cart.length > 0 && (
                  <span className="text-xs bg-[#fdeee4] text-[#d96528] font-bold px-2 py-0.5 rounded-full">
                    {cart.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                )}
              </div>
              {cart.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-12 text-center">
                <Utensils className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-stone-500">Your cart is empty</p>
                <p className="text-xs text-stone-400 mt-1">Select items from the menu to start ordering</p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100 max-h-[300px] overflow-y-auto pr-1 my-3">
                {cart.map((cartItem) => {
                  const itemTotal = (cartItem.menuItem.price + (cartItem.selectedAddOns?.reduce((s, a) => s + a.price, 0) || 0)) * cartItem.quantity;

                  return (
                    <div key={cartItem.id} className="py-3 flex items-center justify-between gap-3">
                      {/* Image Thumbnail */}
                      <img
                        src={cartItem.menuItem.image}
                        alt={cartItem.menuItem.name}
                        className="w-11 h-11 rounded-lg object-cover bg-stone-100 shrink-0"
                      />

                      {/* Title & Price */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-900 truncate font-outfit">
                          {cartItem.menuItem.name}
                        </h4>
                        <span className="text-xs font-bold text-stone-600">
                          ₹ {itemTotal}
                        </span>
                        {cartItem.selectedAddOns && cartItem.selectedAddOns.length > 0 && (
                          <p className="text-[10px] text-stone-400 truncate">
                            +{cartItem.selectedAddOns.map((a) => a.name).join(', ')}
                          </p>
                        )}
                      </div>

                      {/* Stepper & Delete */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-stone-200 rounded-md bg-[#fbf9f5]">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.id, -1)}
                            className="p-1 hover:text-[#d96528] text-stone-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1.5 text-stone-800">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.id, 1)}
                            className="p-1 hover:text-[#d96528] text-stone-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(cartItem.id)}
                          aria-label="Remove item"
                          className="text-stone-400 hover:text-red-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Price Calculations */}
            <div className="pt-4 border-t border-stone-100 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-stone-600">Subtotal</span>
                <span className="font-extrabold text-stone-900 font-outfit">
                  ₹ {subtotal}
                </span>
              </div>

              {/* Delivery / Pickup Radio Selector */}
              <div className="pt-2">
                <span className="text-xs font-bold text-stone-700 block mb-2 font-outfit">
                  Delivery / Pickup
                </span>
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-stone-50">
                    <input
                      type="radio"
                      name="pageDeliveryType"
                      checked={deliveryType === 'pickup'}
                      onChange={() => setDeliveryType('pickup')}
                      className="accent-[#d96528]"
                    />
                    <span className="font-semibold text-stone-800">Pickup (Free)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-stone-50">
                    <input
                      type="radio"
                      name="pageDeliveryType"
                      checked={deliveryType === 'delivery'}
                      onChange={() => setDeliveryType('delivery')}
                      className="accent-[#d96528]"
                    />
                    <span className="font-semibold text-stone-800">Delivery (₹ 30)</span>
                  </label>
                </div>
              </div>

              {/* Delivery Fee Line */}
              {deliveryType === 'delivery' && (
                <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                  <span>Delivery fee</span>
                  <span>₹ 30</span>
                </div>
              )}
            </div>

            {/* Place Order CTA Button */}
            <button
              onClick={() => onCheckout(deliveryType)}
              disabled={cart.length === 0}
              className={`mt-5 w-full py-3.5 rounded-xl font-black text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                cart.length > 0
                  ? 'bg-[#d96528] hover:bg-[#c45419] text-white shadow-sm'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              Place Order {cart.length > 0 && `(₹ ${grandTotal})`}
            </button>

            {/* Free pickup note */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-stone-500 text-[11px] font-medium">
              <Zap className="w-3.5 h-3.5 text-[#d96528]" />
              <span>Free pickup available at both branches</span>
            </div>
          </div>
        </div>

        {/* Floating Mobile & Tablet Cart Bar */}
        {cart.length > 0 && (
          <div className="lg:hidden fixed bottom-4 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md z-40 bg-[#d96528] text-white p-2.5 sm:p-3 rounded-2xl shadow-xl flex items-center justify-between backdrop-blur-md animate-fadeIn">
            <div
              onClick={() => onOpenCart?.()}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer min-w-0 flex-1 mr-2"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 flex items-center justify-center font-black text-xs font-outfit shrink-0">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase font-bold text-white/80 font-outfit tracking-wide flex items-center gap-1 truncate">
                  <span>{deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}<span className="hidden min-[380px]:inline"> Order</span></span>
                  <ShoppingBag className="w-3 h-3 text-white/90 shrink-0" />
                </p>
                <p className="text-xs sm:text-sm font-black font-outfit truncate">
                  ₹ {grandTotal}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {onOpenCart && (
                <button
                  onClick={onOpenCart}
                  className="bg-white/20 hover:bg-white/30 text-white px-2.5 sm:px-3 py-2 rounded-xl font-bold text-[11px] sm:text-xs active:scale-95 cursor-pointer transition-all whitespace-nowrap"
                >
                  <span className="hidden min-[340px]:inline">View </span>Cart
                </button>
              )}
              <button
                onClick={() => onCheckout(deliveryType)}
                className="bg-white hover:bg-stone-50 text-[#d96528] px-3 sm:px-4 py-2 rounded-xl font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-sm active:scale-95 cursor-pointer transition-all whitespace-nowrap"
              >
                Checkout →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
