// Liyus service used to communicate Liyus REST endpoints
(function () {
  'use strict';

  angular
    .module('liyus')
    .factory('LiyusService', LiyusService);

  LiyusService.$inject = ['$resource'];

  function LiyusService($resource) {
    return $resource('api/liyus/:liyuId', {
      liyuId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
