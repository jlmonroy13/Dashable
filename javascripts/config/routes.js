(function() {
angular
  .module('CheckIn')
  .config(router);

  router.$inject = ['$routeProvider']; 

  function router($routeProvider) {
    $routeProvider
      .when('/checkin', {
        templateUrl: '/assets/templates/pages/checkin/index.html',
        controller: 'createCheckinController',
        controllerAs: 'checkinCtrl'
      })
      .when('/history', {
        templateUrl: '/assets/templates/pages/history/index.html',
        controller: 'getHistoryController',
        controllerAs: 'historyCtrl'
      })
      .when('/edit-checkin/:id', {
        templateUrl: '/assets/templates/pages/checkin/index.html',
        controller: 'editCheckinController',
        controllerAs: 'checkinCtrl'
      })
      .when('/', {
        templateUrl: '/assets/templates/pages/home/index.html',
        controller: 'loginController',
        controllerAs: 'login'
      })
      .otherwise( { redirectTo: '/'});
  }   
})();