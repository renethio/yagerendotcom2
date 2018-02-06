(function () {
  'use strict';

  angular
    .module('liyus')
    .controller('LiyusListController', LiyusListController);

  LiyusListController.$inject = ['LiyusService'];

  function LiyusListController(LiyusService) {
    var vm = this;

    vm.liyus = LiyusService.query();
  }
}());
