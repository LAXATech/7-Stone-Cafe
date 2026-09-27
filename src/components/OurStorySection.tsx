import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const OurStorySection: React.FC = () => {
  return (
    <section id="our-story" className="py-16 sm:py-24 bg-[#fbf9f5] border-t border-[#eee9de] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Text & Story Content */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#d96528] uppercase font-outfit">
                OUR STORY
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight font-outfit">
                More Than Just a Cafe
              </h2>
            </div>

            {/* Exact 3 paragraphs from the reference image */}
            <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
              <p>
                7 Stone Cafe is built on a simple idea — to bring people together over a cup of tea.
              </p>
              <p>
                What started as a love for the traditional Chai Kadai culture, grew into a modern cafe where friends, students, families and travellers find good food, great vibes and a sense of community.
              </p>
              <p>
                We believe in fresh ingredients, authentic flavors and creating a space where every visit feels like coming home.
              </p>
            </div>

            {/* Handwritten Tamil/English quote matching reference image */}
            <div className="pt-4 border-t border-stone-200/80">
              <div className="space-y-1">
                <p className="font-handwriting text-2xl sm:text-3xl text-[#d96528] font-bold tracking-wide transform -rotate-1">
                  Oru cup tea...
                </p>
                <p className="font-handwriting text-2xl sm:text-3xl text-stone-800 font-bold tracking-wide transform -rotate-1 pl-4">
                  oru nalla vibe...
                </p>
                <p className="font-handwriting text-2xl sm:text-3xl text-[#b34c16] font-bold tracking-wide transform -rotate-1 pl-8">
                  oru unforgettable moment!
                </p>
              </div>
            </div>

            {/* Values badges */}
            <div className="pt-2 flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#eee9de] text-xs font-semibold text-stone-800 shadow-xs">
                <Heart className="w-3.5 h-3.5 text-[#d96528] fill-[#d96528]" />
                <span>Made With Love</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#eee9de] text-xs font-semibold text-stone-800 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
                <span>Real Authentic Spices</span>
              </div>
            </div>
          </div>

          {/* Right Column: Warm Cafe Interior Visual matching reference image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900 group">
              <img
                src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80"
                alt="7 Stone Cafe Interior Ambiance"
                className="w-full h-[280px] sm:h-[400px] lg:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />

              {/* Glowing Chalkboard Replica in the image */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#16181d]/90 backdrop-blur-md p-3.5 sm:p-5 rounded-2xl border-2 border-[#d96528]/40 shadow-xl text-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <span className="font-handwriting text-lg sm:text-xl text-[#f59e0b] block font-bold">
                  Good Food
                </span>
                <span className="font-handwriting text-xl sm:text-2xl text-white block font-extrabold my-0.5">
                  Great Vibes
                </span>
                <div className="h-0.5 w-12 bg-[#d96528] mx-auto my-1.5" />
                <span className="text-xs font-black tracking-widest text-[#10b981] font-outfit uppercase">
                  24 / 7
                </span>
              </div>

              {/* Gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-6 right-6 text-white">
                <p className="text-xs uppercase tracking-widest font-bold text-amber-300">
                  Open Around The Clock
                </p>
                <p className="text-sm font-medium text-stone-200 mt-0.5">
                  Relax, work, celebrate, or unwind at your favorite hangout spot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
