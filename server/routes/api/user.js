import { Router } from 'express';
import UserController from '../../controllers/UserController';

const userRoutes = Router();

userRoutes.post('/password/forgot', UserController.forgotPassword);

userRoutes.post('/password/reset/:token', UserController.passwordReset);

export default userRoutes;
