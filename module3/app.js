(function () {
'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .directive('itemsLoaderIndicator', LoaderIndicatorDirective);

  NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];

  function NarrowItDownController($scope, MenuSearchService){
      var controller = this;
      controller.foundMenuItems = [];
      controller.loading = false;

      controller.searchItems = function(searchTerm){
         if(searchTerm.length === 0){
            controller.foundMenuItems = [];
            return;
         }
         
         controller.loading = true;

         MenuSearchService.getMatchedMenuItems(searchTerm).then(function(found){
            controller.foundMenuItems = found;
            controller.loading = false;
            console.log(found);
         },
         function(error){
            console.log(error);
            controller.loading = false;
         });
      }

      controller.removeItem = function(index){
          controller.foundMenuItems.splice(index, 1);
      };
  };

  MenuSearchService.$inject = ['$http', '$q'];

  function MenuSearchService($http, $q){
    var service = this;


    service.getMatchedMenuItems = function(searchTerm){
      var deferred = $q.defer();

      $http({
        url : 'https://davids-restaurant.herokuapp.com/menu_items.json'
      }).then(function (result) {
          var foundItems = [];
          angular.forEach(result.data.menu_items, function(item, key) {
            if(item.description.indexOf(searchTerm) > -1){
              foundItems.push(item);
            }
          });

          deferred.resolve(foundItems);
      });

      return deferred.promise;

    };

  };

  function FoundItemsDirective() {
     var ddo = {
        templateUrl: 'listItem.html',
        restrict: "E",
        scope: {
           items : '<',
           onRemove: '&'
         },
         controller: FoundItemsDirectiveController,
         controllerAs: 'foundCtrl',
         bindToController: true
     };
     return ddo;
  };

  function FoundItemsDirectiveController(){

  };

  function LoaderIndicatorDirective(){
    var ddo = {
      templateUrl : "loader/itemsloaderindicator.template.html"
    }

    return ddo;
  }


})();
