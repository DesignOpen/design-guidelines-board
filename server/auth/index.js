'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/user/user.model');

// Passport Configuration
require('./github/passport').setup(User, config);
require('./dribbble/passport').setup(User, config);

var router = express.Router();

router.use('/github', require('./github'));
router.use('/dribbble', require('./dribbble'));

module.exports = router;