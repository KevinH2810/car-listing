const express = require('express');
const { brandController } = require('../controller');

const router = express.Router();

router.get('/', (req, res) => {
  brandController.getAllBrand(req, res)
});

router.post('/addBrand', (req, res) => {
  brandController.addNewBrand(req, res)
});

module.exports = router;