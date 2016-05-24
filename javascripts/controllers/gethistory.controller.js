(function() {
  angular
    .module('CheckIn')
    .controller('getHistoryController', getHistoryController);
    getHistoryController.$inject = ['checkinFactory'];
    function getHistoryController(checkinFactory) {
      var vm  = this;

      vm.getCheckinsHistory = getCheckinsHistory; 

      function getCheckinsHistory() {
        checkinFactory.getCheckinsHistory()//jwt
          .then(bindHistory);
      }
      function bindHistory(data) {
        console.log(data);
        vm.history = data.response;
      }
      getCheckinsHistory();
    }
})();  