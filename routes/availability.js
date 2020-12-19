const express = require('express');
const { availController } = require('../controller');

const router = express.Router();

router.get('/', (req, res) => {
  availController.getAllAvail(req, res)
});

router.post('/addAvail', (req, res) => {
  availController.addCarAvail(req, res)
});

router.put('/updateAvail', (req, res) => {
  availController.updateCarAvail(req, res)
});

router.delete('/deleteAvail', (req, res) => {
  availController.deleteCarAvail(req, res)
});

module.exports = router;