// import 'babel-polyfill';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import YAML from 'yamljs';
import expressValidator from 'express-validator';
import routes from './server/routes';
import googleStrategy from './server/config/passportConfigs/googleStrategy';
import facebookStrategy from './server/config/passportConfigs/facebookStragegy';
import linkedinStrategy from './server/config/passportConfigs/linkednStrategy';

const swaggerDocument = YAML.load('swagger.yaml');
const app = express();
app.use(express.json());
app.use(expressValidator());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

passport.use(googleStrategy);
passport.use(facebookStrategy);
passport.use(linkedinStrategy);
app.use(passport.initialize());

app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.status(200).json("Welcome to Authors' Haven");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server started on ${port}`);
});

export default app;
