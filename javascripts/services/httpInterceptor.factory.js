(function() {
  angular
    .module('CheckIn')
    .factory('httpInterceptorFactory', httpInterceptorFactory);

    httpInterceptorFactory.$inject = ['localStorageService'];

    function httpInterceptorFactory(localStorageService) {
      var sessionInjector = {
        request: function($config) {
          var jwt = localStorageService.get('jwt');
            if (jwt !== '') {
              $config.async                     = true;
              $config.crossDomain               = true;
              $config.headers['Authorization']  = 'Bearer '+jwt;
              $config.headers['content-type']   = 'application/json';
            }
            return $config;
        }
      };
      return sessionInjector;
    }
})();