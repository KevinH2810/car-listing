module.exports = (sequelize, Sequelize) => {
  const userModel = sequelize.define("userModel", {
    username: {
      type: Sequelize.STRING,
      field: 'username'
    },
    hashedPassword: {
      type: Sequelize.STRING,
      field: 'hashedPassword'
    },
  });

  return userModel;
};