import React from 'react';
import { BRANCHES } from '../data/cafeData';
import { MapPin, Star, Navigation, CheckCircle2 } from 'lucide-react';

export const LocationsSection: React.FC = () => {
  return (
    <section id="locations" className="py-16 sm:py-24 bg-[#fbf9f5] border-t border-[#eee9de]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#d96528] uppercase font-outfit">
            OUR LOCATIONS
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight font-outfit">
            Two Branches. Same Great Vibe.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Visit us at either location and experience the perfect blend of great food, drinks and community.
          </p>
        </div>

        {/* 2 Branch Cards Grid matching reference image */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#eee9de] shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Branch Exterior Photo */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
                <img
                  src={branch.image}
                  alt={`7 Stone Cafe ${branch.name} Branch`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-white text-xs font-bold px-3 py-1 rounded-md bg-black/60 backdrop-blur-xs">
                  Nagercoil, Tamil Nadu
                </span>
              </div>

              {/* Branch Details */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Branch Name & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
                    <h3 className="text-xl sm:text-3xl font-black text-stone-900 font-outfit">
                      {branch.name}
                    </h3>

                    <div className="flex items-center gap-2">
                      {/* Rating */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                        {branch.rating} <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span className="text-[10px] text-stone-500 font-normal">({branch.ratingSource})</span>
                      </span>

                      {/* Open 24 Hours */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {branch.status}
                      </span>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mt-4 flex items-start gap-2.5 text-stone-600 text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-[#d96528] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{branch.address}</p>
                  </div>

                  {/* Amenities Tags */}
                  <div className="mt-6 pt-5 border-t border-stone-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-3 font-outfit">
                      Highlights & Features
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {branch.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f8f5ee] text-stone-700 text-xs font-medium border border-stone-200/60"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#d96528]" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Get Directions Button matching reference image */}
                <div className="mt-8 pt-4">
                  <a
                    href={branch.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
                  >
                    <Navigation className="w-4 h-4 text-white" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
