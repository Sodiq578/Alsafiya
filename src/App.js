import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import HomePage from './pages/HomePage';
import BasketPage from './pages/BasketPage';
import CategoryPage from './pages/CategoryPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import './index.css';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
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

  return showSplash ? (
    <SplashScreen />
  ) : (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              userLocation={location}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
        <Route
          path="/categories"
          element={
            <CategoryPage
              userLocation={location}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
        <Route
          path="/profile"
          element={<ProfilePage location={location} />}
        />
        <Route
          path="/basket"
          element={
            <BasketPage
              cartItems={cartItems}
              onRemove={(id) =>
                setCartItems(cartItems.filter((item) => item.id !== id))
              }
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
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
