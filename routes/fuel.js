const express = require('express');
const { fuelController } = require('../controller');

const router = express.Router();

router.get('/', (req, res) => {
  fuelController.getAllFuelType(req, res)
});

router.post('/addFuel', (req, res) => {
  fuelController.addFuelType(req, res)
});

module.exports = router;