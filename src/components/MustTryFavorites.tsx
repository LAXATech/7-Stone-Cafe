import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Plus } from 'lucide-react';

interface MustTryFavoritesProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem, e: React.MouseEvent) => void;
}

export const MustTryFavorites: React.FC<MustTryFavoritesProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'chai-coffee' | 'coolers' | 'snacks-chaats' | 'grills'>('all');

  const categories = [
    { id: 'all', label: 'All Favorites' },
    { id: 'chai-coffee', label: 'Chai & Coffee' },
    { id: 'coolers', label: 'Coolers' },
    { id: 'snacks-chaats', label: 'Snacks & Chaats' },
    { id: 'grills', label: 'Grills' },
  ];

  // If "all" is selected, display the 6 exact signature items from the top right panel
  const displayedItems = activeTab === 'all'
    ? items.filter((item) => item.isSignature).slice(0, 6)
    : items.filter((item) => item.category === activeTab);

  return (
    <section id="menu" className="py-16 sm:py-20 bg-[#fbf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#d96528] uppercase font-outfit">
            OUR SIGNATURES
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight font-outfit">
            Must Try Favorites
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            From traditional brews to flavorful bites, every item is made with fresh ingredients and a whole lot of love.
          </p>
        </div>

        {/* Category Filter Pills (Smooth scroll on mobile, centered on sm+) */}
        <div className="mt-6 sm:mt-8 flex items-center justify-start sm:justify-center overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 gap-2 sm:gap-3 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#d96528] text-white shadow-sm'
                    : 'bg-[#f0ece1] text-stone-700 hover:bg-[#e6e0d2]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 6-Card Grid matching the Top-Right of the image */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group bg-white rounded-2xl p-3 sm:p-4 border border-[#eee9de] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-stone-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {item.tags && item.tags[0] && (
                  <span className="absolute top-2.5 left-2.5 bg-black/65 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {item.tags[0]}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#d96528] transition-colors font-outfit">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1 line-clamp-1">
                    {item.description}
                  </p>
                </div>

                {/* Price and Plus Button matching the image */}
                <div className="mt-4 pt-2 flex items-center justify-between">
                  <span className="text-base sm:text-lg font-black text-stone-900 font-outfit">
                    ₹ {item.price}
                  </span>

                  <button
                    onClick={(e) => onQuickAdd(item, e)}
                    aria-label={`Add ${item.name} to cart`}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#d96528] hover:bg-[#c45419] text-white flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
