(function () {
  'use strict';

  angular.module('Spinner')

  .component('loadingSpinner', {
    templateUrl: 'src/spinner/templates/loadingspinner.template.html',
    controller: 'SpinnerController'
  });

})();
