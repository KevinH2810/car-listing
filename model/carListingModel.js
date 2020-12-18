module.exports = (sequelize, Sequelize) => {
  const carListingModel = sequelize.define("carListing", {
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

  return carListingModel;
};