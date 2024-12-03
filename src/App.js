import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import PhoneAuth from './pages/PhoneAuth';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import BasketPage from './pages/BasketPage';
import CategoryPage from './pages/CategoryPage'; // Import CategoryPage
import Navbar from './components/Navbar';
import './index.css';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [phone, setPhone] = useState(localStorage.getItem('userPhone') || null);
  const [location, setLocation] = useState(localStorage.getItem('userLocation') || '');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLogin = (phoneNumber) => {
    setPhone(phoneNumber);
    localStorage.setItem('userPhone', phoneNumber);
  };

  return showSplash ? (
    <SplashScreen />
  ) : (
    <Router>
      {phone && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            phone ? (
              <Navigate to="/home" />
            ) : (
              <PhoneAuth onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/home"
          element={
            phone ? (
              <HomePage
                userLocation={location}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/categories" // Corrected path
          element={
            phone ? (
              <CategoryPage
                userLocation={location}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            phone ? (
              <ProfilePage phone={phone} location={location} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/basket"
          element={
            phone ? (
              <BasketPage
                cartItems={cartItems}
                onRemove={(id) => setCartItems(cartItems.filter((item) => item.id !== id))}
                onIncrease={(id) =>
                  setCartItems(
                    cartItems.map((item) =>
                      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                  )
                }
                onDecrease={(id) =>
                  setCartItems(
                    cartItems.map((item) =>
                      item.id === id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                    )
                  )
                }
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
