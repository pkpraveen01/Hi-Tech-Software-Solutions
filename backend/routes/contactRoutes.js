import express from 'express';
import multer from 'multer';
import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), submitContactForm);

export default router;
