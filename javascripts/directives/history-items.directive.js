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
          console.log(data);
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
        }
      }
    }
})();    