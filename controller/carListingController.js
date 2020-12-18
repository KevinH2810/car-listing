const { CarListingService } = require("../services");
const BaseController = require("./BaseController");
const HandleError = require("./HandleError");

module.exports = class CarListingController extends BaseController {
	constructor() {
		super(new CarListingService());
	}

	async getAllCar(req, res) {
		const { date, availability } = req.query;
		const handleError = new HandleError();

		this.service.searchAllCarListing({ date, availability }, (err, result) => {
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
    const {
      model,
      brandId,
      year,
      colorId,
      fuelId,
      engine,
    } = req.body;
		const handleError = new HandleError();
		
		// let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
		
		this.service.addCarListing(
			{
				model,
				brandId,
				year,
				colorId,
				fuelId,
				engine,
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
  }
};
