
(function () { 
  angular
    .module('CheckIn')
    .factory('authenticationFactory', authenticationFactory);

    authenticationFactory.$inject = ['$http','GAuth', 'GData', 'localStorageService'];

    function authenticationFactory($http, GAuth, GData, localStorageService) {
      var factory = {
            login: login
          };
      return factory;
      
      function login() {
        return GAuth.checkAuth().then(actualUser, authenticateUser);
        function actualUser(user){}; // angular-google-gapi module needs this function to work 
        function authenticateUser() {
          return GAuth.login().then(getUserInfoAndToken);
        }
        function getUserInfoAndToken() {
          console.log(GData.getUser());
          return GAuth.getToken().then(getJWT);
        }
        function getJWT(token){
          console.log(token);
          return $http.post("http://dashable-netsuite-api-st.herokuapp.com/users/auth/google_oauth2/callback?access_token="+token.access_token)
          .then(function(response) {
            console.log(response);
            setLocalStorage('jwt', response.data.response.jwt)
            return response.data;
          });
        }
      } 
      function setLocalStorage(key, val) {
        return localStorageService.set(key, val);
      }   
    }
})();
