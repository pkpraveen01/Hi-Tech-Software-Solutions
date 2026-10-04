import React from 'react';
import './About.css';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const About = () => {
  return (
    <>
      <section className="about-section">
        <div className="about-container">

          <div className="about-text">

            <h2 className="about-title">
              About Me
            </h2>

            <p className="about-description">
              Hello! I’m <strong>Praveen Kumar</strong>, a
              <strong> Software Engineer, Educator, and Civil Services Aspirant</strong>
              from Bihar. I have completed my
              <strong> B.Tech in Computer Science</strong> and have a strong
              interest in technology, education, and continuous learning.
            </p>

            <p className="about-description">
              As a <strong>Software Engineer</strong>, I enjoy designing and
              developing modern websites and software solutions that are
              practical, user-friendly, and reliable. I work with technologies
              such as <strong>React, JavaScript, Node.js, Express, MongoDB</strong>,
              and other modern web-development tools.
            </p>

            <p className="about-description">
              Along with software development, I have around
              <strong> 2 years of teaching experience</strong>. I have taught
              students up to Class 12 and have worked with subjects including
              <strong> Social Science, Physics, and Mathematics</strong>.
              Teaching has helped me develop strong communication, presentation,
              and problem-solving skills.
            </p>

            <p className="about-description">
              I am also preparing for the
              <strong> Civil Services Examination</strong>. My journey combines
              technology, education, and public-service aspirations. Through
              Hi-Tech Software Solutions, my aim is to use technology to create
              useful digital solutions and make learning resources more
              accessible to students.
            </p>

            <div className="about-values">
              <h3>What I Believe In</h3>

              <ul>
                <li>✔️ Continuous Learning</li>
                <li>✔️ Technology for Practical Solutions</li>
                <li>✔️ Quality Education</li>
                <li>✔️ Honest & Transparent Work</li>
                <li>✔️ Innovation & Improvement</li>
              </ul>
            </div>

            {/* Contact Info */}

            <div className="contact-info">

              <h3>Get in Touch</h3>

              <p>
                <FaPhoneAlt className="icon" />
                Phone:
                <a href="tel:+917260019502">
                  +91 72600 19502
                </a>
              </p>

              <p>
                <FaWhatsapp className="icon" />
                WhatsApp:
                <a
                  href="https://wa.me/917260019502"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </p>

              <p>
                Email:
                <a href="mailto:hitechsoftwarepatna@gmail.com">
                  hitechsoftwarepatna@gmail.com
                </a>
              </p>

            </div>

          </div>

          <div className="about-image">

            <img
              src="/praveen-kumar.png"
              alt="Praveen Kumar - Software Engineer and Educator"
            />

          </div>

        </div>
      </section>

      {/* Floating WhatsApp Button */}

      <a
        href="https://wa.me/917260019502"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="whatsapp-icon" />
      </a>
    </>
  );
};

export default About;