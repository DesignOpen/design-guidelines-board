'use strict';

var User = require('./../user/user.model');
var github = require('octonode');


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
exports.getRepoReadme = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, function(err, user) {
    if (err) return next(err);
    if (!user) return res.json(401);
    if (!user.github.accessToken) return res.json(401);
    var githubClient = github.client(user.github.accessToken);
    githubClient.repo(req.params.owner + '/' + req.params.repo).readme(function(err, data, headers) {
      if (err) return next(err);
      var buffer = new Buffer(data.content, 'base64');
      return res.json({readme: buffer.toString('utf8')});
    });
  });
};