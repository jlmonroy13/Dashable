(function () {  
  angular
    .module("CheckIn")
    .directive('wrapOwlcarousel', wrapOwlcarousel)
    .directive('owlCarouselItem', owlCarouselItem);

    function wrapOwlcarousel() {
      return {
        restrict: 'E',
        transclude: false,
        link: generateCarousel
      }
    }
    function generateCarousel(scope) {
      scope.initCarousel = function(element) {
        // provide any default options you want
          var defaultOptions = {
          };
          var customOptions = scope.$eval($(element).attr('data-options'));
          // combine the two options objects
          for(var key in customOptions) {
              defaultOptions[key] = customOptions[key];
          }
          // init carousel
          $(element).owlCarousel(defaultOptions);
      };
    }

    function owlCarouselItem() {
      return {
        restrict: 'A',
        transclude: false,
        link: generateCarouselItem
      }
    }
    function generateCarouselItem(scope, element) {
      // wait for the last item in the ng-repeat then call init
      if(scope.$last) {
          scope.initCarousel(element.parent());
      }
    }

})();    




