
(function () { 
  angular
    .module('CheckIn')
    .factory('checkinFactory', checkinFactory);

    checkinFactory.$inject = ['$http'];

    function checkinFactory($http) {
      var factory = {
            getUserProjects: getUserProjects,
            getUserHistory: getUserHistory
          };
      return factory;
      
      function getUserProjects() {
        // if( data !== '') { 
          // var jwt = "bearer " + data;
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3002/api/1/projects",
            "method": "GET",
            "headers": {
              "content-type": "application/json"
              // "authorization": jwt
            }
          };
          return $http(settings).then(function (data){
            return data.data;
          });
        // }
      }
      function getUserHistory() {
        // if( data !== '') { 
          // var jwt = "bearer " + data;
          var settings = { 
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3002/api/1/projects/5362/tasks",
            "method": "GET",
            "headers": {
              "content-type": "application/json"
              // "authorization": jwt
            }
          };
          return $http(settings).then(function (data){
            return data.data;
          });
        // }
      }    
    }
})();
