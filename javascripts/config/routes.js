(function() {
angular
  .module('CheckIn')
  .config(router);

  router.$inject = ['$routeProvider']; 

  function router($routeProvider) {
    $routeProvider
      .when('/checkin', {
        templateUrl: '/assets/templates/pages/checkin/index.html',
        controller: 'getProjectsController',
        controllerAs: 'projectsCtrl'
      })
      .when('/history', {
        templateUrl: '/assets/templates/pages/history/index.html',
        controller: 'getHistoryController',
        controllerAs: 'historyCtrl'
      })
      .when('/', {
        templateUrl: '/assets/templates/pages/home/index.html',
        controller: 'loginController',
        controllerAs: 'login'
      })
      .otherwise( { redirectTo: '/'});
  }   
})();