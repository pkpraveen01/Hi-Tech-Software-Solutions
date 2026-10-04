
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Hi-Tech Software Solutions. All Rights Reserved.
      </p>

      <p className="footer-credit">
        Designed and Developed by <strong>Er. Praveen Kumar</strong>
      </p>
    </footer>
  );
};

export default Footer;

