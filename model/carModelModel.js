module.exports = (sequelize, Sequelize) => {
  const carModelModel = sequelize.define("carModel", {
    model: {
      type: Sequelize.STRING,
      field: 'model'
    },
    year: {
      type: Sequelize.INTEGER,
      field: 'year'
    },
    engine: {
      type: Sequelize.STRING,
      field: 'engine'
    },
  });

  return carModelModel;
};