const { ColorService } = require("../services");
const BaseController = require("./BaseController");
const HandleError = require("./HandleError");

module.exports = class ColorController extends BaseController {
  constructor() {
		super(new ColorService());
  }
  
  async getAllColor(req, res) {
		const handleError = new HandleError();

		this.service.getAllColor((err, result) => {
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

	async addNewColor(req, res) {
		const { colorName } = req.body;
		const handleError = new HandleError();

    this.service.isExists(colorName, (err, result) => {

			if (err) {
				handleError.sendCatchError(res, err);
				return;
			}


		if(result){
			this.sendResourceAlreadyExistResponse(
				res,
				{
					status: 409,
					message: "Color Already Exist"
				}
			)
		}
		
		// let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

		this.service.addColor(
			{
				colorName,
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