(function () {
  angular
    .module('CheckIn')
    .run(run);
    run.$inject = ['$location', 'GAuth', 'GApi', 'GData', '$rootScope']; 
    function run($location, GAuth, GApi, GData, $rootScope) {
      // console.log($location);
      $rootScope.gdata = GData;

      var CLIENT = '472489925421-knn9iga4j0a6jak33hgs6si5ag46a91d.apps.googleusercontent.com';

      GApi.load('oauth2', 'v2');
      GAuth.setClient(CLIENT);
      GAuth.setScope("https://www.googleapis.com/auth/userinfo.email"); 
    }

  angular
    .module('CheckIn')
    .config(config);
    config.$inject = ['localStorageServiceProvider', '$httpProvider']; 
    function config(localStorageServiceProvider, $httpProvider) {
      localStorageServiceProvider
        .setPrefix('CheckIn')
        .setNotify(true, true);

      $httpProvider.interceptors.push('httpInterceptorFactory');  
    }
})();