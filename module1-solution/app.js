(function() {
  'use strict'

  angular.module('LunchCheck', [])
      .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {

    $scope.lunchMenuInput = "";
    $scope.lunchCheckResults = "";

    $scope.checkMenu = function() {
      var emptyItemReg = /\,\,+/g;
      var endingCommaReg = /,+$/;

      function getEmptyItems(lunchMenu) {
        var emptyItems;
        emptyItems = lunchMenu.match(emptyItemReg);
        if(!emptyItems)
          emptyItems = lunchMenu.match(endingCommaReg);
        return emptyItems;
      }

      function getMenuItems(lunchMenu) {
        var menuItems;
        if ( lunchMenu !== '' ) {
          lunchMenu = lunchMenu.replace(/\s/g, '');
          lunchMenu = lunchMenu.replace(endingCommaReg, '');
          lunchMenu = lunchMenu.replace(emptyItemReg, ",");
          menuItems = lunchMenu.split(",");
        }
        return menuItems;
      }

      var emptyItems = getEmptyItems($scope.lunchMenuInput);
      var menuItems  = getMenuItems ($scope.lunchMenuInput);
      setLunchCheckResults(menuItems);
      setDisclosure(emptyItems);
    };

    function setLunchCheckResults(menuItems) {
      if (menuItems) {
        $scope.lunchCheckResults = menuItems.length > 3 ? "Too much!" : "Enjoy!";
        $scope.CheckResultsStyle = menuItems.length > 3 ? "fail" : "pass";
      } else {
        $scope.lunchCheckResults = "Please enter data first"
        $scope.CheckResultsStyle = "";
      }
    }

    function setDisclosure(emptyItems) {
      var disclosure;
      if (emptyItems) {
        var plural = emptyItems.length > 1;
        disclosure = "Empty ";
        disclosure += plural ? "items " : "item ";
        disclosure += "(i.e., `" + emptyItems[0] + "`) ";
        disclosure += plural ? "is " : "are ";
        disclosure += "not considered as an item towards to the count";
      }
      $scope.disclosure = disclosure;
    }

  }
})();
