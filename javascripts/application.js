angular
  .module("CheckIn", ['ngRoute'])
  .directive('wrapOwlcarousel', function() {
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
  });

$(window).load(function(){
  var $input        =     $('.input-js'),
      $select       =     $('.effect-select-js'),
      ancho         =     $(window).width(),
      $mobileMenu   =     $('.button-menu-mobile-js'),
      $nav          =     $('.navbar-js');

  // Labels inputs effect
  $input.blur(function() {
    if( $(this).val() !== '') {
      $(this).next('.input__label').addClass('active-input-js');
    } else {
      $(this).next('.input__label').removeClass('active-input-js');
    }
  });
  $select.click(function() {
    $(this).find('.input__label').addClass('active-input-js');
  }); 
  
  // Use selectize plugin only on desktop
  if (ancho > 400) {
  $('.js-select').selectize({
    sortField: 'text'
  });
  }else if (ancho <= 400) {
    $('.empty-option-js').hide();
  }
  // Mobile Menu
  $mobileMenu.click(function() {
    $nav.toggleClass('navbar__mobile');
  });
}); 

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
}

