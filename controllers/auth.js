const express = require('express');
const login = require('./login');
const createmeet = require('./createmeet');
const router = express.Router();

router.post('/createmeet', createmeet);
router.post('/login', login);

module.exports = router;