(function() {
  'use strict'
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .controller('FoundItemsDirectiveController', FoundItemsDirectiveController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .directive('itemLoaderIndicator', ItemLoaderIndicatorDirective)
  .constant('ApiPath', "https://davids-restaurant.herokuapp.com");

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;

    ctrl.title = "Narrowed Down:";
    ctrl.found = undefined;

    ctrl.search = function() {
      if (ctrl.searchTerm) {
        MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
        .then(function(foundItems) {
          ctrl.found = foundItems;
        });
      }
      else {
        ctrl.found = [];
      }
    }

    ctrl.onRemove = function(itemIndex) {
      if (ctrl.found) {
        ctrl.found.splice(itemIndex, 1);
      }
    };

  }

  MenuSearchService.$inject = ['$http', '$q', 'ApiPath'];
  function MenuSearchService($http, $q, ApiPath) {
    var service = this;
    var request, response, busy = false;

    service.getMatchedMenuItems = function(searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      busy = true;

      return getServerResponse()
      .then(function(response) {
        var foundItems = [];
        var allItems = response.data.menu_items;
        allItems.forEach(function(item) {
          if (isSuitable(item.description, searchTerm)) {
            foundItems.push(item);
          }
        });
        busy = false;
        return foundItems;
      });

      function getServerResponse() {
        var promise;
        if (response) {
          promise = $q.when(response);
        }
        else if (request) {
          promise = request;
        }
        else {
          request = $http.get(ApiPath + "/menu_items.json")
          .then(function(resp) {
            response = resp;
            return response;
          });
          promise = request;
        }
        return promise;
      }

      function isSuitable(description, searchTerm) {
        return description.toLowerCase().indexOf(searchTerm) >= 0;
      }

    };

    service.isBusy = function() {
      return busy;
    };

  }

  function FoundItemsDirective() {
    var ddo = {
      restrict: "E",
      scope: {
        title: "@title",
        items: "<",
        onRemove: "&"
      },
      templateUrl: 'foundItems.html',
      controller: 'FoundItemsDirectiveController as dirCtrl',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var dirCtrl = this;
    console.log('this: ', this);
  }

  function ItemLoaderIndicatorDirective() {
    var ddo = {
      restrict: "E",
      templateUrl: "loader/itemsloaderindicator.template.html",
      controller: ItemLoaderIndicatorDirectiveController,
      controllerAs: "indicator",
      bindToController: true
    };
    return ddo;
  }

  ItemLoaderIndicatorDirectiveController.$inject = ['MenuSearchService'];
  function ItemLoaderIndicatorDirectiveController(MenuSearchService) {
    var indicator = this;

    indicator.isBusy = function() {
      return MenuSearchService.isBusy();
    };

  };

})();
