import express from 'express';
import multer from 'multer';
import {
  uploadFile, getFiles, getFilesBySector, getFilesByTag, searchFile,
} from '../../controller/fileController';
import { verifyAdmin } from '../../middlewares/authorization';
import FileValidation from '../../middlewares/filesValidation';

const upload = multer({ dest: '/tmp/' });
const { uploadValidation } = FileValidation;

const router = express.Router();
router.post('/uploads', verifyAdmin, upload.single('file'), uploadValidation, uploadFile);
router.get('/', getFiles);
router.get('/sectors/:sectorId', getFilesBySector);
router.get('/tags/:id', getFilesByTag);
router.get('/search/', searchFile);

export default router;
