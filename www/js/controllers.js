
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $ionicPopup) {

  $scope.$on('$ionicView.afterEnter', function() {
    document.getElementById('query-input').focus();
    if (!cordova.plugins.Keyboard.isVisible) {
      cordova.plugins.Keyboard.show();
    }
  });


  $scope.submitQuery = function(form) {

    // Build API URL.
    json_url = 'https://www.findfind.it/api/';

    if (window.localStorage['username']) {
     json_url += 'u/' + window.localStorage['username'] + '?';
    }
    else {
     json_url += 'n/' + 
      window.localStorage['language_namespace'] +
      '.' +
      window.localStorage['country_namespace'];
      if (window.localStorage['custom_namespaces']) {
        json_url += '.' + window.localStorage['custom_namespaces'];
      }
      json_url += '?'
      if (window.localStorage['default_keyword']) {
        json_url += 'default_keyword=' + window.localStorage['default_keyword'] + '&';
      }
    }
    json_url += 'query=';

    if ((!form) || (!form.query)) {
      $ionicPopup.alert({
        title: 'Error',
        template: 'No query entered.'
      });
    }
    json_url += encodeURIComponent(form.query);

    // Fetch data from API.
    $http.get(json_url).then(function(response) {
      json = response.data;
      if (json.status.found) {
        url = json.url.final;
        cordova.InAppBrowser.open(url, '_system');
      }
      else {
        $ionicPopup.alert({
          title: 'Error',
          template: 'None of the available shortcuts matched your query.'
        });
      }
    }, function(error) {
      $ionicPopup.alert({
        title: 'Error',
        template: 'Could not access www.findfind.it.'
      });
    });
  };

})

.controller('AccountCtrl', function($scope) {

  $scope.settings = {
    username           : window.localStorage['username'],
    language_namespace : window.localStorage['language_namespace'],
    country_namespace  : window.localStorage['country_namespace'],
    custom_namespaces  : window.localStorage['custom_namespaces'],
    default_keyword    : window.localStorage['default_keyword']
  };


  $scope.saveSetting = function(key, value) {
    window.localStorage[key] = value;
  }
});
