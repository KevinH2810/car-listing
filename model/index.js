const dbConfig = require("../config/config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.db.DBNAME, dbConfig.db.USER, dbConfig.db.PASSWORD, {
  host: dbConfig.db.HOST,
  dialect: dbConfig.db.dialect,
  operatorsAliases: false,

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

db.carListing = require("./carListingModel")(sequelize, Sequelize);
db.availability = require("./availabilityModel")(sequelize, Sequelize);
db.brand = require("./brandModel")(sequelize, Sequelize);
db.color = require("./colorModel")(sequelize, Sequelize);
db.fuel = require("./fuelModel")(sequelize, Sequelize);
db.user = require("./usersModel")(sequelize, Sequelize);

db.carListing.hasMany(db.availability, {as: "availability"})
db.brand.hasMany(db.carListing, {as: "brand"})
db.color.hasMany(db.carListing, {as: "color"})
db.fuel.hasMany(db.carListing, {as: "fuel"})

db.availability.belongsTo(db.carListing, {
  foreignKey: "availabilityId",
  as: "availability",
});

db.carListing.belongsTo(db.brand, {
  foreignKey: "brandId",
  as: "brand",
});

db.carListing.belongsTo(db.color, {
  foreignKey: "colorId",
  as: "color",
});

db.carListing.belongsTo(db.fuel, {
  foreignKey: "fuelId",
  as: "fuel",
});

module.exports = { db };