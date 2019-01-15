import { Router } from 'express';
import UserController from '../../controllers/UserController';

const userRoutes = Router();

// userRoutes.post('/signup', UserController.signUp);
userRoutes.post('/auth/login', UserController.logIn);

export default userRoutes;
