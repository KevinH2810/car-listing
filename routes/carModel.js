const express = require('express');
const { carModelController } = require('../controller');

const router = express.Router();

router.get('/', (req, res) => {
  carModelController.getAllCar(req, res)
});

router.get('/myCar', (req, res) => {
  carModelController.getAllMyCar(req, res)
});

router.get('/:id', (req, res) => {
  carModelController.getDetailCar(req, res)
});

router.post('/addCar', (req, res) => {
  carModelController.addCar(req, res)
});

router.put('/updateCar', (req, res) => {
  carModelController.updateCar(req, res)
});

router.delete('/deleteCar', (req, res) => {
  carModelController.deleteCar(req, res)
});

module.exports = router;