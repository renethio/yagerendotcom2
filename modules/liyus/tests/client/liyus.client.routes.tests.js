(function () {
  'use strict';

  describe('Liyus Route Tests', function () {
    // Initialize global variables
    var $scope,
      LiyusService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _LiyusService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      LiyusService = _LiyusService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('liyus');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/liyus');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          LiyusController,
          mockLiyu;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('liyus.view');
          $templateCache.put('modules/liyus/client/views/view-liyu.client.view.html', '');

          // create mock Liyu
          mockLiyu = new LiyusService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Liyu Name'
          });

          // Initialize Controller
          LiyusController = $controller('LiyusController as vm', {
            $scope: $scope,
            liyuResolve: mockLiyu
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:liyuId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.liyuResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            liyuId: 1
          })).toEqual('/liyus/1');
        }));

        it('should attach an Liyu to the controller scope', function () {
          expect($scope.vm.liyu._id).toBe(mockLiyu._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/liyus/client/views/view-liyu.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          LiyusController,
          mockLiyu;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('liyus.create');
          $templateCache.put('modules/liyus/client/views/form-liyu.client.view.html', '');

          // create mock Liyu
          mockLiyu = new LiyusService();

          // Initialize Controller
          LiyusController = $controller('LiyusController as vm', {
            $scope: $scope,
            liyuResolve: mockLiyu
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.liyuResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/liyus/create');
        }));

        it('should attach an Liyu to the controller scope', function () {
          expect($scope.vm.liyu._id).toBe(mockLiyu._id);
          expect($scope.vm.liyu._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/liyus/client/views/form-liyu.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          LiyusController,
          mockLiyu;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('liyus.edit');
          $templateCache.put('modules/liyus/client/views/form-liyu.client.view.html', '');

          // create mock Liyu
          mockLiyu = new LiyusService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Liyu Name'
          });

          // Initialize Controller
          LiyusController = $controller('LiyusController as vm', {
            $scope: $scope,
            liyuResolve: mockLiyu
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:liyuId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.liyuResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            liyuId: 1
          })).toEqual('/liyus/1/edit');
        }));

        it('should attach an Liyu to the controller scope', function () {
          expect($scope.vm.liyu._id).toBe(mockLiyu._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/liyus/client/views/form-liyu.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
