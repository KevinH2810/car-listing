module.exports = (sequelize, Sequelize) => {
  const fuelModel = sequelize.define("fuel", {
    fuelName: {
      type: Sequelize.STRING,
      field: 'fuelName'
    },
  });

  return fuelModel;
};