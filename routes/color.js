const express = require('express');
const { colorController } = require('../controller');

const router = express.Router();

router.get('/', (req, res) => {
  colorController.getAllColor(req, res)
});

router.post('/addColor', (req, res) => {
  colorController.addNewColor(req, res)
});

module.exports = router;