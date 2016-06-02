
(function () { 
  angular
    .module('CheckIn')
    .factory('checkinFactory', checkinFactory);

    checkinFactory.$inject = ['$http'];

    function checkinFactory($http) {
      var url      = "http://dashable-netsuite-api-prod.herokuapp.com/",
          checkins = [],
          returnedCheckin,
          factory  = {
            getUserProjects:      getUserProjects,
            getProjectTask:       getProjectTask,
            getTimeBills:         getTimeBills,
            getCheckinsHistory:   getCheckinsHistory,
            createCheckin:        createCheckin,
            deleteCheckin:        deleteCheckin,
            returnCheckin:        returnCheckin,
            updateCheckin:        updateCheckin
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
          checkins = response.data.response;
          console.log(checkins);
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
      function updateCheckin(id, data) {
        return $http.put(url+"api/1/time_bills/"+id, data)
          .then(function (response){
            return response;
          });
      }
      function returnCheckin(id) {
        angular.forEach(checkins, function(value, index) {
          if(value.id == id) {
            returnedCheckin = value;
          }
        });
        return returnedCheckin;
      }      
    }
})();
