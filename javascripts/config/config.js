(function () {
  angular
    .module('CheckIn')
    .run(run);
    run.$inject = ['$location', 'GAuth', 'GApi', 'GData', '$rootScope']; 
    function run($location, GAuth, GApi, GData, $rootScope) {
      // console.log($location);
      $rootScope.gdata = GData;

      var CLIENT = '767533878479-svf3420ha7ggdrgoqq78kuanbm777ckc.apps.googleusercontent.com';

      GApi.load('oauth2', 'v2');
      GAuth.setClient(CLIENT);
      GAuth.setScope("https://www.googleapis.com/auth/userinfo.email"); 
    }

  angular
    .module('CheckIn')
    .config(config);
    config.$inject = ['localStorageServiceProvider', '$httpProvider', '$momentProvider']; 
    function config(localStorageServiceProvider, $httpProvider, $momentProvider) {
      //LOCAL STORAGE CONFIG
      localStorageServiceProvider
        .setPrefix('CheckIn')
        .setNotify(true, true);
      //$HTTP INTERCEPTORS CONFIG
      $httpProvider.interceptors.push('httpInterceptorFactory');  
      //MOMENT CONFIG
      $momentProvider
        .asyncLoading(false)
        .scriptUrl('//cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js');
    }
  //FILTER TO REVERSE IN NG-REPEAT
  angular
    .module('CheckIn')
    .filter('reverse',reverse);
    function reverse() {
      return function(items) {
        return items.slice().reverse();
      }
    }
})();