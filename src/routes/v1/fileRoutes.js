import express from 'express';
import multer from 'multer';
import { uploadFile } from '../../controller/fileController';
import { verifyAdmin } from '../../middlewares/authorization';
import FileValidation from '../../middlewares/filesValidation';

const upload = multer({ dest: '/tmp/' });
const { uploadValidation } = FileValidation;

const router = express.Router();
router.post('/uploads', verifyAdmin, upload.single('file'), uploadValidation, uploadFile);

export default router;
