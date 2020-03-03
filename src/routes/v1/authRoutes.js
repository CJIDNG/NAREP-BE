import express from 'express';
import AuthController from '../../controller/authController';
import AuthValidation from '../../middlewares/authValidation';

const { signupValidation, signinValidation } = AuthValidation;

const { signUp, signIn } = AuthController;

const router = express.Router();
router.post('/signup', signupValidation, signUp);
router.post('/signin', signinValidation, signIn);


export default router;
