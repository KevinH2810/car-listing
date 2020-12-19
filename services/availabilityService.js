const { db } = require("../model");
const avail = db.availability;
const Op = db.Sequelize.Op;

module.exports = class AvailabilityService {
	async getAllCarAvailability(payload, callback) {
		let currDate = new Date()
			.toISOString()
			.split("T")[0]
		let status = payload.status ? payload.status : 1;
		let dates = payload.date ? payload.date : currDate;
		let condition = {
			[Op.and]: [{status},{date: dates}],
		};

		avail
			.findAll({ where: condition, include: ["model"] })
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
			.update(payload, { where: { id: availId } })
			.then((data) => {
				if (data.length > 0) {
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
			.destroy({ where: { id: availId } })
			.then((data) => {
				if (data.length > 0) {
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

	async checkAuth(userId, id) {
		return new Promise((resolve) => {
			avail
			.findByPk(id)
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

	async isExists(id, callback) {
		db.carModel
			.findByPk(id)
			.then((data) => {
				if (data) {
					return callback(null, data);
				}else{
					return callback("No car Model with that id", null);
				}
			})
			.catch((err) => {
				return callback(err, null);
			});
	}
};
