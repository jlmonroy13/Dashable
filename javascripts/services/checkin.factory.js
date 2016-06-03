
(function () { 
  angular
    .module('CheckIn')
    .factory('checkinFactory', checkinFactory);

    checkinFactory.$inject = ['$http'];

    function checkinFactory($http) {
      var url      = "http://dashable-netsuite-api-prod.herokuapp.com/api/1",
          checkinsHistory = [],
          projects        = [],
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
        return $http.get(url+"/projects").then(function (promise){
          projects = promise.data.response;
          console.log(projects);
          return promise.data;
        });
      }
      function getProjectTask(projectID) {
        return $http.get(url+"/projects/"+projectID+"/tasks").then(function (response){
          return response.data;
        });
      }
      function getTimeBills() {
        return $http.get(url+"/time_bills/recent").then(function (response){
          return response.data;
        });
      }
      function getCheckinsHistory() {
        return $http.get(url+"/time_bills/history").then(function (response){
          checkinsHistory = response.data.response;
          return response.data;
        });
      }
      function createCheckin(data) {
        return $http.post(url+"/time_bills", data)
          .then(function (response){
            return response;
          });
      }
      function deleteCheckin(data) {
        return $http.delete(url+"/time_bills/"+data)
          .then(function (response) {
            return response;
          });
      }
      function updateCheckin(id, data) {
        return $http.put(url+"/time_bills/"+id, data)
          .then(function (response){
            return response;
          });
      }
      function returnCheckin(id) {
        angular.forEach(checkinsHistory, function(value, index) {
          if(value.id == id) {
            returnedCheckin = value;
          }
        });
        return returnedCheckin;
      }      
    }
})();
