(function() {
angular
  .module('CheckIn')
  .config(router);

  router.$inject = ['$routeProvider'];

  function router($routeProvider) {
    $routeProvider
      .when('/checkin', {
        templateUrl: '/assets/templates/pages/checkin/index.html'
      })
      .when('/history', {
        templateUrl: '/assets/templates/pages/history/index.html'
      })
      .when('/', {
        templateUrl: '/assets/templates/pages/home/index.html'
      })
      .otherwise( { redirectTo: '/'});
  }   
})();