
(function () {
  angular
    .module('CheckIn', ['ngRoute', 'satellizer']);
    

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
  
  //Use selectize plugin only on desktop
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
})(); 
