const express = require('express');
const router = express.Router();
const { OwnerLogin } = require('../public/controllers/ownerController');
const  authenticateOwnerToken  = require('../public/middlewares/OwnerAuth');

router.post('/login', OwnerLogin);

module.exports = router;
