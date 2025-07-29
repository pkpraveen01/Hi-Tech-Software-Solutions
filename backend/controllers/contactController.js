import Contact from '../models/Contact.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

export const submitContactForm = async (req, res) => {
  try {
    const {
      name, email, phone, subject,
      message, budget, projectType, contactMethod
    } = req.body;

    let fileUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      fileUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // Clean up local file
    }

    const newContact = new Contact({
      name, email, phone, subject,
      message, budget, projectType, contactMethod,
      fileUrl,
    });

    await newContact.save();
    res.status(201).json({ message: 'Message sent successfully' });

  } catch (error) {
    console.error('Error in contact form:', error.message);
    res.status(500).json({ message: 'Server Error. Try again later.' });
  }
};
