(function() {
  angular
    .module('CheckIn')
    .controller('loginController', loginController);
    loginController.$inject = ['checkinFactory','$window', 'authenticationFactory', 'checkinFactory', '$location', 'alertify'];
    function loginController(checkinFactory, $window, authenticationFactory, checkinFactory, $location, alertify) {
      var vm  = this;
      
      vm.login = login; 

      function login() {
        authenticationFactory.login().then(getProjects); 
      }
      function getProjects(data) {
        checkinFactory.fetchUserProjects().then(getCheckinsHistory);
      } 
      function getCheckinsHistory(){
        checkinFactory.fetchCheckinsHistory().then(function(){
          alertify.log('Welcome! you have signed up successfully');
          $location.path('/checkin'); 
        });
      }
    }
})(); 




