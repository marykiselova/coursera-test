(function () {
'use strict';

  angular.module('moduleOneApp', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope){
      $scope.lunchItems = "";
      $scope.message = "";
      $scope.messageColor = "";

      $scope.checkLunch = function(){
        if($scope.lunchItems.length === 0) {
           $scope.message = "Please enter data first";
           $scope.messageColor = "red";
           return;
        }

        var items = $scope.lunchItems.split(",", 1);
        if(items.length <= 3){
           $scope.message = "Enjoy";
           $scope.messageColor = "green";
           return;
        }

        $scope.message = "Too much!";
        $scope.messageColor = "green";
      }

    }




})();
