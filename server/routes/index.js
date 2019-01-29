import { Router } from 'express';
import userRoutes from './api/user';
import authRoutes from './api/auth';
import articleRoutes from './api/article';
import commentRoutes from './api/comment';
import likeRoutes from './api/likes';
import readStats from './api/readStats';
import reportArticleRoutes from './api/reportArticle';

const routes = Router();

routes.use(userRoutes);
routes.use(authRoutes);
routes.use(articleRoutes);
routes.use(commentRoutes);
routes.use(likeRoutes);
routes.use(readStats);
routes.use(reportArticleRoutes);

export default routes;
