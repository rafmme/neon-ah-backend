import { Router } from 'express';
import UserController from '../../controllers/UserController';

const userRoutes = Router();

userRoutes.post('/auth/signup', UserController.signupUser);

export default userRoutes;
