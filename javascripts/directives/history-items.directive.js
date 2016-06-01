(function () {  
  angular
    .module("CheckIn")
    .directive('historyItems', historyItems);
    historyItems.$inject = ['checkinFactory'];
    function historyItems(checkinFactory) { 
      var directive = {
        restrict: 'E',
        templateUrl: '/assets/templates/pages/history/history-items.html',
        bindToController: {
          checkins: '=',
          deleteStatus: '='
        },
        controllerAs: "vm",
        controller: historyDirectiveController
      };
      return directive;
      function historyDirectiveController(){
        vm                 = this;
        vm.removeCheckin   = removeCheckin;
        vm.deleteCheckin   = {time_bill: 
                              {
                                project_id : '',
                                task_id: '',
                                duration: '',
                                tran_date: '',
                                memo: ''
                              }
                             };
        function removeCheckin(data) {
          console.log(data.id);
          vm.deleteCheckin = {time_bill: 
                              {
                                project_id : data.project.id,
                                task_id: data.task.id,
                                duration: data.hours,
                                tran_date: data.date,
                                memo: data.memo
                              }
                             };
          console.log(vm.deleteCheckin);
          checkinFactory.deleteCheckin(data.id)
            .then(function(response) {
              console.log(response);
              vm.deleteStatus = true;
            })               
        }
      }
    }
})();    