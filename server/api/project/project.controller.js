'use strict';

var Project = require('./project.model');
var User = require('./../user/user.model');
var github = require('octonode');
var common = require('../common.js');

/**
 * Create a project
 */
exports.create = function (req, res, next) {
  var userId = req.user._id;

  // Check if project already exists
  Project.findOne({
    owner: req.body.owner,
    repo: req.body.repo
  }, function(err, project) {
    if (project) return res.json(project);

    // Check repo ownership
    // TODO

    // Get design section
    User.findOne({
      _id: userId
    }, function(err, user) {
      if (err) return next(err);
      if (!user) return res.json(401);
      if (!user.github.accessToken) return res.json(401);
      var githubClient = github.client(user.github.accessToken);
      githubClient.repo(req.body.owner + '/' + req.body.repo).contents('CONTRIBUTING.md', function(err, data, headers) {
        if (err) return res.send(401);
        var buffer = new Buffer(data.content, data.encoding);
        var data = buffer.toString();
        var designSection = common.getDesignSection(data);
        if(!designSection) return res.send(401);

        var project = {
          owner: req.body.owner,
          repo: req.body.repo,
          createdBy: userId,
          design: designSection
        };

        Project.create(project, function (err, project) {
          if (err) return next(err);
          if (!user) return res.send(401);
          res.json(project);
        });
      });
    });
  });
};