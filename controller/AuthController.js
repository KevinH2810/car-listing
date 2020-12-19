const BaseController = require("./BaseController");
const HandleError = require("./HandleError");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { UserService } = require("../services");


module.exports = class AuthController extends BaseController {
	constructor() {
		super(new UserService());
	}

	// register to Database
	async register(req, res) {
		const handleError = new HandleError();
		const { username, password } = req.query;

		if (!username || !password){
			return this.sendInvalidPayloadResponse(res, {
				status: 422,
				message: "please supply username / password",
			});
		}

		const hashedPassword = await this.hashPassword(password);
		
		this.service.ValidateUserInDatabe(username, (err, result) => {
			if (err){
				handleError.sendCatchError(res, err);
					return;
			}
			
			if(result.length > 0){
				return this.sendResourceAlreadyExistResponse(res , {
					status: 409,
					message: "User Already Registered"
				})
			}
			
				this.service.registerNewUser(
					{ username, hashedPassword },
					(err, result) => {
						if (err) {
							handleError.sendCatchError(res, err);
							return;
						}
		
						return this.sendSuccessResponse(res, {
							status: 200,
							message: "User Registered",
						});
					}
				);
			
		})	
	}

	async login(req, res) {
		const handleError = new HandleError();
		const { username, password } = req.query;

		// get from database
		this.service.ValidateUserInDatabe(username, (err, result) => {
			if (err) {
				handleError.sendCatchError(res, err);
				return;
			}

			if (result.length === 0) {
				return this.sendNotFoundResponse(res, {
					status: 404,
					message: "username does not exist",
				});
			}

			if (this.isPasswordCorrect(password, result.hashedPassword)) {
				return this.sendInvalidPayloadResponse(res, {
					status: 422,
					message: "password does not match",
				});
			}

			// create a token
			var tokens = jwt.sign(
				{ username: result.username, userId: result.id },
				config.token.secret,
				{
					expiresIn: 86400, // expires in 24 hours
				}
			);

			return this.sendSuccessResponse(res, {
				status: 200,
				message: {
					message: "login succesfull",
					token: tokens,
				},
			});
		});
	}
};
