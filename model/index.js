const dbConfig = require("../config/config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.db.DBNAME, dbConfig.db.USER, dbConfig.db.PASSWORD, {
  host: dbConfig.db.HOST,
  dialect: dbConfig.db.dialect,
  operatorsAliases: false,
  autoreconnect: true,

  pool: {
    max: dbConfig.db.pool.max,
    min: dbConfig.db.pool.min,
    acquire: dbConfig.db.pool.acquire,
    idle: dbConfig.db.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync().then(() => { console.log('Connected to DB...'); }) .catch(err => { db.sequelize.sync() })

db.carModel = require("./carModelModel")(sequelize, Sequelize);
db.availability = require("./availabilityModel")(sequelize, Sequelize);
db.brand = require("./brandModel")(sequelize, Sequelize);
db.color = require("./colorModel")(sequelize, Sequelize);
db.fuel = require("./fuelModel")(sequelize, Sequelize);
db.user = require("./usersModel")(sequelize, Sequelize);

db.carModel.hasMany(db.availability, {as: "availability"})
db.brand.hasMany(db.carModel, {as: "brand"})
db.color.hasMany(db.carModel, {as: "color"})
db.fuel.hasMany(db.carModel, {as: "fuel"})
db.user.hasMany(db.carModel, {as: "user"})


db.availability.belongsTo(db.carModel, {
  foreignKey: "modelId",
  as: "model",
});

db.availability.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

db.carModel.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

db.carModel.belongsTo(db.brand, {
  foreignKey: "brandId",
  as: "brand",
});

db.carModel.belongsTo(db.color, {
  foreignKey: "colorId",
  as: "color",
});

db.carModel.belongsTo(db.fuel, {
  foreignKey: "fuelId",
  as: "fuel",
});

module.exports = { db }