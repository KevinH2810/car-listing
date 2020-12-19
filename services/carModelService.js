const { db } = require("../model");
const car = db.carListing;
const Op = db.Sequelize.Op;

module.exports = class carListingService {
	//Search based on userId to show the user's car
	async searchMyCarModel(payload, callback) {
		let condition = { userId: payload.userId ? payload.userId : "" };

		car
			.findAll({ where: condition, include: ["brand", "color", "fuel"] })
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
	}

	// to show list of available car to be placed such in tab Car Model
	async searchAllCarModel(callback) {
		car
			.findAll({
				attributes: {
					exclude: [ "createdAt", "updatedAt"],
				},
				include: [
					{ model: db.user, as: "user", attributes: { exclude: ["id","hashedPassword","createdAt", "updatedAt"] }, required: false },
					"brand",
					"color",
					"fuel",
				],
			})
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
	}

	async getCarDetail(carListingId, callback) {
		car
			.findByPk(carListingId, { include: ["brand", "color", "fuel"] })
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
	}

	async addCarModel(payload, callback) {
		car
			.create(payload)
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
	}

	async updateCarModel(payload, carListingId, callback) {
		car
			.update(payload, { where: { carListingId: carListingId } })
			.then((data) => {
				if (res > 0) {
					return callback(null, data);
				} else {
					return callback(
						null,
						`Cant update Availability with id = ${availId}. maybe because Availability not found or req.Body is empty`
					);
				}
			})
			.catch((err) => {
				return callback(err, null);
			});
	}

	async deleteCarAvailability(availId, callback) {
		car
			.destroy({ where: { availId: availId } })
			.then((data) => {
				if (res > 0) {
					return callback(null, data);
				} else {
					return callback(
						null,
						`Cant update Availability with id = ${availId}. maybe because Availability not found or req.Body is empty`
					);
				}
			})
			.catch((err) => {
				return callback(err, null);
			});
	}

	async checkAuth(userId, availId) {
		return new Promise((resolve) => {
			car
				.findAll({ where: { availId } })
				.then((data) => {
					if (data.userId !== userId) {
						resolve(0);
					}
					resolve(1);
				})
				.catch((err) => {
					resolve(err);
				});
		});
	}
};
