import { Router } from 'express';
import userRoutes from './api/user';
import authRoutes from './api/auth';
import articleRoutes from './api/article';
import commentRoutes from './api/comment';
import likeRoutes from './api/likes';
import readStats from './api/readStats';
import reportArticleRoutes from './api/reportArticle';
import ratingRoutes from './api/rating';
import tagRoutes from './api/tag';
import bookmarkRoutes from './api/bookmark';

const routes = Router();

routes.use(userRoutes);
routes.use(authRoutes);
routes.use(articleRoutes);
routes.use(commentRoutes);
routes.use(likeRoutes);
routes.use(readStats);
routes.use(reportArticleRoutes);
routes.use(ratingRoutes);
routes.use(tagRoutes);
routes.use(bookmarkRoutes);

routes.all('*', (req, res) => {
  res.status(404).json({
    status: 'failure',
    data: {
      statusCode: 404,
      message: 'Route does not exist'
    }
  });
});

export default routes;
