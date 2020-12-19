const { FuelService } = require("../services");
const BaseController = require("./BaseController");
const HandleError = require("./HandleError");

module.exports = class FuelController extends BaseController {
  constructor() {
		super(new FuelService());
  }
  
  async getAllFuelType(req, res) {
		const handleError = new HandleError();

		this.service.getAllFuelType((err, result) => {
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

	async addFuelType(req, res) {
		const { fuelName } = req.body;
		const handleError = new HandleError();

    this.service.isExists(fuelName, (err, result) => {

			if (err) {
				handleError.sendCatchError(res, err);
				return;
			}


		if(result){
			this.sendResourceAlreadyExistResponse(
				res,
				{
					status: 409,
					message: "Fuel Type Already Exist"
				}
			)
		}
		
		// let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

		this.service.addNewFuelType(
			{
				fuelName,
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
		})
	}
}