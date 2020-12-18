const { db } = require("../model");
const brand = db.brand;

module.exports = class brandService {
  async getAllBrand(callback){
    brand.findAll({})
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
  }

  async addBrand(payload, callback) {
    brand
			.create(payload)
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
  }

  async isExists(brandName,callback){
    brand.findOne({ where: { brandName } })
    .then((data) => {
      return callback(null, data);
    })
    .catch((err) => {
      return callback(err, null);
    });
  }  
}