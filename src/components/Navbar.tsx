import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { Search, ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isOrderPage = location.pathname === '/order';
  const [activeSection, setActiveSection] = useState<'home' | 'menu' | 'order' | 'our-story' | 'locations' | 'events'>('home');

  // Real-time ScrollSpy to accurately track which section the user is currently viewing
  useEffect(() => {
    if (isOrderPage) {
      setActiveSection('order');
      return;
    }

    const checkActiveSection = () => {
      // If near the top, unconditionally highlight Home
      if (window.scrollY < 200) {
        setActiveSection('home');
        return;
      }

      // Check sections from bottom to top according to their appearance on the page
      const sections = ['events', 'locations', 'our-story', 'menu'];
      const scrollPosition = window.scrollY + 280;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(id as any);
          return;
        }
      }

      setActiveSection('home');
    };

    checkActiveSection();
    window.addEventListener('scroll', checkActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', checkActiveSection);
  }, [isOrderPage]);

  const handleNavClick = (target: string, sectionId?: 'home' | 'menu' | 'order' | 'our-story' | 'locations' | 'events') => {
    setMobileMenuOpen(false);

    if (target === '/order') {
      setActiveSection('order');
      navigate('/order');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (isOrderPage) {
      navigate('/');
      setTimeout(() => {
        if (target.includes('#')) {
          const id = target.split('#')[1];
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          if (sectionId) setActiveSection(sectionId);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveSection('home');
        }
      }, 50);
    } else {
      if (target === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
        window.history.replaceState(null, '', '/');
      } else if (target.includes('#')) {
        const id = target.split('#')[1];
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        if (sectionId) setActiveSection(sectionId);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f5]/95 backdrop-blur-md border-b border-[#ece6d9]/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0"
            onClick={() => {
              setActiveSection('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.replaceState(null, '', '/');
            }}
          >
            <Logo size="md" />
          </Link>

          {/* Desktop Nav Links in exact order of the page sections */}
          <nav className="hidden md:flex items-center gap-8">
            {/* 1. Home */}
            <button
              onClick={() => handleNavClick('/', 'home')}
              className={`text-sm font-semibold transition-colors duration-150 relative py-1 cursor-pointer ${
                activeSection === 'home'
                  ? 'text-[#d96528]'
                  : 'text-stone-700 hover:text-[#d96528]'
              }`}
            >
              Home
              {activeSection === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d96528] rounded-full" />
              )}
            </button>

            {/* 2. Signatures */}
            <button
              onClick={() => handleNavClick('/#menu', 'menu')}
              className={`text-sm font-semibold transition-colors duration-150 relative py-1 cursor-pointer ${
                activeSection === 'menu'
                  ? 'text-[#d96528]'
                  : 'text-stone-700 hover:text-[#d96528]'
              }`}
            >
              Signatures
              {activeSection === 'menu' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d96528] rounded-full" />
              )}
            </button>

            {/* 3. Order Online */}
            <button
              onClick={() => handleNavClick('/order', 'order')}
              className={`text-sm font-semibold transition-colors duration-150 relative py-1 cursor-pointer ${
                activeSection === 'order'
                  ? 'text-[#d96528]'
                  : 'text-stone-700 hover:text-[#d96528]'
              }`}
            >
              Order Online
              {activeSection === 'order' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d96528] rounded-full" />
              )}
            </button>

            {/* 4. Our Story */}
            <button
              onClick={() => handleNavClick('/#our-story', 'our-story')}
              className={`text-sm font-semibold transition-colors duration-150 relative py-1 cursor-pointer ${
                activeSection === 'our-story'
                  ? 'text-[#d96528]'
                  : 'text-stone-700 hover:text-[#d96528]'
              }`}
            >
              Our Story
              {activeSection === 'our-story' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d96528] rounded-full" />
              )}
            </button>

            {/* 5. Locations */}
            <button
              onClick={() => handleNavClick('/#locations', 'locations')}
              className={`text-sm font-semibold transition-colors duration-150 relative py-1 cursor-pointer ${
                activeSection === 'locations'
                  ? 'text-[#d96528]'
                  : 'text-stone-700 hover:text-[#d96528]'
              }`}
            >
              Locations
              {activeSection === 'locations' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d96528] rounded-full" />
              )}
            </button>

            {/* 6. Events */}
            <button
              onClick={() => handleNavClick('/#events', 'events')}
              className={`text-sm font-semibold transition-colors duration-150 relative py-1 cursor-pointer ${
                activeSection === 'events'
                  ? 'text-[#d96528]'
                  : 'text-stone-700 hover:text-[#d96528]'
              }`}
            >
              Events
              {activeSection === 'events' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d96528] rounded-full" />
              )}
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search Menu"
              className="p-2 sm:p-2.5 text-stone-700 hover:text-[#d96528] hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="View Cart"
              className="relative p-2 sm:p-2.5 text-stone-700 hover:text-[#d96528] hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#d96528] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Now Button (Visible on sm+ screens, mobile menu has its own prominent button) */}
            <button
              onClick={() => {
                navigate('/order');
                setActiveSection('order');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hidden sm:inline-flex bg-[#d96528] hover:bg-[#c45419] text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Order Now
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fbf9f5] border-b border-stone-200 px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => handleNavClick('/', 'home')}
            className={`block w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold transition-colors ${
              activeSection === 'home'
                ? 'text-[#d96528] bg-[#fdeee4]'
                : 'text-stone-800 hover:bg-[#f3ede2]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('/#menu', 'menu')}
            className={`block w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold transition-colors ${
              activeSection === 'menu'
                ? 'text-[#d96528] bg-[#fdeee4]'
                : 'text-stone-800 hover:bg-[#f3ede2]'
            }`}
          >
            Signatures
          </button>
          <button
            onClick={() => handleNavClick('/order', 'order')}
            className={`block w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold transition-colors ${
              activeSection === 'order'
                ? 'text-[#d96528] bg-[#fdeee4]'
                : 'text-stone-800 hover:bg-[#f3ede2]'
            }`}
          >
            Order Online
          </button>
          <button
            onClick={() => handleNavClick('/#our-story', 'our-story')}
            className={`block w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold transition-colors ${
              activeSection === 'our-story'
                ? 'text-[#d96528] bg-[#fdeee4]'
                : 'text-stone-800 hover:bg-[#f3ede2]'
            }`}
          >
            Our Story
          </button>
          <button
            onClick={() => handleNavClick('/#locations', 'locations')}
            className={`block w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold transition-colors ${
              activeSection === 'locations'
                ? 'text-[#d96528] bg-[#fdeee4]'
                : 'text-stone-800 hover:bg-[#f3ede2]'
            }`}
          >
            Locations
          </button>
          <button
            onClick={() => handleNavClick('/#events', 'events')}
            className={`block w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold transition-colors ${
              activeSection === 'events'
                ? 'text-[#d96528] bg-[#fdeee4]'
                : 'text-stone-800 hover:bg-[#f3ede2]'
            }`}
          >
            Events
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/order');
                setActiveSection('order');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full bg-[#d96528] text-white py-3 rounded-lg text-center font-bold text-sm"
            >
              Order Online Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
