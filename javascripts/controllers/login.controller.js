(function() {
  angular
    .module('CheckIn')
    .controller('mainController', mainController);
    mainController.$inject = ['GAuth', 'GData'];
    function mainController(GAuth, GData) {
      var vm = this;
      vm.login = function () {
        GAuth.checkAuth().then(
          function (user) {
            console.log(user);
            console.log(GData.getUserId());
          },
          function() {
            GAuth.login().then(function(){
              console.log(GData.getUser());
              GAuth.getToken().then(function (token){
                console.log(token);
                $.post( "http://localhost:3002/users/auth/google_oauth2/callback", 
                { access_token: token.access_token })
                .done(function( data ) {
                  console.log( data.response.jwt ); 
                  if( data !== '') { 
                    var jwt = "bearer "+data.response.jwt;
                    window.location.replace('/#/checkin');
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
                    });
                  }
                  
                });
              });
            });
          }
        );
      };
    }
})();




