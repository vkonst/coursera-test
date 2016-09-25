(function(){
  'use strict'

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;
    toBuyList.items = ShoppingListCheckOffService.getItemsToBuy();

    toBuyList.checkOut = function(itemIndex) {
      ShoppingListCheckOffService.checkOut(itemIndex);
    };

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;
    boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = items;
    var boughtItems = [];

    service.getItemsToBuy = function() {
      return toBuyItems;
    };

    service.getBoughtItems = function() {
      return boughtItems;
    };

    service.checkOut = function(itemIndex) {
      var item = toBuyItems[itemIndex];
      toBuyItems.splice(itemIndex, 1);
      boughtItems.push(item);
    };

  }

  var items = [
    {name: "Snowboards" , quantity: 3},
    {name: "Boots", quantity: 4},
    {name: "Bindings", quantity: 6},
    {name: "Helmets", quantity: 2},
    {name: "Back Protection", quantity: 2},
    {name: "Avalanche Beacons", quantity: 2},
    {name: "Skipasses", quantity: 2}
  ];

})();
