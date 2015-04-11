'use strict';

var User = require('./../user/user.model');
var Project = require('./../project/project.model');
var github = require('octonode');
var common = require('../common.js');
var Q = require("q");


/**
 * Get my GitHub repos
 */
exports.myRepos = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, function(err, user) {
    if (err) return next(err);
    if (!user) return res.json(401);
    if (!user.github.accessToken) return res.json(401);
    var githubClient = github.client(user.github.accessToken);
    githubClient.me().repos({type: 'public'}, function(err, data, headers) {
      if (err) return next(err);
      return res.json(data);
    });
  });
};

/**
 * Get my GitHub organizations
 */
exports.myOrgs = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, function(err, user) {
    if (err) return next(err);
    if (!user) return res.json(401);
    if (!user.github.accessToken) return res.json(401);
    var githubClient = github.client(user.github.accessToken);
    githubClient.me().orgs(function(err, data, headers) {
      if (err) return next(err);
      return res.json(data);
    });
  });
};

/**
 * Get repos for an organization
 */
exports.orgRepos = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, function(err, user) {
    if (err) return next(err);
    if (!user) return res.json(401);
    if (!user.github.accessToken) return res.json(401);
    var githubClient = github.client(user.github.accessToken);
    githubClient.org(req.params.org).repos({type: 'member'}, function(err, data, headers) {
      if (err) return next(err);
      return res.json(data);
    });
  });
};

/**
 * Get repo information
 */
exports.checkRepo = function(req, res, next) {
  var userId = req.user._id;
  var user = Q.nfcall(User.findOne.bind(User), {_id: userId});
  var accessToken = user.then(function(user) {
    if (!user || !user.github || !user.github.accessToken) throw new Error('Cannot get access token');
    return user.github.accessToken;
  });
  var githubClient = accessToken.then(function(accessToken) {
    return github.client(accessToken);
  });
  var checkRepo = githubClient.then(function(githubClient) {
    var repo = githubClient.repo(req.params.owner + '/' + req.params.repo);
    return Q.nfcall(repo.contents.bind(repo), 'CONTRIBUTING.md').spread(function(data, headers) {
      var buffer = new Buffer(data.content, data.encoding);
      var data = buffer.toString();
      return [true, common.getDesignSection(data) != null];
    }, function() {
      return [false, false];
    });
  });
  checkRepo.spread(function(hasContributing, hasDesignSection) {
    return res.json({
      hasContributing: hasContributing,
      hasDesignSection: hasDesignSection
    });
  }, function(err) {
    next(err);
  }).done();
};