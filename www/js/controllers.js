
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $ionicPopup) {

  $scope.submitQuery = function(form) {

    json_url = 'https://www.findfind.it/api/u/admin?query=';
    json_url += encodeURIComponent(form.query);

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

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };


  $scope.saveSetting = function(key, value) {
    window.localStorage[key] = value;
  }
});
