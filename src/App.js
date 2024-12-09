import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import BasketPage from "./pages/BasketPage";
import CategoryPage from "./pages/CategoryPage";
import ForPage from "./pages/ForPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px dan kichik ekranlar mobil hisoblanadi
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  if (!isMobile) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "20%",
          fontSize: "24px",
          color: "red",
        }}
      >
        Ushbu sayt faqat mobil qurilmalarda ishlaydi.
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={<HomePage />}
        />
        <Route
          path="/basket"
          element={<BasketPage />}
        />
        <Route path="/categories" element={<CategoryPage />} />
        <Route
          path="/product/:id"
          element={<ForPage />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
