(function () {
  angular
    .module('CheckIn')
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
})();