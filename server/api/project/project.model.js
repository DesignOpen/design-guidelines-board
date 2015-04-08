'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  owner: String,
  repo: String,
  createdBy: Schema.Types.ObjectId
});

module.exports = mongoose.model('Project', ProjectSchema);
