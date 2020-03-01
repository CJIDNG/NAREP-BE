import express from 'express';
import AuthController from '../../controller/authController';
import AuthValidation from '../../middlewares/authValidation';

const { signupValidation } = AuthValidation;

const { signUp } = AuthController;

const router = express.Router();
router.post('/signup', signupValidation, signUp);

export default router;
