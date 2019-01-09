import dotenv from 'dotenv';

dotenv.config();

export default {
  development: process.env.DATABASE_URL_DEV,
  test: process.env.DATABASE_URL_TEST,
  production: process.env.DATABASE_URL
};
