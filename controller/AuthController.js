const BaseController = require("./BaseController");
const HandleError = require("./HandleError");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { UserService } = require("../services");
const axios = require("axios");

module.exports = class AuthController extends BaseController {
	constructor() {
		super(new UserService());
	}

	async login(req, res) {
		res.send(`
		<html>
			<body>
				<a href="https://www.facebook.com/v6.0/dialog/oauth?client_id=${
					config.fb.APP_ID
				}&redirect_uri=${encodeURIComponent(`${config.app.HOST}/oauth-redirect`)}">
					Log In With Facebook
				</a>
			</body>
		</html>
		`);
	}

	async oauthRedirect(req, res) {
		const handleError = new HandleError();
		try {
			const authCode = req.query.code;

			const accessTokenUrl =
				"https://graph.facebook.com/v6.0/oauth/access_token?" +
				`client_id=${config.fb.APP_ID}&` +
				`client_secret=${config.fb.APP_SECRET}&` +
				`redirect_uri=${encodeURIComponent(`${config.app.HOST}/oauth-redirect`)}&` +
				`code=${encodeURIComponent(authCode)}`;

			// Make an API request to exchange `authCode` for an access token
			const accessToken = await axios
				.get(accessTokenUrl)
				.then((res) => res.data["access_token"]);

			//get the user personal Data and transform it to JWT. dont forget to register the data to the database
			const { name, id } = await axios
				.get(
					`https://graph.facebook.com/me?access_token=${encodeURIComponent(
						accessToken
					)}`
				)
				.then((res) => res.data);

			//Check if the user exists id db
			this.service.ValidateUserInDatabe(name, (err, result) => {
				if (err) {
					handleError.sendCatchError(res, err);
					return;
				}

				if (!result) {
					this.service.registerNewUser({ id, username: name }, (err, result) => {
						if (err) {
							handleError.sendCatchError(res, err);
							return;
						}
					});
				}

				// create JWT token
				var tokens = jwt.sign(
					{ username: result.username, userId: result.id },
					config.token.secret,
					{
						expiresIn: 86400, // expires in 24 hours
					}
				);

				return this.sendSuccessResponse(res, {
					status: 200,
					JWTtoken: tokens,
				});
			});

			// make function to save the accessToken for the given user
		} catch (err) {
			console.log(err);
			if (err) {
				handleError.sendCatchError(res, err);
				return;
			}
		}
	}
};
