const express = require('express');
const { authController } = require('../controller');

const router = express.Router();

router.get('/', (req, res) => {
    authController.login(req, res)
});

router.post('/register', (req, res) => {
    authController.register(req, res)
});

module.exports = router;