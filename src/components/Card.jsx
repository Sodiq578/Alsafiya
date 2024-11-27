import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './Card.css';

const Card = () => {
  return (
    <div className="card">
      <div className="card-image">
        <img src="https://via.placeholder.com/191x182" alt="Product" />
        <div className="basket-icon">
          <ShoppingCartOutlined />
        </div>
      </div>
      <div className="card-content">
        <h3>5 000 UZS</h3>
        <p>Gumma Kartoshkali</p>
      </div>
    </div>
  );
};

export default Card;
