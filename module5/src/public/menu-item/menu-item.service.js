(function () {
'use strict';

angular.module('public')
 .service('MenuItemService', ['$http', '$q', function($http, $q){
    var service = this;

    service.getItem = function(shortName){
        var deffered = $q.defer();

        $http({
          url : 'https://coursera-restorans.herokuapp.com/menu_items/'+shortName+'.json'
        }).then(function(result){
            deffered.resolve(result.data);
        }, function(error){
            console.log(error);
            deffered.reject(error);
        });

        return deffered.promise;
    };
 }]);


})();
