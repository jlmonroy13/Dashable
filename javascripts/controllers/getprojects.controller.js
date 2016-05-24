(function() {
  angular
    .module('CheckIn')
    .controller('getProjectsController', getProjectsController);
    getProjectsController.$inject = ['checkinFactory', '$scope', '$timeout'];
    function getProjectsController(checkinFactory, $scope, $timeout) {
      var vm          =   this,
          projectId;
      vm.getProjects        =   getProjects;
      vm.getProjectId       =   getProjectId;
      vm.configProjects     =   {maxItems: 1};

      function getProjects() {
        checkinFactory.getUserProjects()//jwt 
          .then(displayProjects);
      }

      function displayProjects(data) {
        $.each(data.response, function(index, value) {
          vm.optionsProjects.push({value: value.id, text: value.title});
        });
      }
      function getProjectId(response) {
        vm.optionsTask = [];
        projectId = response;
        getProjectTask(projectId);
        checkinFactory.getTimeBills()//get last 15 checkins
          .then(function(data) {
            console.log(data);
          });
      }
      function getProjectTask(projectId) {
        checkinFactory.getProjectTask(projectId).then(displayTask);
      }
      function displayTask(data) {
        $.each(data.response, function(index, value) {
          vm.optionsTask.push({value: value.id, text: value.title});
        });
      }
      getProjects(); 
    }
})();  