const { db } = require("../model");
const color = db.color;

module.exports = class colorService {
  async getAllColor(callback){
    color.findAll({})
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
  }

  async addColor(payload, callback) {
    color
			.create(payload)
			.then((data) => {
				return callback(null, data);
			})
			.catch((err) => {
				return callback(err, null);
			});
  }

  async isExists(colorName,callback){
    color.findOne({ where: { colorName } })
    .then((data) => {
      return callback(null, data);
    })
    .catch((err) => {
      return callback(err, null);
    });
  }  
}