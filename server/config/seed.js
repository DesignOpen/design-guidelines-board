/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Project = require('../api/project/project.model');

User.find({}).remove(function() {
  console.log('Removed all users...');
});
Project.find({}).remove(function() {
  console.log('Removed all projects...');
});