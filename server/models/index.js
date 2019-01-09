import { readdirSync } from 'fs';
import { basename as baseName, join } from 'path';
import Sequelize from 'sequelize';
import config from '../config/config';

const basename = baseName(__filename);
const env = process.env.NODE_ENV || 'development';

const db = {};

const sequelize = new Sequelize(config[env]);

readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
