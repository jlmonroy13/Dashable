(function() {
  angular
    .module('CheckIn')
    .controller('getProjectsController', getProjectsController);
    getProjectsController.$inject = ['checkinFactory', '$scope', '$timeout'];
    function getProjectsController(checkinFactory, $scope, $timeout) {
      var vm  = this;

      vm.getProjects = getProjects; 

      function getProjects() {
        checkinFactory.getUserProjects()//jwt
          .then(bindProjects);
      }
      function bindProjects(data) {
        console.log(data);
        vm.projects = data.response;
        console.log(data.response);
        $.each(data.response, function(index, value) {
          $scope.myOptions.push({value: value.id, text: value.title});
        });
      }
      getProjects();
    }
})();  