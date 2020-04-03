import express from 'express';
import authRoutes from './authRoutes';
import fileRoutes from './fileRoutes';
import adminRoutes from './adminRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/files', fileRoutes);
router.use('/admin', adminRoutes);

export default router;
