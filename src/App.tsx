import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { OrderPage } from './pages/OrderPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { MENU_ITEMS } from './data/cafeData';
import { MenuItem, CartItem, AddOn } from './types';

// Inner App Layout component to access router location
const AppContent: React.FC = () => {

  // Cart starts empty; items are added dynamically when user clicks Add to Cart
  const [cart, setCart] = useState<CartItem[]>([]);

  const [selectedBranch, setSelectedBranch] = useState<'asaripallam' | 'rajakkamangalam'>('asaripallam');
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDeliveryType, setCheckoutDeliveryType] = useState<'pickup' | 'delivery'>('pickup');

  // Add item directly to cart
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.id === existing.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${item.id}`,
          menuItem: item,
          quantity: 1,
        },
      ];
    });
  };

  // Add item with custom add-ons & quantity from ProductDetailModal
  const handleAddToCartWithOptions = (
    item: MenuItem,
    quantity: number,
    addOns: AddOn[]
  ) => {
    setCart((prev) => [
      ...prev,
      {
        id: `cart-${Date.now()}-${item.id}`,
        menuItem: item,
        quantity,
        selectedAddOns: addOns,
      },
    ]);
    setIsCartOpen(true);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.id === cartItemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  // Remove single item
  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  // Clear all items
  const handleClearCart = () => {
    setCart([]);
  };

  // Open checkout modal
  const handleStartCheckout = (deliveryType: 'pickup' | 'delivery') => {
    setCheckoutDeliveryType(deliveryType);
    setIsCheckoutOpen(true);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fbf9f5] flex flex-col text-stone-900 font-sans">

      {/* Main Navbar */}
      <Navbar
        cartCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Page Routing */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                items={MENU_ITEMS}
                onSelectItemForDetail={(item) => setSelectedItemForDetail(item)}
                onQuickAdd={handleAddToCart}
              />
            }
          />
          <Route
            path="/order"
            element={
              <OrderPage
                items={MENU_ITEMS}
                cart={cart}
                branch={selectedBranch}
                setBranch={setSelectedBranch}
                onAddToCart={handleAddToCart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onSelectItemForDetail={(item) => setSelectedItemForDetail(item)}
                onCheckout={handleStartCheckout}
                onOpenCart={() => setIsCartOpen(true)}
              />
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        item={selectedItemForDetail}
        onClose={() => setSelectedItemForDetail(null)}
        onAddToCartWithOptions={handleAddToCartWithOptions}
      />

      {/* Cart Drawer / Flyout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckout={handleStartCheckout}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={MENU_ITEMS}
        onSelectItem={(item) => setSelectedItemForDetail(item)}
        onQuickAdd={handleAddToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        branch={selectedBranch}
        deliveryType={checkoutDeliveryType}
        onOrderSuccess={() => {
          setCart([]);
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
