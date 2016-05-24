(function () {  
  angular
    .module("CheckIn")
    .directive('historyItems', historyItems);

    function historyItems() { 
      var directive = {
        restrict: 'E',
        templateUrl: '/assets/templates/pages/history/history-items.html',
        bindToController: {
          checkins: '='
        },
        controllerAs: "vm",
        controller: historyDirectiveController
      };
      return directive;
      function historyDirectiveController(){
      }
    }
})();    