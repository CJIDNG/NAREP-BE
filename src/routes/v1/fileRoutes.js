import express from 'express';
import multer from 'multer';

import {
  getFiles, getFilesByTag, searchFile, getFileBySlug, getSectors,
} from '../../controller/getFilesController';
import { uploadFile } from '../../controller/uploadFilesController';
import { downloadFile } from '../../controller/downloadFilesController';
import { updateFile } from '../../controller/updateFIlesController';
import { deleteFile } from '../../controller/deleteFileController';

import { verifyAdmin, verifyUser } from '../../middlewares/authorization';

import FileValidation from '../../middlewares/filesValidation';

const upload = multer({ dest: '/tmp/' });
const { uploadValidation } = FileValidation;

const router = express.Router();
router.post('/uploads', verifyUser, verifyAdmin, upload.single('file'), uploadValidation, uploadFile);

router.get('/', getFiles);
router.get('/sectors', getSectors);
router.get('/tags/:id', getFilesByTag);
router.get('/search/', searchFile);
router.get('/downloads', downloadFile);
router.get('/:slug', getFileBySlug);

router.put('/:slug', verifyUser, verifyAdmin, upload.single('file'), uploadValidation, updateFile);

router.delete('/:slug', verifyUser, verifyAdmin, deleteFile);

export default router;
