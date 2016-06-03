(function() {
  angular
    .module('CheckIn')
    .controller('getHistoryController', getHistoryController);
    getHistoryController.$inject = ['checkinFactory', 'alertify'];
    function getHistoryController(checkinFactory, alertify) {
      var vm  = this;
      vm.wasDeleted           =   false;
      vm.history = checkinFactory.getCheckinsHistory();
    }
})();  