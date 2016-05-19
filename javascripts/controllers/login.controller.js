(function() {

  function Login($auth) {
    var vm = this;

    var authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function(response) {
        console.log(response);
        $.post( "http://localhost:3001/users/auth/google_oauth2/callback", 
          { code: response.code })
          .done(function( data ) {
            alert( "Data Loaded: " + data );
          });
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
