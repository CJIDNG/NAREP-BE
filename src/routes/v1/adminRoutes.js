import express from 'express';
import { updateUserRole, deleteUser, getAllUsers } from '../../controller/adminController';
import { verifyAdmin, verifyUser } from '../../middlewares/authorization';

const router = express.Router();
router.patch('/user/:email', verifyUser, verifyAdmin, updateUserRole);
router.delete('/user/:email', verifyUser, verifyAdmin, deleteUser);
router.get('/users', verifyUser, verifyAdmin, getAllUsers);
export default router;
