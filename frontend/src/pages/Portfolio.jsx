import React from 'react';
import './Portfolio.css';

const projects = [
  {
    id: 1,
    title: 'Hi-Tech Hospital',
    description: 'A full-featured hospital management system for patients and administrators.',
    url: 'https://hi-tech-hospital.onrender.com/',
    image: '/hi-tech.png',
  },
  {
    id: 2,
    title: 'Surya Vision Electronics Mall',
    description: 'An electronics e-commerce platform inspired by Aditya Vision with admin dashboard.',
    url: 'https://surya-vision.onrender.com/',
    image: '/surya-vision.png',
  },
  {
    id: 3,
    title: 'Gym Website',
    description: 'A modern fitness platform with plans, bookings, Stripe payment, and more.',
    url: 'https://gym-app-6-8cxv.onrender.com/',
    image: '/gym-app.png',
  },
];

const Portfolio = () => {
  return (
    <section className="portfolio-section">
      <h2 className="portfolio-title">Our Portfolio</h2>
      <p className="portfolio-subtitle">Explore some of the innovative projects we've built recently:</p>
      <div className="portfolio-grid">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-card"
          >
            <img src={project.image} alt={project.title} className="portfolio-image" />
            <div className="portfolio-info">
              <h4 className="portfolio-project-title">{project.title}</h4>
              <p className="portfolio-description">{project.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
