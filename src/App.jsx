
import './styles/index.css';
import { Link, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SignUpForm from './components/SignUpForm.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './components/LoginPage.jsx';
import ProductPage from './components/ProductPage.jsx';
import ShopPage from './components/ShopPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';

function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  )
}

function App() {
  return (
    <div className="appContainer">
      <AuthProvider>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signUp" element={<SignUpForm />} />
            <Route path="*" element={<HomePage />} />
        </Routes>
      </AuthProvider>

      <Footer />
    </div>
  );
}

export default App;