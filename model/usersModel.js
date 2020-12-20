module.exports = (sequelize, Sequelize) => {
  const userModel = sequelize.define("userModel", {
    id : {
      type : Sequelize.BIGINT.UNSIGNED,
      autoIncrement : false,
      primaryKey : true
    },
    username: {
      type: Sequelize.STRING,
      field: 'username'
    },
  });

  return userModel;
};