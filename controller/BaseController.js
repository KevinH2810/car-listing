const config = require("../config/config");
const crypto = require("crypto");

module.exports = class BaseController {
	constructor(service) {
		this.service = service;
	}

	sendSuccessResponse(res, response_body = {}) {
		res.status(200).json(response_body);
	}

	sendCreatedResponse(res, response_body = {}) {
		res.status(201).json(response_body);
	}

	sendNotFoundResponse(res, response_body = {}) {
		res.status(404).json(response_body);
	}

	sendInvalidPayloadResponse(res, response_body = {}) {
		res.status(422).json(response_body);
	}

	sendResourceAlreadyExistResponse(res, response_body = {}) {
		res.status(409).json(response_body);
	}

	sendInternalServerErrorResponse(res, response_body = {}) {
		res.status(500).json(response_body);
	}

	sendBadRequestResponse(res, response_body = {}) {
		res.status(400).json(response_body);
	}

	hashPassword(password) {
    // let salt = crypto.randomBytes(128).toString('base64');
    return new Promise(resolve => {
      let salt = config.salt.salt;
		let iterations = config.salt.iteration;
		crypto.pbkdf2(
			password,
			salt,
			parseInt(iterations),
			32,
			"sha1",
			(err, res) => {
				resolve(res.toString())
			}
		);
    })
		
	}

	isPasswordCorrect(password, savedHash) {
		return savedHash == this.hashPassword(password);
	}
};
