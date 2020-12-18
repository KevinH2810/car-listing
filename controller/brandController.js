const { BrandService } = require("../services");
const BaseController = require("./BaseController");
const HandleError = require("./HandleError");

module.exports = class BrandController extends BaseController {
	constructor() {
		super(new BrandService());
	}

	async getAllBrand(req, res) {
		const handleError = new HandleError();

		this.service.getAllBrand((err, result) => {
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

	async addNewBrand(req, res) {
		const { brandName } = req.body;
		const handleError = new HandleError();

    this.service.isExists(brandName, (err, result) => {

			if (err) {
				handleError.sendCatchError(res, err);
				return;
			}


		if(result){
			this.sendResourceAlreadyExistResponse(
				res,
				{
					status: 409,
					message: "Brand Already Exist"
				}
			)
		}

		// let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

		this.service.addBrand(
			{
				brandName,
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
};
