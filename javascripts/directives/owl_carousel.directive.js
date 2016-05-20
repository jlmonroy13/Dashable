(function () {  
  angular
    .module("CheckIn")
    .directive('wrapOwlcarousel', wrapOwlcarousel);

    function wrapOwlcarousel() {
      return {
        restrict: 'E',
        link: function(scope, element, attrs) {
          // var options = scope.$eval($(element).attr('data-options'));
          var options = { loop: false, margin: 5, startPosition: 7, 
                          navText: ['<i class="sprite sprite--nav-prev"></i>','<i class="sprite sprite--nav-next"></i>'],
                          responsive:{
                           0:{ items:6, nav:true, dots: false}
                          }
                        };
          $(element).owlCarousel(options);
        }
      }
    }
})();    