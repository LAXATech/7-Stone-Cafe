import React, { useState } from 'react';
import { MenuItem, AddOn } from '../types';
import { ArrowLeft, Star, Heart, Minus, Plus, X } from 'lucide-react';

interface ProductDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCartWithOptions: (item: MenuItem, quantity: number, addOns: AddOn[]) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  onAddToCartWithOptions,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleAddOn = (addOn: AddOn) => {
    if (selectedAddOns.some((a) => a.id === addOn.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addOn.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const calculatedTotal = (item.price + addOnsTotal) * quantity;

  const handleAdd = () => {
    onAddToCartWithOptions(item, quantity, selectedAddOns);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Card matching reference image */}
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh] sm:max-h-[92vh]">
        {/* Modal Top Nav Bar */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-stone-100">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-stone-700 hover:text-stone-900 font-bold text-sm tracking-wide transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Product Detail</span>
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Main Product Image with Favorite Heart */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label="Save to favorites"
              className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-600 hover:text-red-500 shadow-md transition-all cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
              />
            </button>
          </div>

          {/* Title & Price Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-outfit">
                {item.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 text-stone-300" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-stone-700">
                  {item.rating || 4.7} ({item.reviewsCount || 128} reviews)
                </span>
              </div>
            </div>

            <span className="text-2xl sm:text-3xl font-black text-stone-900 font-outfit">
              ₹ {item.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-stone-600 leading-relaxed">
            {item.description}
          </p>

          {/* Quantity Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2 font-outfit">
              Quantity
            </label>
            <div className="inline-flex items-center border border-stone-200 rounded-xl bg-stone-50 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-black text-base text-stone-900 font-outfit">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add-ons Checklist matching reference image */}
          {item.addOns && item.addOns.length > 0 && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2 font-outfit">
                Add-ons
              </label>
              <div className="space-y-2 border border-stone-100 rounded-xl p-3 bg-[#fdfbf8]">
                {item.addOns.map((addOn) => {
                  const isChecked = selectedAddOns.some((a) => a.id === addOn.id);
                  return (
                    <label
                      key={addOn.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-100/70 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddOn(addOn)}
                          className="w-4 h-4 rounded text-[#d96528] focus:ring-[#d96528] border-stone-300 accent-[#d96528]"
                        />
                        <span className="text-sm font-semibold text-stone-800">
                          {addOn.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-stone-500 font-outfit">
                        + ₹ {addOn.price}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA Button */}
        <div className="p-4 sm:p-5 bg-white border-t border-stone-100">
          <button
            onClick={handleAdd}
            className="w-full bg-[#d96528] hover:bg-[#c45419] text-white py-3.5 rounded-xl font-black text-sm tracking-wide transition-all shadow-sm cursor-pointer"
          >
            Add to Cart (₹ {calculatedTotal})
          </button>
        </div>
      </div>
    </div>
  );
};
