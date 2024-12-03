import React, { useState } from 'react';
import './ProfilePage.css';

export default function ProfilePage() {
  const [location, setLocation] = useState(localStorage.getItem('userLocation') || '');
  const [error, setError] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSaveLocation = () => {
    if (location.trim()) {
      localStorage.setItem('userLocation', location);
      alert('Manzil saqlandi!');
    } else {
      setError('Manzilni kiriting.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Profilingiz</h2>
      <label>
        Manzil:
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Manzilni kiriting"
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button className="save-button" onClick={handleSaveLocation}>
        Saqlash
      </button>
    </div>
  );
}
