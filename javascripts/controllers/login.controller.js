(function() {
  angular
    .module('CheckIn')
    .controller('loginController', loginController);
    loginController.$inject = ['$window', 'authenticationFactory', 'checkinFactory', '$location', 'alertify'];
    function loginController($window, authenticationFactory, checkinFactory, $location, alertify) {
      var vm  = this;
      
      vm.login = login; 

      function login() {
        authenticationFactory.login().then(function(data) {
          $location.path('/checkin'); 
        });
      } 
    }
})(); 




