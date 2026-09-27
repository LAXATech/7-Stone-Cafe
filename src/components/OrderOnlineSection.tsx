import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types';
import { Utensils, Coffee, GlassWater, Cookie, Flame, Plus, Minus, Trash2 } from 'lucide-react';

interface OrderOnlineSectionProps {
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
}

export const OrderOnlineSection: React.FC<OrderOnlineSectionProps> = ({
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

  // Calculate cart subtotal
  const subtotal = cart.reduce((sum, ci) => {
    const addOnTotal = ci.selectedAddOns?.reduce((s, a) => s + a.price, 0) || 0;
    return sum + (ci.menuItem.price + addOnTotal) * ci.quantity;
  }, 0);

  const deliveryFee = deliveryType === 'delivery' ? 30 : 0;
  const grandTotal = subtotal + deliveryFee;

  // Find item quantity in cart
  const getItemCartInstance = (menuItemId: string) => {
    return cart.find((ci) => ci.menuItem.id === menuItemId);
  };

  return (
    <section id="order-online" className="py-16 sm:py-20 bg-[#fbf9f5] border-t border-[#eee9de]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Branch Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#eee9de]">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight font-outfit">
              Order Online
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600">
              Your favorite food, just a few clicks away.
            </p>
          </div>

          {/* Select Branch Switcher matching reference */}
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-bold text-stone-500 font-outfit">
              Select Branch
            </span>
            <div className="inline-flex bg-[#ede7dc] p-1 rounded-full">
              <button
                onClick={() => setBranch('asaripallam')}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  branch === 'asaripallam'
                    ? 'bg-[#d96528] text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Asaripallam
              </button>
              <button
                onClick={() => setBranch('rajakkamangalam')}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
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

        {/* 3-Column Interactive Ordering Workspace */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Categories Sidebar (2.5 cols) */}
          <div className="lg:col-span-3 space-y-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#d96528] text-white shadow-md shadow-[#d96528]/25'
                      : 'bg-white hover:bg-[#f5efe4] text-stone-700 border border-[#eee9de]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Middle Column: Items Grid (6 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-extrabold text-stone-900 font-outfit">
              {categories.find((c) => c.id === selectedCategory)?.label}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const cartInstance = getItemCartInstance(item.id);

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-3 border border-[#eee9de] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#d96528]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image frame */}
                      <div
                        onClick={() => onSelectItemForDetail(item)}
                        className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 mb-3 cursor-pointer group"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Info */}
                      <h4
                        onClick={() => onSelectItemForDetail(item)}
                        className="font-bold text-sm text-stone-900 line-clamp-1 hover:text-[#d96528] cursor-pointer font-outfit"
                      >
                        {item.name}
                      </h4>
                      <p className="text-xs text-stone-500 font-medium mt-0.5 font-outfit">
                        ₹ {item.price}
                      </p>
                    </div>

                    {/* Action Button: Stepper or Add to Cart */}
                    <div className="mt-3">
                      {cartInstance ? (
                        <div className="flex items-center justify-between bg-[#fbf9f5] border border-[#d96528]/40 rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQuantity(cartInstance.id, -1)}
                            className="w-7 h-7 rounded bg-white hover:bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-sm shadow-xs transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-black text-stone-900 font-outfit px-2">
                            {cartInstance.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartInstance.id, 1)}
                            className="w-7 h-7 rounded bg-[#d96528] hover:bg-[#c45419] text-white flex items-center justify-center font-bold text-sm shadow-xs transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onAddToCart(item)}
                          className="w-full bg-[#d96528] hover:bg-[#c45419] text-white py-1.5 px-3 rounded-lg text-xs font-bold transition-all shadow-xs hover:shadow cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: "Your Cart" Box matching reference (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#eee9de] shadow-[0_4px_25px_rgba(0,0,0,0.04)] sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="text-lg font-black text-stone-900 font-outfit">
                Your Cart
              </h3>
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

              {/* Delivery / Pickup Radio Selector matching reference */}
              <div className="pt-2">
                <span className="text-xs font-bold text-stone-700 block mb-2 font-outfit">
                  Delivery / Pickup
                </span>
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-stone-50">
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === 'pickup'}
                      onChange={() => setDeliveryType('pickup')}
                      className="accent-[#d96528]"
                    />
                    <span className="font-semibold text-stone-800">Pickup (Free)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-stone-50">
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === 'delivery'}
                      onChange={() => setDeliveryType('delivery')}
                      className="accent-[#d96528]"
                    />
                    <span className="font-semibold text-stone-800">Delivery (₹ 30)</span>
                  </label>
                </div>
              </div>

              {/* Grand Total */}
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
                  ? 'bg-[#d96528] hover:bg-[#c45419] text-white shadow-md shadow-[#d96528]/30 hover:scale-[1.01] active:scale-[0.99]'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              Place Order {cart.length > 0 && `(₹ ${grandTotal})`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
