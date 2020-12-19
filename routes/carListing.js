const express = require('express');
const { carListingController } = require('../controller');

const router = express.Router();

router.get('/', (req, res) => {
  carListingController.getAllCar(req, res)
});

router.get('/myCar', (req, res) => {
  carListingController.getAllMyCar(req, res)
});

router.get('/:id', (req, res) => {
  carListingController.getDetailCar(req, res)
});

router.post('/addCar', (req, res) => {
  carListingController.addCar(req, res)
});

router.put('/updateCar', (req, res) => {
  carListingController.updateCar(req, res)
});

router.delete('/deleteCar', (req, res) => {
  carListingController.deleteCar(req, res)
});

module.exports = router;