const { db } = require("../model");
const fuel = db.fuel;

module.exports = class fuelService {
  async getAllFuelType(callback){
    fuel.findAll({})
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
  }

  async addNewFuelType(payload, callback) {
    fuel
			.create(payload)
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
  }

  async isExists(fuelName,callback){
    fuel.findOne({ where: { fuelName } })
    .then((data) => {
      return callback(null, data);
    })
    .catch((err) => {
      return callback(err, null);
    });
  }  
}