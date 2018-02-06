'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Liyu = mongoose.model('Liyu'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Liyu
 */
exports.create = function(req, res) {
  var liyu = new Liyu(req.body);
  liyu.user = req.user;

  liyu.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(liyu);
    }
  });
};

/**
 * Show the current Liyu
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var liyu = req.liyu ? req.liyu.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  liyu.isCurrentUserOwner = req.user && liyu.user && liyu.user._id.toString() === req.user._id.toString();

  res.jsonp(liyu);
};

/**
 * Update a Liyu
 */
exports.update = function(req, res) {
  var liyu = req.liyu;

  liyu = _.extend(liyu, req.body);

  liyu.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(liyu);
    }
  });
};

/**
 * Delete an Liyu
 */
exports.delete = function(req, res) {
  var liyu = req.liyu;

  liyu.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(liyu);
    }
  });
};

/**
 * List of Liyus
 */
exports.list = function(req, res) {
  Liyu.find().sort('-created').populate('user', 'displayName').exec(function(err, liyus) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(liyus);
    }
  });
};

/**
 * Liyu middleware
 */
exports.liyuByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Liyu is invalid'
    });
  }

  Liyu.findById(id).populate('user', 'displayName').exec(function (err, liyu) {
    if (err) {
      return next(err);
    } else if (!liyu) {
      return res.status(404).send({
        message: 'No Liyu with that identifier has been found'
      });
    }
    req.liyu = liyu;
    next();
  });
};
