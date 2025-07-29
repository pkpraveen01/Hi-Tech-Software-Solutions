import dotenv from 'dotenv';
dotenv.config(); // ✅ Loads .env before anything else

import Contact from '../models/Contact.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';
import nodemailer from 'nodemailer';


export const submitContactForm = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      budget,
      projectType,
      contactMethod,
    } = req.body;

    let fileUrl = '';
    let fileName = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      fileUrl = result.secure_url;
      fileName = req.file.originalname;
      fs.unlinkSync(req.file.path); // Clean up local file
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      budget,
      projectType,
      contactMethod,
      fileUrl,
    });

    await newContact.save();

    // Create transporter for email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Admin notification email
    const adminMailOptions = {
      from: `"Hi-Tech Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      html: `
        <h3>New Contact Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Contact Method:</strong> ${contactMethod}</p>
        <p><strong>Message:</strong><br/>${message}</p>
        ${fileUrl ? `<p><strong>File Uploaded:</strong> <a href="${fileUrl}" target="_blank">${fileName}</a></p>` : ''}
      `,
    };

    // User confirmation email
    const userMailOptions = {
      from: `"Hi-Tech Software Solutions" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting Hi-Tech Software Solutions!',
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for contacting us. We have received your message and will reach out to you shortly.</p>
        <p><strong>Your Message:</strong></p>
        <blockquote>${message}</blockquote>
        <p>Best Regards,<br/>Hi-Tech Software Solutions Team</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(201).json({ message: 'Message sent and emails delivered successfully.' });
  } catch (error) {
    console.error('Error in contact form:', error.message);
    res.status(500).json({ message: 'Server Error. Try again later.' });
  }
};
