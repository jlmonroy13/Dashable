(function () {
  angular
    .module('CheckIn')
    .run(config);
    config.$inject = ['$location', 'GAuth', 'GApi', 'GData', '$rootScope']; 
    function config($location, GAuth, GApi, GData, $rootScope) {
      // console.log($location);
      $rootScope.gdata = GData;

      var CLIENT = '472489925421-knn9iga4j0a6jak33hgs6si5ag46a91d.apps.googleusercontent.com';

      GApi.load('oauth2', 'v2');
      GAuth.setClient(CLIENT);
      GAuth.setScope("https://www.googleapis.com/auth/userinfo.email"); 
      
      $('.js-select').selectize({
        sortField: 'text'
      });

    }
})();