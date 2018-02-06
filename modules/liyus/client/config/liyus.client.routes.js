(function () {
  'use strict';

  angular
    .module('liyus')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('liyus', {
        abstract: true,
        url: '/liyus',
        template: '<ui-view/>'
      })
      .state('liyus.list', {
        url: '',
        templateUrl: 'modules/liyus/client/views/list-liyus.client.view.html',
        controller: 'LiyusListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Liyus List'
        }
      })
      .state('liyus.create', {
        url: '/create',
        templateUrl: 'modules/liyus/client/views/form-liyu.client.view.html',
        controller: 'LiyusController',
        controllerAs: 'vm',
        resolve: {
          liyuResolve: newLiyu
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Liyus Create'
        }
      })
      .state('liyus.edit', {
        url: '/:liyuId/edit',
        templateUrl: 'modules/liyus/client/views/form-liyu.client.view.html',
        controller: 'LiyusController',
        controllerAs: 'vm',
        resolve: {
          liyuResolve: getLiyu
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Liyu {{ liyuResolve.name }}'
        }
      })
      .state('liyus.view', {
        url: '/:liyuId',
        templateUrl: 'modules/liyus/client/views/view-liyu.client.view.html',
        controller: 'LiyusController',
        controllerAs: 'vm',
        resolve: {
          liyuResolve: getLiyu
        },
        data: {
          pageTitle: 'Liyu {{ liyuResolve.name }}'
        }
      });
  }

  getLiyu.$inject = ['$stateParams', 'LiyusService'];

  function getLiyu($stateParams, LiyusService) {
    return LiyusService.get({
      liyuId: $stateParams.liyuId
    }).$promise;
  }

  newLiyu.$inject = ['LiyusService'];

  function newLiyu(LiyusService) {
    return new LiyusService();
  }
}());
