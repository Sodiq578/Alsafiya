import React from "react";
import "./OilCard.css";

const OilCard = () => {
  return (
    <div className="malumotlar">
      <h2 className="malumotlar__title">QORA SEDANA YO‘GI - TURKIYA MAHSULOTI</h2>
      <p className="malumotlar__subtitle">
        Hoziroq qo‘ng‘iroq qiling va <strong>BEPUL</strong> konsultatsiya oling
      </p>
      <ul className="malumotlar__list">
        <li className="malumotlar__item">
          <i className="fas fa-shield-alt"></i> Immunitetni mustahkamlaydi
        </li>
        <li className="malumotlar__item">
          <i className="fas fa-lungs"></i> O‘pka - bronx kasalliklarini oldini oladi
        </li>
        <li className="malumotlar__item">
          <i className="fas fa-heart"></i> Asab va yurak tizimi faoliyatini tiklaydi
        </li>
        <li className="malumotlar__item">
          <i className="fas fa-utensils"></i> Ovqat hazm qilish tizimini va tana teri holatini yaxshilaydi
        </li>
        <li className="malumotlar__item">
          <i className="fas fa-hair"></i> Sochlarni o‘stiradi va mustahkamlaydi
        </li>
        <li className="malumotlar__item">
          <i className="fas fa-tint"></i> Qondagi xolesterin miqdorini kamaytiradi
        </li>
      </ul>
    </div>
  );
};

export default OilCard;
