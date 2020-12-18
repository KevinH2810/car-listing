module.exports = (sequelize, Sequelize) => {
  const brandModel = sequelize.define("brand", {
    brandName: {
      type: Sequelize.STRING,
      field: 'brandName'
    },
  });

  return brandModel;
};