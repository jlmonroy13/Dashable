(function() {
  angular
    .module('CheckIn')
    .controller('createCheckinController', createCheckinController);
    createCheckinController.$inject = ['checkinFactory', 'getweeksFactory', '$timeout', '$moment', 'alertify', '$route'];
    function createCheckinController(checkinFactory, getweeksFactory, $timeout, $moment, alertify, $route) {
      var vm                         =   this,
          referenceDay               =   $moment(), 
          projects,
          tasks,
          checkinTemp,
          projectId;
      
      vm.leftNavStatus               =   true;
      vm.textFormTitle               =   "today's";
      vm.textFormButton              =   'add check-in';
      vm.configProjectsSelectize     =   {maxItems: 1};
      vm.configProjectsSelectize2    =   {maxItems: 1};
      vm.dates                       =   [];
      vm.actualWeek                  =   [];
      vm.lastWeek                    =   [];
      vm.last12Checkins              =   [];
      vm.selectWeek                  =   [];
      vm.optionsProjects             =   [];
      vm.changeWeek                  =   changeWeek;
      vm.statusButton                =   true;
      vm.selectedDate                =   {dateToDisplay: moment().format('dddd, MMM D'),
                                          day: $moment().format('dddd'),
                                          numberday: $moment().format('D'),
                                          dateFormat: $moment().format('YYYY-MM-DD')};
      vm.resetSelectedDates          =   resetSelectedDates;
      vm.createCheckin               =   createCheckin;
      vm.getProjectId                =   getProjectId;
      vm.getTaskId                   =   getTaskId;
      vm.projectId                   =   '';
      vm.taskId                      =   '';
      vm.checkinDone                 =   false;
      vm.statusCheckin               =   {project:false, task:false, duration: false, memo:false};
      vm.newCheckin                  =   {time_bill: 
                                          {
                                            project_id : '',
                                            project_name: '',
                                            task_id: '',
                                            task_name: '',
                                            duration: '',
                                            tran_date: '',
                                            memo: ''
                                          }
                                         };
      function displayProjects() { 
        projects = checkinFactory.getUserProjects(); 
        angular.forEach(projects, function(value, index) {
          vm.optionsProjects.push({value: value.id, text: value.name});
        });
      }
      function getProjectId(response) {
        vm.optionsTask = [];
        projectId = response; //it get the response(projectid) from the selectizer directive
        getProjectTask(projectId);
        vm.newCheckin.time_bill.project_id = projectId; //Adding project id to the object for create new checkin
        angular.forEach(projects, function(value, index) {
          if(value.id == projectId) {
            vm.newCheckin.time_bill.project_name = value.name; //Adding project name to the object for create new checkin
          }
        });
      }
      function getProjectTask(projectId) {
        checkinFactory.getProjectTask(projectId).then(displayTask);
      }
      function displayTask(data) {
        tasks = data.response;
        angular.forEach(tasks, function(value, index) {
          vm.optionsTask.push({value: value.id, text: value.name, selected: true});
        });
      }
      function getTaskId(response) { //it get the response(taskid) from the selectizer directive
        vm.newCheckin.time_bill.task_id = response; //Adding task id to the object for create new checkin
        angular.forEach(tasks, function(value, index) {
          if(value.id == response) {
            vm.newCheckin.time_bill.task_name = value.name; //Adding project name to the object for create new checkin
          }
        });
      }
      function get2weeks() {
        vm.dates = getweeksFactory.get2weeks(referenceDay); //Generate a calendar array of the last two weeks
      }                                    
      function getLast12Checkins() {  
        get2weeks();
        vm.last12Checkins = checkinFactory.getCheckinsHistory();//Get last 15 checkins from Netsuite API
        angular.forEach(vm.last12Checkins, function(checkin, index) { //Slice dates to be able to compare dates array with checkins array
          checkin.dateformat = checkin.date.slice(0,10); 
        });
        dayCheckinWasMade(vm.last12Checkins, vm.dates);
      }
      function dayCheckinWasMade(checkins, dates) { // Check what day Checkin Was Made
        angular.forEach(dates, function(date, key1) {
          angular.forEach(checkins, function(checkin, key2) {
            if(checkin.dateformat === date.date) {
              date.checkin = true;
            }
          });
        });
        splitDateArray();
      }
      function splitDateArray() { // Split to be able to show actual week or last week
        vm.lastWeek = vm.dates.slice(6, 12);
        vm.actualWeek = vm.dates.slice(0, 6);
        vm.selectWeek = vm.actualWeek;
      }
      function changeWeek(data) {
        vm.selectWeek = data;
        changeStatusButton();
      }
      function changeStatusButton() {
        vm.statusButton = !vm.statusButton;
      }
      function resetSelectedDates(data) {
        angular.forEach(vm.dates, function(date, index) {
          date.selected = false;
        });
      }
      function createCheckin() {
        vm.newCheckin.time_bill.tran_date = vm.selectedDate.dateFormat; //Adding date to the object for create new checkin
        checkinTemp = vm.newCheckin.time_bill;
        checkinFormValidation();
        console.log(vm.newCheckin.time_bill);
        if(checkinTemp.project_id !=='' && checkinTemp.task_id !=='' && checkinTemp.duration !=='' && checkinTemp.tran_date !=='' && checkinTemp.memo !=='') {
          checkinFactory.createCheckin(vm.newCheckin)
          .then( function(response) {
            checkinFactory.fetchCheckinsHistory();
            vm.checkinDone = true;
            $timeout(function() {
              vm.checkinDone = false;
              $timeout(function() {
                $route.reload();
              }, 200);
            }, 4000);
          })
          .catch(function(data){
            console.log(data);
          });
        }else {
          alertify.error("You have to complete all fields!");
        }
      }
      function checkinFormValidation() {
        if(checkinTemp.project_id =='') {
          vm.statusCheckin.project = true;
        }else {
          vm.statusCheckin.project = false;
        }
        if(checkinTemp.task_id =='') {
          vm.statusCheckin.task = true;
        }else {
          vm.statusCheckin.task = false;
        }
        if(checkinTemp.duration =='') {
          vm.statusCheckin.duration = true;
        }else {
          vm.statusCheckin.duration = false;
        }
        if(checkinTemp.memo =='') {
          vm.statusCheckin.memo = true;
        }else {
          vm.statusCheckin.memo = false;
        }
      }
      getLast12Checkins();
      displayProjects(); 
    }
})(); 