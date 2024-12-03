// LocationButton.jsx
import React, { useState } from 'react';
import LocationIcon from '../assets/location.svg';  // Ensure the path is correct

const LocationButton = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <button className="btn-location">
      <img src={LocationIcon} alt="Location Icon" />
      <span className="location-text">
        Ташкент, Мирзо Улугбек район, Карасув-3, улица Мингбулок, 38
      </span>
    </button>
  );
};

export default LocationButton;
