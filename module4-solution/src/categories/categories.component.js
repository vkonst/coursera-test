(function () {
  'use strict';

angular.module('Categories')

.component('categories', {
    templateUrl: 'src/categories/templates/categories.component.template.html',
    bindings: {
      categories: '<'
    }
  }
);

})();
