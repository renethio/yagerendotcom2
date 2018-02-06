'use strict';

/**
 * Module dependencies
 */
var liyusPolicy = require('../policies/liyus.server.policy'),
  liyus = require('../controllers/liyus.server.controller');

module.exports = function(app) {
  // Liyus Routes
  app.route('/api/liyus').all(liyusPolicy.isAllowed)
    .get(liyus.list)
    .post(liyus.create);

  app.route('/api/liyus/:liyuId').all(liyusPolicy.isAllowed)
    .get(liyus.read)
    .put(liyus.update)
    .delete(liyus.delete);

  // Finish by binding the Liyu middleware
  app.param('liyuId', liyus.liyuByID);
};
