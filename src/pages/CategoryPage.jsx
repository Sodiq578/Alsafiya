import React, { useState } from 'react';
import CardImg from '../assets/image.png';
import './HomePage.css';

const generateProducts = () => {
  const baseProducts = [
    { id: 1, title: "Palov Uzumli", price: "7500 UZS", image: CardImg, category: "Mevali" },
    { id: 2, title: "Somsa Go‘shtli", price: "5200 UZS", image: CardImg, category: "Go'shtli" },
    { id: 3, title: "Shashlik Qo‘ziqorinli", price: "9200 UZS", image: CardImg, category: "Sabzavotli" },
    // More products...
  ];

  return Array.from({ length: 50 }, (_, index) => {
    const base = baseProducts[index % baseProducts.length];
    return {
      id: index + 1,
      title: `${base.title} ${index + 1}`,
      price: base.price,
      image: base.image,
      category: base.category,
    };
  });
};

const ProductCard = ({ product }) => (
  <div className="card">
    <img src={product.image} alt={product.title} className="card-image" />
    <p className="price">{product.price}</p>
    <h3 className="card-title">{product.title}</h3>
  </div>
);

const CategoryPage = () => {
  const [products] = useState(generateProducts());

  const groupedProducts = products.reduce((groups, product) => {
    if (!groups[product.category]) groups[product.category] = [];
    groups[product.category].push(product);
    return groups;
  }, {});

  return (
    <div className="category-page">
      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className={`category-section ${category.toLowerCase()}`}>
          <h2 className="category-title">{category}</h2>
          <div className="card-container">
            {groupedProducts[category].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
