import { Router } from 'express';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import ReadingStatsContoller from '../../controllers/ReadingStatsController';

const readingStatsRoute = Router();

readingStatsRoute.get(
  '/stats',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ReadingStatsContoller.getReadingStats
);
export default readingStatsRoute;
