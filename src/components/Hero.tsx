import React from 'react';
import { Utensils, Coffee, Trees, Tv, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOrderOnline: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderOnline, onExploreMenu }) => {
  return (
    <section id="home" className="relative w-full">
      {/* Hero Banner Container */}
      <div className="relative w-full min-h-[540px] md:min-h-[580px] lg:min-h-[620px] bg-stone-900 overflow-hidden flex items-center">
        {/* Background Image using user provided bg.png */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bg.png"
            alt="7 Stone Cafe Kulhar Chai and Vibe"
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.03]"
          />
          {/* Subtle gradient vignette so text on left is crystal clear while cup & chalkboard stay visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-2xl">
            {/* Open 24 Hours Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-emerald-500/40 backdrop-blur-md mb-6 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-xs font-bold tracking-widest text-[#10b981] uppercase font-outfit">
                OPEN 24 HOURS
              </span>
            </div>

            {/* Main Headline (Scales smoothly down to 36px on mobile, lg:text-[76px] on desktop untouched) */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-white tracking-tight uppercase font-outfit leading-[1.02] sm:leading-[0.98] drop-shadow-md">
              ONE CUP.
              <br />
              <span className="text-[#f59e0b]">ONE SMILE.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-5 text-base sm:text-xl text-stone-200 font-normal tracking-wide max-w-xl">
              Come for the tea, stay for the vibe.
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onOrderOnline}
                className="w-full sm:w-auto justify-center bg-[#d96528] hover:bg-[#c45419] text-white px-7 py-3 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base tracking-wide transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                Order Online
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto justify-center bg-transparent hover:bg-white/10 text-white border border-white/60 hover:border-white px-7 py-3 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base tracking-wide transition-all duration-200 backdrop-blur-xs cursor-pointer text-center"
              >
                Explore Menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Bar Under Hero (1 col on mobile to avoid cramped word wraps, 4 cols on desktop untouched) */}
      <div className="bg-[#fbf9f5] border-b border-[#ece6d9] py-5 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="flex items-center sm:items-start gap-3.5 sm:gap-4 p-3 rounded-xl bg-white/70 sm:bg-transparent border border-stone-200/50 sm:border-0 hover:bg-stone-50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#fdeee4] text-[#d96528] flex items-center justify-center shrink-0">
                <Utensils className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-stone-900 font-outfit whitespace-nowrap">
                  Great Food
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  Freshly made, always
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center sm:items-start gap-3.5 sm:gap-4 p-3 rounded-xl bg-white/70 sm:bg-transparent border border-stone-200/50 sm:border-0 hover:bg-stone-50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#fdeee4] text-[#d96528] flex items-center justify-center shrink-0">
                <Coffee className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-stone-900 font-outfit whitespace-nowrap">
                  Chai & Coffee
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  Traditional & modern brews
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center sm:items-start gap-3.5 sm:gap-4 p-3 rounded-xl bg-white/70 sm:bg-transparent border border-stone-200/50 sm:border-0 hover:bg-stone-50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#fdeee4] text-[#d96528] flex items-center justify-center shrink-0">
                <Trees className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-stone-900 font-outfit whitespace-nowrap">
                  Outdoor Seating
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  Tree garden & rooftop
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center sm:items-start gap-3.5 sm:gap-4 p-3 rounded-xl bg-white/70 sm:bg-transparent border border-stone-200/50 sm:border-0 hover:bg-stone-50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#fdeee4] text-[#d96528] flex items-center justify-center shrink-0">
                <Tv className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-stone-900 font-outfit whitespace-nowrap">
                  Sports & Events
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  Live screens & live music
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
