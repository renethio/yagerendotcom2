(function () {
  'use strict';

  angular
    .module('akerays')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Akerays',
      state: 'akerays',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'akerays', {
      title: 'List Akerays',
      state: 'akerays.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'akerays', {
      title: 'Create Akeray',
      state: 'akerays.create',
      roles: ['user']
    });
  }
}());
