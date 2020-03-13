import express from 'express';
import multer from 'multer';
import {
  getFiles, getFilesBySector, getFilesByTag, searchFile,
} from '../../controller/getFilesController';
import { uploadFile } from '../../controller/uploadFilesController';
import { downloadFile } from '../../controller/downloadFilesController';
import { verifyAdmin, verifyUser } from '../../middlewares/authorization';
import FileValidation from '../../middlewares/filesValidation';

const upload = multer({ dest: '/tmp/' });
const { uploadValidation } = FileValidation;

const router = express.Router();
router.post('/uploads', verifyUser, verifyAdmin, upload.single('file'), uploadValidation, uploadFile);
router.get('/', getFiles);
router.get('/sectors/:sectorId', getFilesBySector);
router.get('/tags/:id', getFilesByTag);
router.get('/search/', searchFile);
router.get('/downloads', verifyUser, downloadFile);

export default router;
