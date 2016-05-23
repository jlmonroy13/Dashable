(function() {
  angular
    .module('CheckIn')
    .controller('mainController', mainController);
    mainController.$inject = ['$window', 'authenticationFactory', 'checkinFactory'];
    function mainController($window, authenticationFactory, checkinFactory) {
      var vm  = this,
          jwt;

      vm.login = login; 
      vm.prueba = [{title: "hola"}, {title: "chao"}];

      function login() {
        authenticationFactory.login()
          .then(bindJWT);
      } 
      function bindJWT(data) {
        $window.location.href = '/#/checkin';
        jwt = data.response.jwt;
        // console.log(jwt);
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




