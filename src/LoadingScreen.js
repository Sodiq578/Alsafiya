import React from "react";
import "./LoadingScreen.css";
import HomeImg from "./assets/Home.png"; // Correct image import

const LoadingScreen = () => {
  return (
    <div
      className="loading-screen"
      style={{
        backgroundImage: `url(${HomeImg})`,  // Dynamically set background image
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
