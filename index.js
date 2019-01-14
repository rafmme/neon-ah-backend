import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import routes from './server/routes/api/user';

const swaggerDocument = YAML.load('swagger.yaml');
const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(require('morgan')('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.send("Welcome to Author's Haven");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server started on ${port}`);
});
