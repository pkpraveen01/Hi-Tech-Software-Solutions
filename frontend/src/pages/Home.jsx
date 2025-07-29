import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const [counter, setCounter] = useState({ clients: 0, projects: 0, countries: 0 });
  const titleRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Typewriter animation
    const text = "Welcome to Hi-Tech Software Solutions";
    let index = 0;
    const interval = setInterval(() => {
      if (titleRef.current && index < text.length) {
        titleRef.current.textContent += text[index++];
      } else {
        clearInterval(interval);
      }
    }, 70);

    // Animated Counters
    const intervalId = setInterval(() => {
      setCounter(prev => {
        const next = { ...prev };
        if (next.clients < 120) next.clients += 2;
        if (next.projects < 75) next.projects += 1;
        if (next.countries < 15) next.countries += 1;
        return next;
      });
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="home-section">
      <div className="overlay">
        <div className="home-content">
          <h1 className="home-title" ref={titleRef}></h1>
          <p className="home-subtitle">
            Powering businesses through full-stack web and mobile app development.
          </p>
          {/* <a href="/contact" className="home-button">Let's Talk</a> */}
        </div>
        {/* Floating SVG shapes */}
        <div className="floating-shapes">
          <span className="circle"></span>
          <span className="triangle"></span>
          <span className="square"></span>
        </div>
      </div>

      {/* Achievements */}
      <div className="section achievements" data-aos="fade-up">
        <h2>Our Achievements</h2>
        <div className="counter-grid">
          <div className="counter-item">
            <h3>{counter.clients}+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="counter-item">
            <h3>{counter.projects}+</h3>
            <p>Completed Projects</p>
          </div>
          <div className="counter-item">
            <h3>{counter.countries}+</h3>
            <p>Countries Served</p>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="section services" data-aos="fade-up">
        <h2>Our Services</h2>
        <div className="service-grid">
          <div className="service-card">
            <h3>Custom Web Development</h3>
            <p>Robust web apps with React, Node.js, MongoDB tailored for your business.</p>
          </div>
          <div className="service-card">
            <h3>Mobile App Development</h3>
            <p>High-performing iOS & Android apps using React Native and Flutter.</p>
          </div>
          <div className="service-card">
            <h3>Cloud & DevOps</h3>
            <p>CI/CD pipelines, Docker, Kubernetes, and scalable cloud infrastructure.</p>
          </div>
        </div>
      </div>

      {/* Industries */}
      <div className="section industries" data-aos="fade-right">
        <h2>Industries We Serve</h2>
        <ul className="industry-list">
          <li>🏥 Healthcare</li>
          <li>🏦 Finance & Banking</li>
          <li>🎓 Education</li>
          <li>🛒 E-commerce</li>
          <li>🚗 Automotive</li>
          <li>📱 Social Media</li>
        </ul>
      </div>

     {/* Portfolio */}
<div className="section portfolio" data-aos="fade-left">
  <h2>Our Recent Projects</h2>
  <div className="portfolio-grid">
    <a
      href="https://gym-app-6-8cxv.onrender.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="portfolio-item"
    >
      <img src="/gym-app.png" alt="Gym Website" />
      <p>Gym Website – Fitness Platform</p>
    </a>

    <a
      href="https://surya-vision.onrender.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="portfolio-item"
    >
      <img src="/surya-vision.png" alt="Surya Vision E-commerce" />
      <p>Surya Vision – E-commerce Web App</p>
    </a>

    <a
      href="https://hi-tech-hospital.onrender.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="portfolio-item"
    >
      <img src="/hi-tech.png" alt="Hospital Management System" />
      <p>Hi-Tech Hospital – Management System</p>
    </a>
  </div>
</div>


      {/* Testimonials */}
      <div className="section testimonials" data-aos="zoom-in">
        <h2>What Our Clients Say</h2>
        <div className="testimonial">
          <p>“Hi-Tech helped us launch our SaaS platform in record time. Amazing team!”</p>
          <h4>– Rahul Mehra, CEO at EduPro</h4>
        </div>
        <div className="testimonial">
          <p>“We saw a 50% increase in conversions after Hi-Tech redesigned our app.”</p>
          <h4>– Anjali Singh, Marketing Head at QuickCart</h4>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="section tech-stack" data-aos="fade-up">
        <h2>Technologies We Work With</h2>
        <p>MERN • Next.js • Firebase • AWS • Docker • GraphQL • Stripe • GitHub Actions</p>
      </div>

      {/* Call to Action */}
      <div className="section cta" data-aos="fade-up">
        <h2>Ready to Start Your Project?</h2>
        <p>Let’s discuss your requirements and turn your ideas into reality.</p>
        <a href="/contact" className="home-button">Get In Touch</a>
      </div>

      {/* WhatsApp and Call Floating Buttons */}
      <div className="floating-contact-buttons">
        <a
          href="https://wa.me/917260019502"
          className="whatsapp-button"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
        >
          <img src="/whatsapp-icon.png" alt="WhatsApp" />
        </a>
        <a
          href="tel:+917260019502"
          className="call-button"
          title="Call Now"
        >
          <img src="/call-icon.png" alt="Call" />
        </a>
      </div>
    </section>
  );
};

export default Home;
