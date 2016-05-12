$(document).ready(function(){
  var $input      =     $('.input');

  $input.blur(function() {
    if( $(this).val() !== '') {
      $(this).next('.input__label').addClass('active-input-js');
    } else {
      $(this).next('.input__label').removeClass('active-input-js');
    }
  });   
  $(".owl-carousel").owlCarousel({
    loop: false,
    margin: 5,
    startPosition: 6,
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
