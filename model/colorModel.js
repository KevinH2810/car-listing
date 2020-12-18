module.exports = (sequelize, Sequelize) => {
  const colorModel = sequelize.define("color", {
    colorName: {
      type: Sequelize.STRING,
      field: 'colorName'
    },
  });

  return colorModel;
};