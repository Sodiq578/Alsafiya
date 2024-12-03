import React from 'react';
import './BasketPage.css';

const BasketPage = ({ cartItems, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="basket-page">
      <h1 className="basket-title">Savatchangiz</h1>
      {cartItems.length === 0 ? (
        <p className="empty-basket">Savatcha bo'sh.</p>
      ) : (
        <div className="basket-items">
          {cartItems.map(item => (
            <div key={item.id} className="basket-card">
              <button className="delete-button" onClick={() => onRemove(item.id)}>
                ×
              </button>
              <img src={item.image} alt={item.title} className="product-image" />
              <h3 className="product-title">{item.title}</h3>
              {/* Mahsulotning narxini va miqdorini ko'rsatish */}
              <p className="product-price">
                {item.quantity > 1
                  ? `${parseInt(item.price.replace(' UZS', '').replace(',', '')) * item.quantity} UZS`
                  : item.price}  
              </p>
              <div className="quantity-controls">
                <button className="quantity-button" onClick={() => onDecrease(item.id)}>
                  −
                </button>
                <span className="quantity">{item.quantity}</span>
                <button className="quantity-button" onClick={() => onIncrease(item.id)}>
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BasketPage;
