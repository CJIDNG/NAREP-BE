import express from 'express';
import authRoutes from './authRoutes';
import fileRoutes from './fileRoutes';

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/files', fileRoutes);

export default router;
