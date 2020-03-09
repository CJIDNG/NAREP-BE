import express from 'express';
import { signUp, signIn } from '../../controller/authController';
import AuthValidation from '../../middlewares/authValidation';

const { signupValidation, signinValidation } = AuthValidation;

const router = express.Router();
router.post('/signup', signupValidation, signUp);
router.post('/signin', signinValidation, signIn);


export default router;
