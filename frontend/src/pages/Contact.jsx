import { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    budget: '',
    projectType: '',
    contactMethod: '',
  });

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (file) data.append('file', file);

    try {
      const res = await axios.post('https://hi-tech-software-solutions-14na.onrender.com/api/contact', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus({ type: 'success', message: res.data.message || 'Message sent successfully!' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        budget: '',
        projectType: '',
        contactMethod: '',
      });
      setFile(null);
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong. Try again later.' });
    }
  };

  return (
    <section className="contact-section">
      <h2 className="contact-heading" data-aos="fade-down">Get In Touch</h2>
      <form onSubmit={handleSubmit} className="contact-form" data-aos="fade-up">
        <div className="form-grid">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Project Type</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Website">Website</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Admin Dashboard">Admin Dashboard</option>
               <option value="Mobile Application">Mobile Application</option>
                <option value="UI/UX DESIGN">UI/UX DESIGN</option>
                 <option value="Start-Up Website">Start-Up Website</option>
                  <option value="Bussiness Website">Bussiness Website</option>
                   <option value="Educational Website">Educational website</option>
             
              <option value="SPA">Single Page Application</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* <div>
            <label>Budget</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g. ₹10,000 - ₹100,000"
            />
          </div> */}
        </div>

        <div>
          <label>Preferred Contact Method</label>
          <select
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
        </div>

        <div>
          <label>Message</label>
          <textarea
            name="message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label>Upload File (optional)</label>
          <input
            type="file"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Submit Inquiry</button>

        {status && (
          <p className={`form-status ${status.type === 'success' ? 'success' : 'error'}`}>
            {status.message}
          </p>
        )}
      </form>
    </section>
  );
};

export default Contact;
