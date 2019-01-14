module.exports = (sequelize, DataTypes) => {
  const Articletag = sequelize.define('Articletag', {
    articleid: DataTypes.INTEGER,
    tagid: DataTypes.INTEGER
  }, {});
  return Articletag;
};
