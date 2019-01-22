import { Router } from 'express';
import userRoutes from './api/user';
import authRoutes from './api/auth';
import articleRoutes from './api/article';

const routes = Router();

routes.use(userRoutes);
routes.use(authRoutes);
routes.use(articleRoutes);

export default routes;
