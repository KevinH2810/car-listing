module.exports = (sequelize, Sequelize) => {
  const availabilityModel = sequelize.define("availability", {
    date: {
      type: Sequelize.DATE,
      field: 'date'
    },
    status: {
      type: Sequelize.INTEGER,
      field: 'status'
    }
  });

  return availabilityModel;
};

