(function () {  
  angular
    .module("CheckIn")
    .directive('calendarWeek', calendarWeek);

    function calendarWeek() { 
      var directive = {
        restrict: 'E',
        templateUrl: '/assets/templates/pages/checkin/calendar-week.html',
        bindToController: {
          week: '='
        },
        controllerAs: "vm",
        controller: calendarWeekController
      };
      return directive;
      function calendarWeekController(){
      }
    }
})();   