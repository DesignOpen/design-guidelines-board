'use strict';

var express = require('express');
var controller = require('./github.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/user/repos', auth.isAuthenticated(), controller.myRepos);
router.get('/user/orgs', auth.isAuthenticated(), controller.myOrgs);
router.get('/orgs/:org/repos', auth.isAuthenticated(), controller.orgRepos);

module.exports = router;
