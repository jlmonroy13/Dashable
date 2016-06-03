(function() {
  angular
    .module('CheckIn')
    .controller('editCheckinController', editCheckinController); 
    editCheckinController.$inject = ['checkinFactory', 'getweeksFactory', '$timeout', '$moment', 'alertify', '$routeParams', '$location'];
    function editCheckinController(checkinFactory, getweeksFactory, $timeout, $moment, alertify, $routeParams, $location) {
      var vm                         =   this,
          referenceDay,
          checkinTemp,
          selectedCheckin,
          projectId;
      
      vm.leftNavStatus               =   false;
      vm.textFormTitle               =   "edit"; 
      vm.textFormButton              =   'save changes';
      vm.checkinId                   =   $routeParams.id;
      vm.configProjectsSelectize     =   {maxItems: 1};
      vm.configProjectsSelectize2    =   {maxItems: 1};
      vm.dates                       =   [];
      vm.actualWeek                  =   [];
      vm.lastWeek                    =   [];
      vm.last12Checkins              =   [];
      vm.selectWeek                  =   [];
      vm.changeWeek                  =   changeWeek;
      vm.statusButton                =   true;
      vm.resetSelectedDates          =   resetSelectedDates;
      vm.createCheckin               =   createCheckin;
      vm.getProjects                 =   getProjects;
      vm.getProjectId                =   getProjectId;
      vm.checkinDone                 =   false;
      vm.statusCheckin               =   {project:false, task:false, duration: false, memo:false};
      vm.newCheckin                  =   {time_bill: 
                                          {
                                            project_id : '',
                                            task_id: '',
                                            duration: '',
                                            tran_date: '',
                                            memo: ''
                                          }
                                         };
      function getProjects() {
        checkinFactory.getUserProjects()
          .then(displayProjects); 
      }
      function displayProjects(data) {
        angular.forEach(data.response, function(value, index) {
          vm.optionsProjects.push({value: value.id, text: value.name, });
        });
      }
      function getProjectId(response) {
        vm.optionsTask = [];
        projectId = response; //it get the response(porjectid) from the selectizer directive
        getProjectTask(projectId);
        vm.newCheckin.time_bill.project_id = projectId; //Adding project id to the object for create new checkin

      }
      function getProjectTask(projectId) {
        checkinFactory.getProjectTask(projectId).then(displayTask);
      }
      function displayTask(data) {
        angular.forEach(data.response, function(value, index) {
          vm.optionsTask.push({value: value.id, text: value.name, selected: true});
        });
        vm.newCheckin.time_bill.task_id = data.response[0].id; //Adding task id to the object for create new checkin
        vm.newCheckin.time_bill.tran_date = vm.selectedDate.dateFormat; //Adding task id to the object for create new checkin
      }                                    
      function get2weeks() {
        vm.dates = getweeksFactory.get2weeks(referenceDay); //Generate a calendar array of the last two weeks
      }
      function getLast12Checkins() {  
        checkinFactory.getTimeBills()//Get last 15 checkins from Netsuite API
          .then(dateFormat);
      }
      function dateFormat(data) { //To be able to compare dates array with checkins array
        get2weeks();
        vm.last12Checkins = data.response;
        angular.forEach(vm.last12Checkins, function(checkin, index) { 
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
        // console.log(vm.newCheckin);
      }
      function createCheckin() {  
        checkinTemp = vm.newCheckin.time_bill;
        console.log(checkinTemp);
        checkinFormValidation();
        if(checkinTemp.project_id !=='' && checkinTemp.task_id !=='' && checkinTemp.duration !=='' && checkinTemp.tran_date !=='' && checkinTemp.memo !=='') {
          checkinFactory.updateCheckin(vm.checkinId,vm.newCheckin)
          .then( function(response) {
            vm.checkinDone = true;
            console.log(response);
            $timeout(function() {
              $location.path('/history'); 
            }, 4000);
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
      function getCheckin2beEdited() {
        console.log(vm.checkinId);
        selectedCheckin                         = checkinFactory.returnCheckin(vm.checkinId);
        referenceDay                            = selectedCheckin.date.slice(0,10);
        vm.projectId                            = selectedCheckin.project.id;
        vm.newCheckin.time_bill.duration        = selectedCheckin.hours;
        vm.newCheckin.time_bill.memo            = selectedCheckin.memo;
        vm.newCheckin.time_bill.project_id      = vm.projectId; 
        vm.taskId                               = selectedCheckin.task.id; 
        vm.selectedDate                         = { dateToDisplay: $moment(referenceDay).format('dddd, MMM D'),
                                                    day: $moment(referenceDay).format('dddd'),
                                                    numberday: $moment(referenceDay).format('D'),
                                                    dateFormat: $moment(referenceDay).format('YYYY-MM-DD')
                                                  };
        getProjectTask(vm.projectId);
      }

      getLast12Checkins();
      getProjects();
      getCheckin2beEdited(); 
    }
})(); 