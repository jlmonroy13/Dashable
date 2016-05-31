
(function () { 
  angular
    .module('CheckIn')
    .factory('checkinFactory', checkinFactory);

    checkinFactory.$inject = ['$http'];

    function checkinFactory($http) {
      var url     = "http://dashable-netsuite-api-prod.herokuapp.com/",
          factory = {
            getUserProjects:      getUserProjects,
            getProjectTask:       getProjectTask,
            getTimeBills:         getTimeBills,
            getCheckinsHistory:   getCheckinsHistory,
            createCheckin:        createCheckin,
            deleteCheckin:        deleteCheckin
          };
      return factory;
      
      function getUserProjects() {
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": url+"api/1/projects",
          "method": "GET",
          "headers": {
            "content-type": "application/json"
          }
        };
        return $http(settings).then(function (response){
          return response.data;
        });
      }
      function getProjectTask(projectID) {
        var settings = { 
          "async": true,
          "crossDomain": true,
          "url": url+"api/1/projects/"+projectID+"/tasks",
          "method": "GET",
          "headers": {
            "content-type": "application/json"
          }
        };
        return $http(settings).then(function (response){
          return response.data;
        });
      }
      function getTimeBills() {
        var settings = { 
          "async": true,
          "crossDomain": true,
          "url": url+"api/1/time_bills/recent",
          "method": "GET",
          "headers": {
            "content-type": "application/json"
          }
        };
        return $http(settings).then(function (response){
          return response.data;
        });
      }
      function getCheckinsHistory() {
        var settings = { 
          "async": true,
          "crossDomain": true,
          "url": url+"api/1/time_bills/history",
          "method": "GET",
          "headers": {
            "content-type": "application/json"
          }
        };
        return $http(settings).then(function (response){
          return response.data;
        });
      }
      function createCheckin(data) {
        return $http.post(url+"api/1/time_bills", data)
          .then(function (response){
            return response;
          });
      }
      function deleteCheckin(data) {
        return $http.delete(url+"api/1/time_bills/"+data)
          .then(function (response) {
            return response;
          });
      }      
    }
})();
