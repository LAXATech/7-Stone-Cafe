import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Minus, Plus, ShoppingBag, Zap, Trash2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onCheckout: (deliveryType: 'pickup' | 'delivery') => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');

  const subtotal = cart.reduce((sum, item) => {
    const addOnsTotal = item.selectedAddOns?.reduce((s, a) => s + a.price, 0) || 0;
    return sum + (item.menuItem.price + addOnsTotal) * item.quantity;
  }, 0);

  const deliveryFee = deliveryType === 'delivery' ? 30 : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header matching reference image */}
          <div className="p-5 flex items-center justify-between border-b border-stone-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#d96528]" />
              <h2 className="text-xl font-black text-stone-900 font-outfit">Cart</h2>
              {cart.length > 0 && (
                <span className="text-xs bg-[#fdeee4] text-[#d96528] px-2 py-0.5 rounded-full font-bold">
                  {cart.length} items
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {cart.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs font-bold text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-300 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-stone-800">Your cart is empty</h3>
                <p className="text-xs text-stone-400 mt-1 max-w-xs">
                  Discover our flavorful chai, authentic snacks, and grills to get started.
                </p>
              </div>
            ) : (
              cart.map((cartItem) => {
                const itemUnitTotal = cartItem.menuItem.price + (cartItem.selectedAddOns?.reduce((s, a) => s + a.price, 0) || 0);

                return (
                  <div key={cartItem.id} className="py-4 flex gap-4 items-center">
                    <img
                      src={cartItem.menuItem.image}
                      alt={cartItem.menuItem.name}
                      className="w-16 h-16 rounded-xl object-cover bg-stone-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-sm text-stone-900 truncate font-outfit">
                          {cartItem.menuItem.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(cartItem.id)}
                          aria-label="Delete item"
                          className="text-stone-300 hover:text-red-500 transition-colors p-0.5"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-stone-600 font-outfit mt-0.5 block">
                        ₹ {itemUnitTotal * cartItem.quantity}
                      </span>

                      {cartItem.selectedAddOns && cartItem.selectedAddOns.length > 0 && (
                        <p className="text-[11px] text-stone-400 mt-0.5 truncate">
                          +{cartItem.selectedAddOns.map((a) => a.name).join(', ')}
                        </p>
                      )}

                      {/* Stepper matching image [- 1 +] */}
                      <div className="mt-2 inline-flex items-center border border-stone-200 rounded-md bg-[#fbf9f5] px-1 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.id, -1)}
                          className="p-1 text-stone-600 hover:text-[#d96528] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-2 text-stone-800">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.id, 1)}
                          className="p-1 text-stone-600 hover:text-[#d96528] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Calculations matching reference */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-100 bg-[#fdfbf8] space-y-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-base">
                <span className="font-bold text-stone-700">Subtotal</span>
                <span className="font-black text-stone-900 font-outfit text-lg">
                  ₹ {subtotal}
                </span>
              </div>

              {/* Delivery / Pickup Radio selector */}
              <div>
                <span className="text-xs font-bold text-stone-600 block mb-2 font-outfit">
                  Delivery / Pickup
                </span>
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-stone-100/60">
                    <input
                      type="radio"
                      name="drawerDeliveryType"
                      checked={deliveryType === 'pickup'}
                      onChange={() => setDeliveryType('pickup')}
                      className="accent-[#d96528]"
                    />
                    <span className="font-semibold text-stone-800">Pickup (Free)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-stone-100/60">
                    <input
                      type="radio"
                      name="drawerDeliveryType"
                      checked={deliveryType === 'delivery'}
                      onChange={() => setDeliveryType('delivery')}
                      className="accent-[#d96528]"
                    />
                    <span className="font-semibold text-stone-800">Delivery (₹ 30)</span>
                  </label>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                onClick={() => {
                  onClose();
                  onCheckout(deliveryType);
                }}
                className="w-full bg-[#d96528] hover:bg-[#c45419] text-white py-3.5 rounded-xl font-black text-sm tracking-wide transition-all shadow-sm cursor-pointer"
              >
                Place Order (₹ {grandTotal})
              </button>

              {/* Free pickup notice */}
              <div className="flex items-center justify-center gap-1.5 text-stone-500 text-[11px] font-medium pt-1">
                <Zap className="w-3.5 h-3.5 text-[#d96528]" />
                <span>Free pickup available at both branches</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
