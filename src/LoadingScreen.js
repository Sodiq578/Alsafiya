import React from "react";
import "./LoadingScreen.css";
import HomeImg from "./assets/Home.png"; // Tasvirni to'g'ri import qilish

const LoadingScreen = () => {
  return (
    <div
      className="loading-screen"
      style={{
        backgroundImage: `url(${HomeImg})`,  // Tasvir yo'lini dinamik ulash
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw"
      }}
    >
    </div>
  );
};

export default LoadingScreen;
