import React from 'react';
import { useLocation } from 'react-router-dom';
import './BasketPage.css';

const BasketPage = () => {
  const location = useLocation();
  const { cartItems } = location.state || {}; // Get cart items passed through state

  return (
    <div className="basket-page">
      <h1>Your Basket</h1>
      <div className="basket-items">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="basket-item">
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default BasketPage;
