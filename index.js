import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('swagger.yaml');
const app = express();
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
  res.status(200).json('Welcome to Todos');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server started on ${port}`);
});
