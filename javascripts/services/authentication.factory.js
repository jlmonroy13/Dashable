
(function () { 
  angular
    .module('CheckIn')
    .factory('authenticationFactory', authenticationFactory);

    authenticationFactory.$inject = ['$http','GAuth', 'GData', '$rootScope'];

    function authenticationFactory($http, GAuth, GData, $rootScope) {
      var factory = {
            login: login,
            request: function($config) {
                      if( $rootScope.user.loginticket )
                      {
                       $config.headers['your-auth-ticket'] = $rootScope.user.loginticket;
                      }
                      return $config; 
                    }
          };
      return factory;
      
      function login() {
        return GAuth.checkAuth().then(actualUser, authenticateUser);
        function actualUser(user){}; // angular-google-gapi module needs this function to work 
        function authenticateUser() {
          return GAuth.login().then(getUserInfoAndToken);
        }
        function getUserInfoAndToken() {
          // console.log(GData.getUser());
          return GAuth.getToken().then(getJWT);
        }
        function getJWT(token){
          // console.log(token);
          return $http.post("http://localhost:3002/users/auth/google_oauth2/callback?access_token="+token.access_token)
          .then(function(response) {
            return response.data;
            console.log(response.data);
          });
        }
      }    
    }
})();
