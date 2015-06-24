angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, AuthService, $state, $ionicPopup, INTERPAGES_MSG) {
	
	$scope.interpages_msg = INTERPAGES_MSG;
	$scope.data = {}

	$scope.login = function() {
		console.log( "LOGIN USER: " + $scope.data.username + " - PW: " + $scope.data.password );
		
		AuthService.login($scope.data.username, $scope.data.password).then( function(d){
			$scope.jwt = d.data;
			console.log( "$scope.jwt: " + angular.toJson($scope.jwt) );
		});
		
	}

})

.controller('ChatsCtrl', function($scope, AuthService, INTERPAGES_MSG) {
	$scope.interpages_msg = INTERPAGES_MSG;
	$scope.jwt = AuthService.getJWT();
})

/*
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
  }
})
*/

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
