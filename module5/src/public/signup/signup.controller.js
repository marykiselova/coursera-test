(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuItemService', 'UserService', '$scope'];
function SignUpController(MenuItemService, UserService, $scope) {
  var $ctrl = this;

  $ctrl.saved = false;
  $ctrl.user = {};

  $ctrl.submit = function(){


     MenuItemService.getItem($ctrl.user.favorite).then(
        function(item){
          console.log('favorite item', item);
          $ctrl.user.favoriteItem = item;

          $scope.signupForm['favorite'].$setValidity('server', true);
          UserService.saveUser($ctrl.user);

          $ctrl.saved = true;

        },
        function(error){
          console.log(error);
          $scope.signupForm['favorite'].$setValidity('server', false);

          $ctrl.saved = false;
        }
     )

  };

}

})();
