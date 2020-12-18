const { db } = require("../model");
const car = db.carListing;
const Op = db.Sequelize.Op;

module.exports = class carListingService {
	async searchAllCarListing(payload, callback) {
		let avail = payload.availability ? payload.availability : true;
		let condition = {
			[Op.or]: [
				avail,
				{ year: { [Op.like]: payload.year ? `%${payload.year}%` : "%%" } },
			],
		};

		car
			.findAll({ where: condition, include: ["brand", "color", "fuel"], })
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
	}

	async getCarDetail(carId, callback) {
		car
    findByPk(carId, { include: ["brand", "color", "fuel"] })
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
	}

	async addCarListing(payload, callback) {
		car
			.create(payload)
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
	}
};
