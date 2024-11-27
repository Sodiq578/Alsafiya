import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import BasketPage from './pages/BasketPage';
import ProfilePage from './pages/ProfilePage';
import './index.css';

const App = () => {
  const [cartItems, setCartItems] = useState([]); // Savat uchun state

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={<HomePage setCartItems={setCartItems} />} 
        />
        <Route 
          path="/categories" 
          element={<CategoryPage />} 
        />
        <Route 
          path="/basket" 
          element={<BasketPage cartItems={cartItems} />} 
        />
        <Route 
          path="/profile" 
          element={<ProfilePage />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
