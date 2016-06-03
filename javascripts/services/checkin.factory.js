
(function () { 
  angular
    .module('CheckIn')
    .factory('checkinFactory', checkinFactory);

    checkinFactory.$inject = ['$http'];

    function checkinFactory($http) {
      var url      = "http://dashable-netsuite-api-prod.herokuapp.com/api/1",
          checkinsHistory = [],
          recentCheckins  = [],
          projects        = [],
          returnedCheckin,
          factory  = {
            getUserProjects       :     getUserProjects,
            fetchUserProjects     :     fetchUserProjects,
            getProjectTask        :     getProjectTask,
            fetchRecentsCheckins  :     fetchRecentsCheckins,
            getRecentsCheckins    :     getRecentsCheckins,
            fetchCheckinsHistory  :     fetchCheckinsHistory,
            getCheckinsHistory    :     getCheckinsHistory,
            createCheckin         :     createCheckin,
            deleteCheckin         :     deleteCheckin,
            returnCheckin         :     returnCheckin,
            updateCheckin         :     updateCheckin
          };
      return factory;
      

      //Get info from Checkin Netsuite API
      function fetchUserProjects() {
        return $http.get(url+"/projects").then(function (promise){
          projects = promise.data.response;
        });
      }
      function getUserProjects() {
        return projects;
      }

      function getProjectTask(projectID) {
        return $http.get(url+"/projects/"+projectID+"/tasks").then(function (response){
          return response.data;
        });
      }

      function fetchRecentsCheckins() {
        return $http.get(url+"/time_bills/recent").then(function (promise){
          recentCheckins = promise.data.response;
        });
      }
      function getRecentsCheckins() {
        return recentCheckins;
      }

      function fetchCheckinsHistory() {
        return $http.get(url+"/time_bills/history").then(function (response){
          checkinsHistory = response.data.response;
        });
      }
      function getCheckinsHistory() {
        return checkinsHistory;
      }

      function returnCheckin(id) {
        angular.forEach(checkinsHistory, function(value, index) {
          if(value.id == id) {
            returnedCheckin = value;
          }
        });
        return returnedCheckin;
      }

      //Modifying Checkin Netsuite database
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
    }
})();
