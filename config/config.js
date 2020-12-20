require("dotenv").config();

module.exports = {
	app: {
        port: process.env.PORT || 9099,
        HOST: process.env.HOST
	},
	token: {
		secret: process.env.SECRET_TOKEN,
    },
    fb: {
        APP_ID: process.env.APP_ID,
        APP_SECRET: process.env.APP_SECRET,
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
};
