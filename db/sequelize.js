const config = require('../config/config');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

async function initDB(){

  // create db if it doesn't already exist
  const { HOST, USER, PASSWORD, DBNAME } = config.db;
  const connection = await mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DBNAME}\`;`);

  // connect to db
  try{
    const sequelize = new Sequelize(DBNAME, USER, PASSWORD, { dialect: 'mysql' });

  // sync all models with database
  await sequelize.sync();
  }catch{
    setTimeout(initDB, 5000)
  }
  
}

module.exports = () => {
  initDB()
}