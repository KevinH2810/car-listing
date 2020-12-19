module.exports = (sequelize, Sequelize) => {
  const availabilityModel = sequelize.define("availability", {
    date: {
      type: Sequelize.DATEONLY,
      field: 'date'
    },
    status: {
      type: Sequelize.INTEGER,
      field: 'status'
    },
    price: {
      type: Sequelize.INTEGER,
      field: 'price'
    }
  });

  return availabilityModel;
};

