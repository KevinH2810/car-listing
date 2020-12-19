require("dotenv").config();

module.exports = {
	app: {
		port: process.env.PORT || 9099,
	},
	token: {
		secret: process.env.SECRET_TOKEN,
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
			idle: 10000,
		},
	},
	salt: {
		salt: process.env.SALT_SYS || "",
		iteration: process.env.SALT_ITERATION || 0,
	},

	development: {
		username: "root",
		password: "",
		database: "database_development",
		host: "127.0.0.1",
		dialect: "mysql",
	},
	production: {
		username: "root",
		password: "",
		database: "database_production",
		host: "127.0.0.1",
		dialect: "mysql",
	},
};
