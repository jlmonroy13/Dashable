
(function () { 
  angular
    .module('CheckIn')
    .factory('checkinFactory', checkinFactory);

    checkinFactory.$inject = ['$http'];

    function checkinFactory($http) {
      var factory = {
            getUserProjects:      getUserProjects,
            getProjectTask:       getProjectTask,
            getTimeBills:         getTimeBills,
            getCheckinsHistory:   getCheckinsHistory
          };
      return factory;
      
      function getUserProjects() {
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:3002/api/1/projects",
          "method": "GET",
          "headers": {
            "content-type": "application/json"
          }
        };
        return $http(settings).then(function (data){
          return data.data;
        });
      }
      function getProjectTask(projectID) {
        var settings = { 
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:3002/api/1/projects/"+projectID+"/tasks",
          "method": "GET",
          "headers": {
            "content-type": "application/json"
          }
        };
        return $http(settings).then(function (data){
          return data.data;
        });
      }
      function getTimeBills() {
        var settings = { 
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:3002/api/1/time_bills/recent",
          "method": "GET",
          "headers": {
            "content-type": "application/json"
          }
        };
        return $http(settings).then(function (data){
          return data.data;
        });
      }
      function getCheckinsHistory() {
        var settings = { 
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:3002/api/1/time_bills/history",
          "method": "GET",
          "headers": {
            "content-type": "application/json"
          }
        };
        return $http(settings).then(function (data){
          return data.data;
        });
      }     
    }
})();
