import express from 'express';

import upload from '../middleware/upload.js';

import {
  uploadMaterial,
  getMaterials,
  getMaterialsByClass,
  viewMaterial,
  downloadMaterial,
  deleteMaterial,
} from '../controllers/materialController.js';

const router = express.Router();

router.post(
  '/upload',
  upload.single('pdf'),
  uploadMaterial
);

router.get(
  '/',
  getMaterials
);

router.get(
  '/class/:className',
  getMaterialsByClass
);

router.get(
  '/view/:id',
  viewMaterial
);

router.get(
  '/download/:id',
  downloadMaterial
);

router.delete(
  '/:id',
  deleteMaterial
);

export default router;