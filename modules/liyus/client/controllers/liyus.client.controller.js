(function () {
  'use strict';

  // Liyus controller
  angular
    .module('liyus')
    .controller('LiyusController', LiyusController);

  LiyusController.$inject = ['$scope', '$state', '$window', 'Authentication', 'liyuResolve'];

  function LiyusController ($scope, $state, $window, Authentication, liyu) {
    var vm = this;

    vm.authentication = Authentication;
    vm.liyu = liyu;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Liyu
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.liyu.$remove($state.go('liyus.list'));
      }
    }

    // Save Liyu
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.liyuForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.liyu._id) {
        vm.liyu.$update(successCallback, errorCallback);
      } else {
        vm.liyu.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('liyus.view', {
          liyuId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
