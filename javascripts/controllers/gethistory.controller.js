(function() {
  angular
    .module('CheckIn')
    .controller('getHistoryController', getHistoryController);
    getHistoryController.$inject = ['checkinFactory', 'alertify'];
    function getHistoryController(checkinFactory, alertify) {
      var vm  = this;

      vm.getCheckinsHistory   =   getCheckinsHistory; 
      vm.wasDeleted           =   false;

      function getCheckinsHistory() {
        checkinFactory.getCheckinsHistory()//jwt
          .then(bindHistory);
      }
      function bindHistory(data) {
        vm.history = data.response;
      }
      getCheckinsHistory();
    }
})();  