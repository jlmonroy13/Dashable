(function() {
  angular
    .module('CheckIn')
    .controller('getHistoryController', getHistoryController);
    getHistoryController.$inject = ['checkinFactory', 'alertify'];
    function getHistoryController(checkinFactory, alertify) {
      var vm  = this,
          num;
      vm.wasDeleted           =   false;
      vm.history = checkinFactory.getCheckinsHistory();
      angular.forEach(vm.history, function(checkin, key2) {
        num = parseInt(checkin.hours[checkin.hours.length -1]);
        if(num === 0) {
          checkin.hours = checkin.hours.slice(0,1);
        }
      });
      console.log(vm.history);
      console.log(num);
    }
})();  