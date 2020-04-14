import express from 'express';
import multer from 'multer';

import { createPolicyPaper } from '../../controller/policyPapers/createPolicyPaper';
import { updatePolicyPaper } from '../../controller/policyPapers/updatePolicyPaper';
import { getPolicyPapers } from '../../controller/policyPapers/getPolicyPaper';
import { deletePolicyPaper } from '../../controller/policyPapers/deletePolicyPaper';

import { downloadPolicyPaper } from '../../controller/policyPapers/downloadPolicyPaper';

import { verifyAdmin, verifyUser } from '../../middlewares/authorization';

const upload = multer({ dest: '/tmp/' });
const router = express.Router();

router.post('/uploads', verifyUser, verifyAdmin, upload.single('file'), createPolicyPaper);

router.post('/:slug', verifyUser, verifyAdmin, upload.single('file'), updatePolicyPaper);

router.get('/', getPolicyPapers);
router.get('/downloads', downloadPolicyPaper);

router.delete('/:slug', verifyUser, verifyAdmin, deletePolicyPaper);

export default router;
