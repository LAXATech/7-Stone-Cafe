import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { MustTryFavorites } from '../components/MustTryFavorites';
import { LocationsSection } from '../components/LocationsSection';
import { OurStorySection } from '../components/OurStorySection';
import { EventsSection } from '../components/EventsSection';
import { MenuItem } from '../types';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface HomePageProps {
  items: MenuItem[];
  onSelectItemForDetail: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  items,
  onSelectItemForDetail,
  onQuickAdd,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section matching Top-Left panel */}
      <Hero
        onOrderOnline={() => navigate('/order')}
        onExploreMenu={() => {
          const el = document.querySelector('#menu');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Must Try Favorites matching Top-Right panel */}
      <MustTryFavorites
        items={items}
        onSelectItem={onSelectItemForDetail}
        onQuickAdd={(item, e) => {
          e.stopPropagation();
          onQuickAdd(item);
        }}
      />

      {/* Online Order Banner linking to dedicated Order Page */}
      <section className="bg-gradient-to-r from-[#1c120c] via-[#2a170e] to-[#141d2b] py-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d96528_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#f59e0b] font-outfit">
                Craving Hot Chai & Crispy Bites?
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-outfit">
                Order Online for Instant Pickup or Delivery
              </h2>
              <p className="text-stone-300 text-sm max-w-xl">
                Choose your preferred branch (Asaripallam or Rajakkamangalam) and customize your order in just a few clicks.
              </p>
            </div>

            <button
              onClick={() => navigate('/order')}
              className="bg-[#d96528] hover:bg-[#c45419] text-white px-8 py-4 rounded-2xl font-black text-sm tracking-wide transition-all shadow-xl shadow-[#d96528]/30 hover:scale-105 flex items-center gap-2.5 shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Order Online Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Our Story Section matching Bottom-Right panel */}
      <OurStorySection />

      {/* Locations Section matching Bottom-Left panel */}
      <LocationsSection />

      {/* Events Section */}
      <EventsSection />
    </div>
  );
};
