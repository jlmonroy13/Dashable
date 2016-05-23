(function() {
angular
  .module('CheckIn')
  .config(router);

  router.$inject = ['$routeProvider']; 

  function router($routeProvider) {
    $routeProvider
      .when('/checkin', {
        templateUrl: '/assets/templates/pages/checkin/index.html',
        controller: 'mainController',
        controllerAs: 'login'
      })
      .when('/history', {
        templateUrl: '/assets/templates/pages/history/index.html'
      })
      .when('/', {
        templateUrl: '/assets/templates/pages/home/index.html',
        controller: 'mainController',
        controllerAs: 'login'
      })
      .otherwise( { redirectTo: '/'});
  }   
})();