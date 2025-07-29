import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Company Info */}
        <div className="footer-section about">
          <h3>Hi-Tech Software Solutions</h3>
          <p>
            Empowering businesses with innovative web and mobile solutions. We
            build fast, secure, and scalable applications tailored to your goals.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: hitechsoftwarepatna@gmail.com</p>
          <p>Phone: +91 7260019502</p>
          <p>Location: Patna, Bihar, India</p>
        </div>

        {/* Social */}
        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Hi-Tech Software Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
