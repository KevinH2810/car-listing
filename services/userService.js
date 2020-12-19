const { db } = require("../model");
const user = db.user;

module.exports = class LoginService  {

	async ValidateUserInDatabe(username, callback) {
			user.findOne({ where: {username}})
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
	}

	async registerNewUser(payload, callback) {
		user.create(payload)
		.then((data) => {
			return callback(null, data);
		})
		.catch((err) => {
			return callback(err, null);
		});
	}
};
