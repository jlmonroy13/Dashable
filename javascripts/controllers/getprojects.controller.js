(function() {
  angular
    .module('CheckIn')
    .controller('getProjectsController', getProjectsController);
    getProjectsController.$inject = ['checkinFactory'];
    function getProjectsController(checkinFactory) {
      var vm  = this;

      vm.getProjects = getProjects; 

      function getProjects() {
        checkinFactory.getUserProjects()//jwt
          .then(bindProjects);
      }
      function bindProjects(data) {
        vm.projects = data.response;
      }
    }
})(); 