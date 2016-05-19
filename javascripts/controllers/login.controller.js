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
                  console.log(data);
                  if( data !== '') { 
                    window.location.replace('/#/checkin');
                  }
                  
                });
              });
            });
          }
        );
      };
    }
})();




