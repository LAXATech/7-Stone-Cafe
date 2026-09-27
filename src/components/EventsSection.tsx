import React from 'react';
import { Calendar, Music, Trophy, Sparkles } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const events = [
    {
      title: 'Live Sports Screening: IPL & Cricket Match Nights',
      date: 'Every Weekend & Match Days',
      time: '7:30 PM Onwards',
      branch: 'Asaripallam Rooftop & Rajakkamangalam Garden',
      description: 'Cheer for your team on high-definition big screens with roaring sound, hot dum chai, and sizzling grills.',
      icon: Trophy,
      badge: 'Live Screening',
    },
    {
      title: 'Acoustic Weekend Vibes: Unplugged Live Music',
      date: 'Saturday & Sunday Evenings',
      time: '8:00 PM - 11:00 PM',
      branch: 'Rajakkamangalam Open Lawn',
      description: 'Soulful acoustic Tamil & English melodies under the stars surrounded by warm fairy lights and good company.',
      icon: Music,
      badge: 'Live Music',
    },
    {
      title: 'Midnight Chai & Board Games Circle',
      date: 'Open Every Night (24/7)',
      time: '11:00 PM - 4:00 AM',
      branch: 'Both Branches',
      description: 'Late night study groups, carrom battles, chess and midnight snack cravings with fellow night owls.',
      icon: Sparkles,
      badge: '24/7 Hangout',
    },
  ];

  return (
    <section id="events" className="py-16 sm:py-20 bg-[#f7f3ea] border-t border-[#eee9de]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#d96528] uppercase font-outfit">
            COMMUNITY & HAPPENINGS
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight font-outfit">
            Events & Live Nights
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            More than just dining — create unforgettable memories with live sports screenings, acoustic sessions, and 24/7 hangouts.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {events.map((evt, idx) => {
            const Icon = evt.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#eee9de] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#fdeee4] text-[#d96528] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {evt.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 font-outfit leading-snug">
                    {evt.title}
                  </h3>

                  <div className="mt-3 space-y-1 text-xs text-stone-500 font-medium">
                    <p className="flex items-center gap-1.5 text-[#d96528] font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{evt.date} • {evt.time}</span>
                    </p>
                    <p className="text-stone-600">📍 {evt.branch}</p>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <a
                    href="#order-online"
                    className="inline-block text-xs font-bold text-[#d96528] hover:text-[#b34c16] uppercase tracking-wider font-outfit"
                  >
                    Join Us This Weekend →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
