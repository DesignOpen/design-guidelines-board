'use strict';

var express = require('express');
var controller = require('./project.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:owner/:repo', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;
