require('dotenv').config()

module.exports = {
    app: {
        port: process.env.API_PORT || 9099,
    },
    db: {
        PORT: process.env.MYSQL_PORT,
        HOST: process.env.MYSQL_HOST,
        USER: process.env.MYSQL_USER,
        PASSWORD: process.env.MYSQL_PASS,
        DBNAME: process.env.MYSQL_DB,
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
    }
}