$(document).ready(function(){
  var $input      =     $('.input-js'),
      $select     =     $('.effect-select-js'),
      ancho       =     $(window).width();

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

  if (ancho > 400) {
    $('.js-select').selectize({
      sortField: 'text'
    });
  }else if (ancho < 400) {
    $('.empty-option-js').hide();
  }

  $(".owl-carousel").owlCarousel({
    loop: false,
    margin: 5,
    startPosition: 6,
    navText: ['<i class="sprite nav--prev"></i>','<i class="sprite nav--next"></i>'],
    responsive:{
     0:{
       items:6,
       nav:true,
       dots: false
     },
     480:{
       items:6,
       dots: false,
     },
     768:{
       items:6,
       nav:false,
       dots: false,
     },
     1024:{
       items:6,
       nav:true,
     },
   }
  });
}); 
