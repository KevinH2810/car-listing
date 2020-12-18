module.exports = (sequelize, Sequelize) => {
  const userModel = sequelize.define("userModel", {
    username: {
      type: Sequelize.STRING,
      field: 'username'
    },
    password: {
      type: Sequelize.STRING,
      field: 'password'
    },
  });

  return userModel;
};