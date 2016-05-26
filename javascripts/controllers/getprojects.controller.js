(function() {
  angular
    .module('CheckIn')
    .controller('getProjectsController', getProjectsController);
    getProjectsController.$inject = ['checkinFactory', 'getweeksFactory', '$scope', '$timeout', '$moment'];
    function getProjectsController(checkinFactory, getweeksFactory, $scope, $timeout, $moment) {
      var vm          =   this,
          projectId;
   
      vm.getProjects                 =   getProjects;
      vm.getProjectId                =   getProjectId;
      vm.configProjectsSelectize     =   {maxItems: 1};
      vm.dates                       =   [];
      vm.actualWeek                  =   [];
      vm.lastWeek                    =   [];
      vm.last12Checkins              =   [];
      vm.selectWeek                  =   [];
      vm.changeWeek                  =   changeWeek;

      function get2weeks() {
        vm.dates = getweeksFactory.get2weeks(); //Generate a calendar array of the last two weeks
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
        vm.lastWeek = vm.dates;
        vm.actualWeek = vm.lastWeek.splice(0, 6);
        vm.selectWeek = vm.actualWeek;
      }
      function getProjects() {
        checkinFactory.getUserProjects()
          .then(displayProjects); 
      }
      function displayProjects(data) {
        console.log(data);
        angular.forEach(data.response, function(value, index) {
          vm.optionsProjects.push({value: value.id, text: value.title});
        });
      }
      function getProjectId(response) {
        vm.optionsTask = [];
        projectId = response;
        getProjectTask(projectId);
      }
      function getProjectTask(projectId) {
        checkinFactory.getProjectTask(projectId).then(displayTask);
      }
      function displayTask(data) {
        angular.forEach(data.response, function(value, index) {
          vm.optionsTask.push({value: value.id, text: value.title});
        });
      }
      function changeWeek(data) {
        vm.selectWeek = data;
      }
      
      getLast12Checkins();
      getProjects(); 
    }
})();  