import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="top_header">
        
        <section>
          <span>
            <i className="fa fa-phone"></i>
          </span>
          <a href="tel:+998555000205">(55) 500 02 05</a>
        </section>
       
      </div>
      <span className="border-shape"></span>
      <div className="bottom_content">
        <section className="footer-box">
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa fa-telegram"></i>
          </a>
        </section>
        <section>
          <a href="#">Home</a>
          <a href="#">About us</a>
          <a href="#">Order</a>
          <a href="#">Retail</a>
          <a href="#">Member</a>
          <a href="#">Contact Us</a>
        </section>
      </div>
      <div className="copyright">
        Copyright © 2021 websitename - All rights reserved
      </div>
    </footer>
  );
}
