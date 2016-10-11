(function () {
  'use strict';

  angular.module('Spinner')
  .controller('SpinnerController', SpinnerController);

  SpinnerController.$inject = ['$rootScope'];
  function SpinnerController ($rootScope) {
    var $ctrl = this;
    var cancellers = [];

    $ctrl.$onInit = function () {
      var canceller = $rootScope.$on('$stateChangeStart', function() {
        $ctrl.showSpinner = true;
        $ctrl.showFailure = false;
      });
      cancellers.push(canceller);

      canceller = $rootScope.$on('$stateChangeSuccess', function() {
        $ctrl.showSpinner = false;
        $ctrl.showFailure = false;
      });
      cancellers.push(canceller);

      canceller = $rootScope.$on('$stateChangeError', function() {
        $ctrl.showSpinner = false;
        $ctrl.showFailure = true;
      });
      cancellers.push(canceller);
    };

    $ctrl.$onDestroy = function () {
      cancellers.forEach(function (canceller) {
        canceller();
      });
    };

  }

})();
