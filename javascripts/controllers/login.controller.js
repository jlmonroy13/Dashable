(function() {

  function Login($auth) {
    var vm = this;

    var authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(response) {
        // Something went wrong.
      });
    }
    
    vm.authenticate = authenticate;
  } 

  angular
    .module('CheckIn')
    .controller('LoginCtrl', Login);
    Login.$inject = ['$auth'];
})();
