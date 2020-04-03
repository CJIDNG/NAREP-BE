import express from 'express';
import { updateUserRole, deleteUser, getAllUsers } from '../../controller/adminController';

const router = express.Router();
router.patch('/user/:email', updateUserRole);
router.delete('/user/:email', deleteUser);
router.get('/users', getAllUsers);
export default router;
