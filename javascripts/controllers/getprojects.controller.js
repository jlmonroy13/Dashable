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
      vm.dates                       =   [],
      vm.optionsCarousel             =   {  loop: false, 
                                            margin: 5, 
                                            startPosition: 7,
                                            slideBy: 6,
                                            navText: ['<i class="sprite sprite--nav-prev"></i>','<i class="sprite sprite--nav-next"></i>'],
                                            items: 6,
                                            dots: false,
                                            nav: true
                                          };

      function get2weeks() {
        vm.dates = getweeksFactory.get2weeks();
        console.log(vm.dates);
      }

      function getProjects() {
        checkinFactory.getUserProjects()//jwt 
          .then(displayProjects);
      }

      function displayProjects(data) {
        console.log(data);
        $.each(data.response, function(index, value) {
          vm.optionsProjects.push({value: value.id, text: value.title}); 
        });
      }
      function getProjectId(response) {
        vm.optionsTask = [];
        projectId = response;
        getProjectTask(projectId);
        checkinFactory.getTimeBills()//get last 15 checkins
          .then(function(data) {
            console.log(data);
          });
      }
      function getProjectTask(projectId) {
        checkinFactory.getProjectTask(projectId).then(displayTask);
      }
      function displayTask(data) {
        $.each(data.response, function(index, value) {
          vm.optionsTask.push({value: value.id, text: value.title});
        });
      }
      get2weeks();
      getProjects(); 
    }
})();  