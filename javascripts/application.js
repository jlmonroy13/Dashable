
(function () {
  angular
    .module('CheckIn', ['ngRoute', 'satellizer'])
    .config(SetupAuthentication);
    SetupAuthentication.$inject = ['$authProvider'];
    function SetupAuthentication($authProvider) { 
      $authProvider.google({ 
        clientId: '472489925421-knn9iga4j0a6jak33hgs6si5ag46a91d.apps.googleusercontent.com'
      });  
      $authProvider.google({
        url: null,
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: window.location.origin,
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        scope: ['profile', 'email'],
        scopePrefix: 'openid',
        scopeDelimiter: ' ',
        display: 'popup',
        type: '2.0', 
        popupOptions: { width: 452, height: 500 }
      });
    }

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
