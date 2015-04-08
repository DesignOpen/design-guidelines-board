'use strict';

var Project = require('./project.model');
var User = require('./../user/user.model');
var github = require('octonode');
var common = require('../common.js');
var cache = require('rediscache');

cache.connect().configure({
    expiry: 86400
});

/**
 * List projects
 */
exports.index = function (req, res, next) {
  Project.find({}, '-_id owner repo', function(err, projects) {
    res.json(projects);
  });
};


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

    var project = {
      owner: req.body.owner,
      repo: req.body.repo,
      createdBy: userId
    };

    Project.create(project, function (err, project) {
      if (err) return next(err);
      res.json(project);
    });

  });
};

/**
 * Show project
 */
exports.show = function (req, res, next) {
  cache.fetch('project/' + req.params.owner + '/' + req.params.repo)

    .otherwise(function(deferred, cacheKey){
      Project.findOne({
        owner: req.params.owner,
        repo: req.params.repo
      }, '-_id owner repo createdBy', function(err, project) {
        if (err) return deferred.reject(err);
        if (!project) return res.send(404);
        var projectInfo = {};
        projectInfo.owner = project.owner;
        projectInfo.repo = project.repo;
        projectInfo.createdBy = project.createdBy;

        var githubClient = github.client();
        githubClient.repo(project.owner + '/' + project.repo).contents('CONTRIBUTING.md', function(err, data, headers) {
          if (err) return deferred.reject(err);
          var buffer = new Buffer(data.content, data.encoding);
          var data = buffer.toString();
          var designSection = common.getDesignSection(data);
          if(!designSection) return res.send(401); // No design section!
          projectInfo.design = designSection;
          deferred.resolve(projectInfo);
        });
      });
    })

    .then(function(projectInfo) {
      res.json(projectInfo);
    })

    .fail(function(err) {
      return next(err);
    });
};