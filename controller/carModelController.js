const { CarModelService, UserService } = require("../services");
const BaseController = require("./BaseController");
const HandleError = require("./HandleError");
const jwt = require("jsonwebtoken");
const util = require("util");

const config = require("../config/config");

module.exports = class CarModelController extends BaseController {
	constructor() {
		super(new CarModelService());
		this.userService = new UserService();
	}

	//make function to getAllCarModel
	async getAllCar(req, res) {
		//add auth to filter based on user
		const handleError = new HandleError();

		this.service.searchAllCarModel((err, result) => {
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

	async getAllMyCar(req, res) {
		//add auth to filter based on user
		const handleError = new HandleError();

		let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
		if (token.startsWith("Bearer ")) {
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

				this.service.searchMyCarModel({ userId }, (err, result) => {
					if (err) {
						handleError.sendCatchError(res, err);
						return;
					}

					return this.sendSuccessResponse(res, {
						status: 200,
						message: result,
					});
				});
			});
		} else {
			handleError.sendCatchError(res, "Auth token is not supplied");
			return;
		}
	}

	async getDetailCar(req, res) {
		const handleError = new HandleError();
		const id = req.params.id;
		if (!id) {
			return this.sendInvalidPayloadResponse(res, {
				status: 422,
				message: "please supply the parameter 'id'",
			});
		}

		this.service.getCarDetail(id, (err, result) => {
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

	async addCar(req, res) {
		const { model, brandId, year, colorId, fuelId, engine } = req.body;
		const handleError = new HandleError();

		if (!model || !brandId || !year || !colorId || !fuelId || !engine) {
			return this.sendBadRequestResponse(res, {
				status: 400,
				message:
					"please input the model, brandId, year, colorId, fuelId, engine parameter",
			});
		}

		let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
		if (token.startsWith("Bearer ")) {
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

				this.service.addCarModel(
					{
						model,
						brandId,
						year,
						colorId,
						fuelId,
						engine,
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

	async updateCar(req, res) {
		const { modelId, modelName, brandId, year, colorId, fuelId, engine } = req.body;
		const handleError = new HandleError();

		if (
			!modelId ||
			!modelName ||
			!brandId ||
			!year ||
			!colorId ||
			!fuelId ||
			!engine
		) {
			return this.sendBadRequestResponse(res, {
				status: 400,
				message:
					"please input the id, modelName, brandId, year, colorId, fuelId, engine parameter",
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

				const AuthToUpdate = await this.service.checkAuth(userId, modelId);
				if (AuthToUpdate === 1) {
					this.service.updateCarModel(
						{
							modelId,
							model: modelName,
							brandId,
							year,
							colorId,
							fuelId,
							engine,
						},
						modelId,
						(err, results) => {
							if (err) {
								handleError.sendCatchError(res, err);
								return;
							}

							return this.sendSuccessResponse(res, {
								status: 200,
								message: "Data updated sucesfully",
							});
						}
					);
				} else if (AuthToUpdate === 0){
					return this.sendBadRequestResponse(res, {
						status: 400,
						message: "unauthorized update",
					});
				} else {
					return this.sendBadRequestResponse(res, {
						status: 400,
						message: 'invalid parameter',
					});
				}
			});
		} else {
			handleError.sendCatchError(res, "Auth token is not supplied");
			return;
		}
	}

	async deleteCar(req, res) {
		const { modelId } = req.body;
		const handleError = new HandleError();

		let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
		if (token.startsWith("Bearer ")) {
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

				const AuthToUpdate = await this.service.checkAuth(userId, modelId);

				if (AuthToUpdate === 1) {
					this.service.deleteCarModel(
						modelId,
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
				} else if (AuthToUpdate === 0){
					return this.sendBadRequestResponse(res, {
						status: 400,
						message: "unauthorized delete",
					});
				} else {
					return this.sendBadRequestResponse(res, {
						status: 400,
						message: 'invalid parameter',
					});
				}
			});
		} else {
			handleError.sendCatchError(res, "Auth token is not supplied");
			return;
		}
	}
};
