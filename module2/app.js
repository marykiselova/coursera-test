(function () {
'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
  function ToBuyController($scope, ShoppingListCheckOffService){
      var buy = this;

      buy.buyItem = function(item){
         ShoppingListCheckOffService.buyItem(item);
      };

      buy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

  }

  AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
  function AlreadyBoughtController($scope, ShoppingListCheckOffService){
    var bought = this;

    bought.alreadyBoughtItems = ShoppingListCheckOffService.getBoughtItems();

  }

  function ShoppingListCheckOffService(){
      var service = this;

      var toBuyItems = [
        {
          name : "cookies",
          count : 10
        },
        {
          name : "coffie",
          count : 2
        },
        {
          name : "milk",
          count : 3
        }
      ];
      var boughtItems = [];

      service.buyItem = function(item){
        var index = toBuyItems.indexOf(item);
        toBuyItems.splice(index, 1);

        boughtItems.push(item);
      }

      service.getToBuyItems = function(){
          return toBuyItems;
      };

      service.getBoughtItems = function(){
          return boughtItems;
      };
  }


})();
