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
              $config.headers['Authorization'] = 'Bearer '+jwt;
            }
            return $config;
        }
      };
      return sessionInjector;
    }
})();