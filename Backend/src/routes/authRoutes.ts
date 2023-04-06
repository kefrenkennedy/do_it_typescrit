import { Router } from 'express';
import authController from '../controllers/authController';
import { loginValidation } from '../validations/loginValidation';

const authRotes = Router();

authRotes.post('/', loginValidation, authController.login);

export default authRotes;
