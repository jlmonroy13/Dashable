(function () {  
  angular
    .module("CheckIn")
    .directive('historyItems', historyItems);
    historyItems.$inject = ['checkinFactory', 'alertify', '$timeout', '$location', '$route'];
    function historyItems(checkinFactory, alertify, $timeout, $location, $route) { 
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
          alertify.confirm('Are you sure you want to delete this Check-in?',
              function onOk() {
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
                    checkinFactory.fetchCheckinsHistory();
                    $timeout(function() {
                      vm.deleteStatus = false;
                      $timeout(function() {
                        $route.reload();
                      }, 300);
                    }, 4000);
                  });  
              }, 
              function onCancel() {}
          );              
        }
      }
    }
})();    