(function() {
  angular
    .module('CheckIn')
    .controller('getHistoryController', getHistoryController);
    getHistoryController.$inject = ['checkinFactory'];
    function getHistoryController(checkinFactory) {
      var vm  = this;

      vm.getHistory = getHistory; 

      function getHistory() {
        checkinFactory.getUserHistory()//jwt
          .then(bindHistory);
      }
      function bindHistory(data) {
        console.log(data);
        vm.history = data.response;
      }
      getHistory();
    }
})();  