import React, { useEffect } from 'react';
import './Services.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FaLaptopCode,
  FaMobileAlt,
  FaPencilRuler,
  FaCloud,
  FaServer,
  FaShieldAlt,
} from 'react-icons/fa';

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const services = [
    {
      icon: <FaLaptopCode />,
      title: 'Web Development',
      description:
        'We build scalable, modern web applications using React, Next.js, Node.js, and MongoDB. From landing pages to complex dashboards, we’ve done it all.',
      image: '/services1.jpg',
    },
    {
      icon: <FaMobileAlt />,
      title: 'Mobile App Development',
      description:
        'Our team creates high-performance iOS and Android apps using Flutter and React Native. One codebase, two platforms, all optimized.',
      image: '/service2.jpeg',
    },
    {
      icon: <FaPencilRuler />,
      title: 'UI/UX Design',
      description:
        'We design intuitive, user-friendly interfaces that increase engagement and user satisfaction. Tools: Figma, Adobe XD, and InVision.',
      image: '/service3.jpg',
    },
    {
      icon: <FaCloud />,
      title: 'Cloud Integration',
      description:
        'We offer secure and seamless integration with AWS, Firebase, and other cloud providers for storage, hosting, and computing.',
      image: '/service4.webp',
    },
    {
      icon: <FaServer />,
      title: 'Backend Development',
      description:
        'Robust, fast, and secure backends using Node.js, Express, and MongoDB. We ensure smooth performance at scale.',
      image: '/service6.webp',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Security & Maintenance',
      description:
        'Regular audits, real-time monitoring, and best practices to keep your product secure and up-to-date.',
      image: '/service7.jpg',
    },
  ];

  return (
    <div className="services-container">
      {/* Hero Section */}
      <section className="hero-services">
        <h1>Professional Software Development Services</h1>
        <p>
          From design to deployment — we help businesses build scalable, modern software solutions
          tailored to your goals.
        </p>
      </section>

      {/* Services Intro */}
      <section className="services-intro" data-aos="fade-up">
        <h2>What We Offer</h2>
        <p>
          Our full-stack development team specializes in crafting digital solutions using modern
          technologies, optimized for performance, usability, and security.
        </p>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index} data-aos="fade-up">
              <img src={service.image} alt={service.title} className="service-image" />
              <div className="service-content">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Section */}
      <section className="technology-section" data-aos="zoom-in">
        <h2>Technologies We Use</h2>
        <p>Modern tech stack built for speed, scale, and security.</p>
        <div className="tech-tags">
          <span>React</span>
          <span>Node.js</span>
          <span>Express</span>
          <span>MongoDB</span>
          <span>Next.js</span>
          <span>Firebase</span>
          <span>Flutter</span>
          <span>AWS</span>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us" data-aos="fade-left">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✅ 100% Custom-Built Solutions</li>
          <li>✅ Agile Development with Weekly Demos</li>
          <li>✅ SEO & Performance Optimized</li>
          <li>✅ Post-Launch Support & Maintenance</li>
          <li>✅ Transparent Communication & Pricing</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="cta-section" data-aos="fade-up">
        <h2>Ready to Start Your Project?</h2>
        <p>Let’s build something amazing together. Contact us for a free consultation.</p>
        <a href="/contact" className="cta-button">
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default Services;
