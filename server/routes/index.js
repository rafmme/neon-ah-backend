import { Router } from 'express';
import userRoutes from './api/user';

const routes = Router();

routes.use(userRoutes);

export default routes;
