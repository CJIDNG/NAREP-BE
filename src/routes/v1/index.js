import express from 'express';
import authRoutes from './authRoutes';
import datasetsRoutes from './datasetsRoutes';
import adminRoutes from './adminRoutes';
import policyPaperRoutes from './policyPaper';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/files', datasetsRoutes);
router.use('/admin', adminRoutes);
router.use('/policy-paper', policyPaperRoutes);

export default router;
