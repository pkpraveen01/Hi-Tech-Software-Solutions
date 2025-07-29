import React from 'react';
import './About.css';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const About = () => {
  return (
    <>
      <section className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2 className="about-title">Who We Are</h2>
            <p className="about-description">
              At <strong>Hi-Tech Software Solutions</strong>, we are a team of passionate technologists, creative designers, and expert engineers with a mission to build transformative digital products. 
              With over <strong>5 years of industry experience</strong>, we’ve partnered with startups, SMEs, and global enterprises to deliver scalable web and mobile applications.
            </p>
            <p className="about-description">
              From <strong>custom software development</strong> to <strong>cloud-native solutions</strong>, we thrive on solving complex business challenges using the latest technologies like MERN Stack, Next.js, AWS, Docker, and beyond.
            </p>

            <div className="about-values">
              <h3>Our Core Values</h3>
              <ul>
                <li>✔️ Client-First Approach</li>
                <li>✔️ Innovation & Excellence</li>
                <li>✔️ Transparency & Integrity</li>
                <li>✔️ Continuous Learning</li>
                <li>✔️ Agile Collaboration</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <h3>Contact Us</h3>
              <p><FaPhoneAlt className="icon" /> Phone: <a href="tel:+917260019502">+91 72600 19502</a></p>
              <p><FaWhatsapp className="icon" /> WhatsApp: <a href="https://wa.me/917260019502" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></p>
              <p>Email: <a href="mailto: hitechsoftwarepatna@gmail.com"> hitechsoftwarepatna@gmail.com</a></p>
            </div>
          </div>

          <div className="about-image">
            <img src="/team-photo.jpg" alt="Our Team at Work" />
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917260019502"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className="whatsapp-icon" />
      </a>
    </>
  );
};

export default About;
