(function () {  
  angular
    .module("CheckIn")
    .directive('elastic', elastic);
    elastic.$inject = ['$timeout'];
    function elastic($timeout) { 
      var directive = {
        restrict: 'A',
        link: elasticResize
      };
      return directive;
      function elasticResize($scope, element) {
        $scope.initialHeight = $scope.initialHeight || element[0].style.height;
        var resize = function() {
            element[0].style.height = $scope.initialHeight;
            element[0].style.height = "" + element[0].scrollHeight + "px";
        };
        element.on("input change", resize);
        $timeout(resize, 0);
      }
    }
})();    