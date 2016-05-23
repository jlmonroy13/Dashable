(function() {
  angular
    .module('CheckIn')
    .controller('loginController', loginController);
    loginController.$inject = ['$window', 'authenticationFactory', 'checkinFactory', '$location'];
    function loginController($window, authenticationFactory, checkinFactory, $location) {
      var vm  = this;

      vm.login = login; 
      vm.prueba = [{title: "hola"}, {title: "chao"}];

      function login() {
        authenticationFactory.login().then(function() {
          $location.path('/checkin');
        });
        
        // getProjects();
      } 
      // function getProjects() {
      //   checkinFactory.getUserProjects()//jwt
      //     .then(bindProjects);
      // }
      // function bindProjects(data) {
      //   vm.projects = data.response;
      //   console.log(vm.projects);
      // }
    }
})(); 




