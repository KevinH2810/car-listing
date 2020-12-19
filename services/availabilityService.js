const { db } = require("../model");
const avail = db.availability;
const Op = db.Sequelize.Op;

module.exports = class AvailabilityService {
	async getAllCarAvailability(payload, callback) {
		let currDate =  new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
		let status = payload.availability ? payload.availability : 1;
		let dates = payload.date ? payload.date : currDate;
		let condition = {
			[Op.or]: [status, dates],
		};

		avail
			.findAll({ where: condition, include: ["listing"] })
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
	}

	async addCarAvailability(payload, callback) {
		avail
			.create(payload)
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
	}

	async updateCarAvailability(payload, availId, callback) {
		avail
			.update(payload, { where: { availId: availId } })
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
		avail
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
		return (new Promise((resolve) => {
			avail
				.findAll({ where: { availId }})
				.then((data) => {
					if (data.userId !== userId) {
						resolve(0)
					}
					resolve(1)
				})
				.catch((err) => {
					resolve(err);
				});
		}))
	}
};
