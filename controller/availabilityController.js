const { AvailabilityService, UserService } = require("../services");
const BaseController = require("./BaseController");
const HandleError = require("./HandleError");
const jwt = require("jsonwebtoken");

const config = require("../config/config");

module.exports = class AvailabilityController extends BaseController {
	constructor() {
		super(new AvailabilityService());
		this.userService = new UserService();
	}

	//make function to getAllCarModel
	async getAllAvail(req, res) {
		//add auth to filter based on user
		//availability 1 = true (available) / 0 = false (unavailable)
		const { date, status } = req.query;
		const handleError = new HandleError();
		console.log(`${date} + ${status}`);

		this.service.getAllCarAvailability({ date, status }, (err, result) => {
			if (err) {
				handleError.sendCatchError(res, err);
				return;
			}

			return this.sendSuccessResponse(res, {
				status: 200,
				message: result,
			});
		});
	}

	async addCarAvail(req, res) {
		const { date, price, modelId } = req.body;
		const handleError = new HandleError();
		const today = new Date()
			.toISOString()
			.replace("-", "/")
			.split("T")[0]
			.replace("-", "/");
		if (date <= today) {
			return this.sendBadRequestResponse(res, {
				status: 400,
				message: "Invalid Date. please choose date after today",
			});
		}

		if (!date || !price | !modelId) {
			return this.sendBadRequestResponse(res, {
				status: 400,
				message: "please input the date, price or selected model",
			});
		}

		let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
		if (token && token.startsWith("Bearer ")) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}

		if (token) {
			jwt.verify(token, config.token.secret, async (err, decoded) => {
				if (err) {
					return res.json({
						status: 500,
						success: false,
						message: `Token is not valid error = ${err}`,
					});
				}

				const { userId } = decoded;
				let status = 1;

				this.service.addCarAvailability(
					{
						date,
						price,
						modelId,
						status,
						userId,
					},
					(err, result) => {
						if (err) {
							handleError.sendCatchError(res, err);
							return;
						}

						return this.sendSuccessResponse(res, {
							status: 200,
							message: result,
						});
					}
				);
			});
		} else {
			handleError.sendCatchError(res, "Auth token is not supplied");
			return;
		}
	}

	async updateCarAvail(req, res) {
		const { availId, date, status, price, modelId } = req.body;
		const handleError = new HandleError();

		const today = new Date()
			.toISOString()
			.replace("-", "/")
			.split("T")[0]
			.replace("-", "/");
		if (date <= today) {
			return this.sendBadRequestResponse(res, {
				status: 400,
				message: "Invalid Date. please choose date after today",
			});
		}

		if (!availId || !status || !date || !price | !modelId) {
			return this.sendBadRequestResponse(res, {
				status: 400,
				message: "please input the id,status,  date, price or selected model",
			});
		}

		let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
		if (token && token.startsWith("Bearer ")) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}

		if (token) {
			jwt.verify(token, config.token.secret, async (err, decoded) => {
				if (err) {
					return res.json({
						status: 500,
						success: false,
						message: `Token is not valid error = ${err}`,
					});
				}

				const { userId } = decoded;

				//add funciton to check car Model if its exists

				this.service.isExists(modelId, async (err, result) => {
					if (err) {
						handleError.sendCatchError(res, err);
						return;
					}

					const AuthToUpdate = await this.service.checkAuth(userId, availId);

					if (AuthToUpdate === 1) {
						this.service.updateCarAvailability(
							{
								date,
								status,
								price,
								modelId,
							},
							availId,
							(err, result) => {
								if (err) {
									handleError.sendCatchError(res, err);
									return;
								}

								return this.sendSuccessResponse(res, {
									status: 200,
									message: "data updated succesfully",
								});
							}
						);
					} else if (AuthToUpdate === 0) {
						return this.sendBadRequestResponse(res, {
							status: 400,
							message: "unauthorized update",
						});
					} else {
						return this.sendBadRequestResponse(res, {
							status: 400,
							message: "invalid parameter",
						});
					}
				});
			});
		} else {
			handleError.sendCatchError(res, "Auth token is not supplied");
			return;
		}
	}

	async deleteCarAvail(req, res) {
		const { availId } = req.body;
		const handleError = new HandleError();

		if (!availId) {
			return this.sendBadRequestResponse(res, {
				status: 400,
				message: "please input the parameter id",
			});
		}

		let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
		if (token && token.startsWith("Bearer ")) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}

		if (token) {
			jwt.verify(token, config.token.secret, async (err, decoded) => {
				if (err) {
					return res.json({
						status: 500,
						success: false,
						message: `Token is not valid error = ${err}`,
					});
				}

				const { userId } = decoded;

				const AuthToUpdate = await this.service.checkAuth(userId, availId);

				if (AuthToUpdate === 1) {
					this.service.deleteCarAvailability(
						availId,
						(err, result) => {
							if (err) {
								handleError.sendCatchError(res, err);
								return;
							}

							return this.sendSuccessResponse(res, {
								status: 200,
								message: result,
							});
						}
					);
				} else if (AuthToUpdate === 0) {
					return this.sendBadRequestResponse(res, {
						status: 400,
						message: "unauthorized delete",
					});
				} else {
					return this.sendBadRequestResponse(res, {
						status: 400,
						message: "invalid parameter",
					});
				}
			});
		} else {
			handleError.sendCatchError(res, "Auth token is not supplied");
			return;
		}
	}
};
