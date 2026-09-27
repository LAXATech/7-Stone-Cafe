import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle2, Clock, MapPin, Phone, User } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  branch: 'asaripallam' | 'rajakkamangalam';
  deliveryType: 'pickup' | 'delivery';
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  branch,
  deliveryType,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = cart.reduce((sum, item) => {
    const addOnsTotal = item.selectedAddOns?.reduce((s, a) => s + a.price, 0) || 0;
    return sum + (item.menuItem.price + addOnsTotal) * item.quantity;
  }, 0);

  const deliveryFee = deliveryType === 'delivery' ? 30 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phoneNumber) return;

    const generatedId = '7SC-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsSuccess(true);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onOrderSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-outfit">
                Order Received!
              </span>
              <h3 className="text-2xl font-black text-stone-900 font-outfit mt-1">
                Thank You, {customerName}!
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Order ID: <span className="font-mono font-bold text-stone-800">{orderId}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-stone-200 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Branch:</span>
                <span className="font-bold text-stone-800 capitalize">{branch} (24/7)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Type:</span>
                <span className="font-bold text-stone-800 capitalize">
                  {deliveryType === 'pickup' ? 'Branch Pickup (Free)' : 'Doorstep Delivery'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Estimated Time:</span>
                <span className="font-bold text-emerald-600">15 - 20 mins</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold text-stone-900">
                <span>Total Amount:</span>
                <span>₹ {grandTotal}</span>
              </div>
            </div>

            <p className="text-xs text-stone-500">
              Fresh hot chai and snacks are being prepared with love!
            </p>

            <button
              onClick={handleFinish}
              className="w-full bg-[#d96528] hover:bg-[#c45419] text-white py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md shadow-[#d96528]/30 cursor-pointer"
            >
              Done & Back to Home
            </button>
          </div>
        ) : (
          /* Checkout Details Form */
          <div className="p-6 sm:p-7">
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d96528] font-outfit">
                Complete Your Order
              </span>
              <h3 className="text-2xl font-black text-stone-900 font-outfit">
                {deliveryType === 'pickup' ? 'Branch Pickup' : 'Delivery Checkout'}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Ordering from 7 Stone Cafe ({branch === 'asaripallam' ? 'Asaripallam' : 'Rajakkamangalam'})
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 focus:border-[#d96528] focus:ring-1 focus:ring-[#d96528] text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 focus:border-[#d96528] focus:ring-1 focus:ring-[#d96528] text-sm outline-none"
                  />
                </div>
              </div>

              {deliveryType === 'delivery' ? (
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Delivery Address *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <textarea
                      required
                      rows={2}
                      placeholder="Street, Landmark, Area in Nagercoil"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 focus:border-[#d96528] focus:ring-1 focus:ring-[#d96528] text-sm outline-none resize-none"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Table No. or Car Vehicle No. (Optional for Dine-in / Curbside)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Table 4 / TN 74 AB 1234"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:border-[#d96528] focus:ring-1 focus:ring-[#d96528] text-sm outline-none"
                  />
                </div>
              )}

              {/* Order Mini Breakdown */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-sm font-bold text-stone-900">
                <span>Total Due:</span>
                <span className="text-lg text-[#d96528] font-outfit">₹ {grandTotal}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#d96528] hover:bg-[#c45419] text-white py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md shadow-[#d96528]/30 cursor-pointer"
              >
                Confirm & Pay on Delivery / Pickup
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
