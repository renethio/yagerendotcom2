(function () {
  'use strict';

  angular
    .module('liyus')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Liyus',
      state: 'liyus',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'liyus', {
      title: 'List Liyus',
      state: 'liyus.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'liyus', {
      title: 'Create Liyu',
      state: 'liyus.create',
      roles: ['user']
    });
  }
}());
