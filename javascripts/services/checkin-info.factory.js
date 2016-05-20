
(function () { 
  angular
    .module('CheckIn')
    .factory('checkinInfoFactory', checkinInfoFactory);

    checkinInfoFactory.$inject = ['$http','GAuth', 'GData'];

    function checkinInfoFactory() {

      var  factory = {
            login: login
          };
      return factory;
      
      function login() {
        return GAuth.checkAuth().then(actualUser, authenticateUser);
        function actualUser(user){}; // angular-google-gapi module needs this function to work 
        function authenticateUser() {
          GAuth.login().then(getUserInfoAndToken);
        }
        function getUserInfoAndToken() {
          console.log(GData.getUser());
          GAuth.getToken().then(getJWT);
        }
        function getJWT(token){
          console.log(token);
          $.post( "http://localhost:3002/users/auth/google_oauth2/callback", 
          { access_token: token.access_token })
          .done(function(jwt) {
            return jwt;
          });
        }
      }
         
    }
})();
