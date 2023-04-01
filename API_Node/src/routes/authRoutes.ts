import { Router } from 'express';
import authController from '../controllers/authController';

const authRotes = Router();

authRotes.post('/', authController.login);

export default authRotes;
