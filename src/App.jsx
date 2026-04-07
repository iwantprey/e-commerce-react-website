import { useRef } from 'react';
import './styles/index.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SignUpForm from './components/SignUpForm.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import CartPage from './pages/CartPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import { gsap, useGSAP } from './lib/gsap.js';

function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  )
}

function App() {
  const appRef = useRef(null);
  const routeRef = useRef(null);
  const location = useLocation();

  useGSAP(() => {
    gsap.from('.appContainer', {
      autoAlpha: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  }, { scope: appRef });

  useGSAP(() => {
    if (!routeRef.current) return;

    gsap.fromTo(
      routeRef.current,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      },
    );
  }, { scope: routeRef, dependencies: [location.pathname], revertOnUpdate: true });

  return (
    <div className="appContainer" ref={appRef}>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <main ref={routeRef}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/signUp" element={<SignUpForm />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
        </CartProvider>
      </AuthProvider>

      <Footer />
    </div>
  );
}

export default App;
