import { Router } from 'express';
import userRoutes from './api/user';
import authRoutes from './api/auth';

const routes = Router();

routes.use(userRoutes);
routes.use(authRoutes);

export default routes;
