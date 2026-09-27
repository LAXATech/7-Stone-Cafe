import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'dark',
  showText = true,
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 lg:w-13 lg:h-13',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
  }[size];

  return (
    <div className="flex items-center gap-2 sm:gap-3 select-none group cursor-pointer">
      {/* 7 Stone Cafe Logo using user provided 7.png */}
      <div className={`relative ${iconDimensions} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <img
          src="/logo.png"
          alt="7 Stone Cafe Logo"
          className="w-full h-full object-contain rounded-full drop-shadow-md"
        />
      </div>

      {showText && (
        <div className="flex flex-col min-w-0">
          <span
            className={`font-black tracking-tight uppercase font-outfit transition-colors leading-none whitespace-nowrap ${
              variant === 'light'
                ? 'text-white group-hover:text-[#ea7233]'
                : 'text-[#1c1917] group-hover:text-[#d96528]'
            } ${
              size === 'sm'
                ? 'text-xs sm:text-sm'
                : size === 'lg'
                ? 'text-2xl'
                : 'text-sm xs:text-base sm:text-lg lg:text-xl'
            }`}
          >
            7 STONE CAFE
          </span>
          <span
            className={`font-medium tracking-wide whitespace-nowrap mt-0.5 sm:mt-1 ${
              variant === 'light' ? 'text-stone-400' : 'text-stone-500'
            } text-[10px] xs:text-[11px] sm:text-xs`}
          >
            One Cup. One Smile.
          </span>
        </div>
      )}
    </div>
  );
};
