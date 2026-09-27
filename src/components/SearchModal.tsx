import React, { useState, useMemo } from 'react';
import { MenuItem } from '../types';
import { Search, X, Plus } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  items,
  onSelectItem,
  onQuickAdd,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items.slice(0, 6);
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 flex items-center gap-3 border-b border-stone-100">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search Dum Chai, Bread Omelette, Samosa, Grills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-base outline-none text-stone-900 placeholder:text-stone-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-bold text-stone-400 hover:text-stone-600 px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100">
          <div className="mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 font-outfit">
              {query ? `Search Results (${filteredItems.length})` : 'Popular Recommendations'}
            </span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <p className="text-sm font-semibold">No menu items found for "{query}"</p>
              <p className="text-xs text-stone-400 mt-1">Try searching for chai, coffee, snacks, or alfaham.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between gap-4 hover:bg-stone-50 rounded-xl px-2 transition-colors"
              >
                <div
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover bg-stone-100 shrink-0"
                  />
                  <div className="truncate">
                    <h4 className="text-sm font-bold text-stone-900 truncate font-outfit">
                      {item.name}
                    </h4>
                    <p className="text-xs text-stone-500 truncate">
                      {item.description}
                    </p>
                    <span className="text-xs font-extrabold text-[#d96528] font-outfit">
                      ₹ {item.price}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onQuickAdd(item)}
                  aria-label="Add to cart"
                  className="p-2 rounded-full bg-[#d96528] hover:bg-[#c45419] text-white shadow-xs transition-transform active:scale-95 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
