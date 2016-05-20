(function() {
  angular
    .module('CheckIn')
    .controller('mainController', mainController);
    mainController.$inject = ['GAuth', 'GData'];
    function mainController(GAuth, GData) {
      var vm = this;
      vm.prueba = [{'title' : "prueba1" },{'title' : "prueba2"}];
      vm.login = function () {
        GAuth.checkAuth().then(actualUser, authenticateUser);

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
          .done(getUserProjects);
        }
        function getUserProjects(data) {
          console.log(data.response.jwt); 
          if( data !== '') { 
            var jwt = "bearer " + data.response.jwt;
            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "http://localhost:3002/api/1/projects",
              "method": "GET",
              "headers": {
                "content-type": "application/json",
                "authorization": jwt
              }
            };
            $.ajax(settings).done(function (response) {
              console.log(response);
              vm.projects = response.response;
              console.log(vm.projects);
              window.location.replace('/#/checkin');
            });
          }
        }
      };
    }
})();




