import express from 'express';
import multer from 'multer';
import { uploadFile } from '../../controller/fileController';
import { verifyAdmin } from '../../middlewares/authorization';

const upload = multer({ dest: '/tmp/' });


const router = express.Router();
router.post('/uploads', verifyAdmin, upload.single('file'), uploadFile);

export default router;
