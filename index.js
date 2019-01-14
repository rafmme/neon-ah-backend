import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
<<<<<<< HEAD
import auth from './server/routes/auth';
=======
>>>>>>> 2a3b93ce34e5901ba0fb9a36015d34ac959364e2

const swaggerDocument = YAML.load('swagger.yaml');
const app = express();
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
<<<<<<< HEAD

app.use('/api/v1/auth', auth);

app.get('/', (req, res) => {
  res.status(200).json("Welcome to Authors' Haven");
=======
app.get('/', (req, res) => {
  res.status(200).json('Welcome to Todos');
>>>>>>> 2a3b93ce34e5901ba0fb9a36015d34ac959364e2
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server started on ${port}`);
});
