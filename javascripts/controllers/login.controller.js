(function() {
  angular
    .module('CheckIn')
    .controller('mainController', mainController);
    mainController.$inject = ['authenticationFactory', 'checkinFactory'];
    function mainController(authenticationFactory, checkinFactory) {
      var vm  = this,
          jwt;

      vm.login = login; 

      function login() {
        authenticationFactory.login()
          .then(bindJWT);
      } 
      function bindJWT(data) {
        jwt = data.response.jwt;
        console.log(jwt);
        getProjects();
      }
      function getProjects() {
        checkinFactory.getUserProjects(jwt)
          .then(bindProjects);
      }
      function bindProjects(data) {
        vm.projects = data.response;
        console.log(vm.projects);
      }
    }
})(); 




