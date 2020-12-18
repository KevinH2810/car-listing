const express = require('express');
const { carListingController } = require('../controller');

const router = express.Router();

router.get('/', (req, res) => {
  carListingController.getAllCar(req, res)
});

router.get('/:id', (req, res) => {
  carListingController.getDetailCar(req, res)
});

router.post('/addCar', (req, res) => {
  carListingController.addCar(req, res)
});

module.exports = router;