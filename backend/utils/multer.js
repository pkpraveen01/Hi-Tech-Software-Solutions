import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hi-tech-uploads',
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'docx'],
    resource_type: 'auto', // handles images, PDFs, etc.
  },
});

const upload = multer({ storage });

export default upload;
