const CarModelController = require('./carModelController')
const BrandController = require('./brandController')
const ColorController = require('./colorController')
const FuelController = require('./fuelController')
const AuthController = require('./AuthController')
const AvailController = require('./availabilityController')

module.exports = {
    carModelController: new CarModelController(),
    brandController: new BrandController(),
    colorController: new ColorController(),
    fuelController: new FuelController(),
    authController: new AuthController(),
    availController: new AvailController(),
}