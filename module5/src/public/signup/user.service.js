(function () {
'use strict';

angular.module('public')
 .service('UserService', function(){
    var service = this;

     service.saveUser = function(user){
       service.currentUser = user;
     }

     service.loadUser = function(){
       return service.currentUser;
     }
 });


})();
