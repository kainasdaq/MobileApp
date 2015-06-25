angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, AuthService, $state, $ionicPopup, INTERPAGES_MSG) {
	
	$scope.interpages_msg = INTERPAGES_MSG;
	$scope.data = {}

	$scope.login = function() {
		console.log( "LOGIN USER: " + $scope.data.username + " - PW: " + $scope.data.password );
		
		AuthService.login($scope.data.username, $scope.data.password)
		.then( function(d){
				$scope.interpages_msg.jwt = angular.toJson(d.data);
				console.log( "$scope.interpages_msg.jwt in DashCtrl: " + $scope.interpages_msg.jwt );
				$scope.jwt = angular.toJson(d.data);
				console.log( "$scope.jwt in DashCtrl: " + $scope.jwt );
			}, function(d){
				$scope.jwt = angular.toJson(d.data);
				$ionicPopup.alert({
					title: 'Login Failed!',
					template: 'Incorrect credentials',
				});
				console.log( "AuthService.login() ERROR in DashCtrl: " + angular.toJson(d.data) );
			});
		
	}

	$scope.logout = function() {
		AuthService.logout();
		$scope.interpages_msg.jwt = AuthService.getJWT();
		$scope.jwt = AuthService.getJWT();
	}

})

.controller('ChatsCtrl', function($scope, AuthService, $state, $ionicPopup, INTERPAGES_MSG) {
	$scope.interpages_msg = INTERPAGES_MSG;
	
	$scope.getToken = function() {
		$scope.jwt = AuthService.getJWT();
		console.log( "$scope.jwt in ChatsCtrl: " + angular.toJson($scope.jwt) );
	}
	
	$scope.refreshToken = function() {
		AuthService.refreshJWT()
		.then( function(d){
				$scope.newjwt = angular.toJson(d.data);
				console.log( "$scope.newjwt in ChatsCtrl: " + angular.toJson($scope.newjwt) );
			}, function(d){
				$scope.newjwt = angular.toJson(d.data);
				console.log( "AuthService.refreshJWT() ERROR in ChatsCtrl: " + angular.toJson(d.data) );
				
				$ionicPopup.alert({
					title: 'Session expired!',
					template: 'Please login',
				}).then( function(){
					$state.go('tab.dash'); // login page
				});
			});
	}

})

.controller('AccountCtrl', function($scope, AuthService) {
	$scope.accessRestricted = function() {
		AuthService.accessRestricted()
		.then( function(d) {
			$scope.returndata = angular.toJson(d.data);
			console.log( "$scope.returndata in AccountCtrl: " + $scope.returndata );
		}, function(d) {
			$scope.returndata = angular.toJson(d.data);
			console.log( "AuthService.accessRestricted() ERROR in AccountCtrl: " + $scope.returndata );
		});
	}
}); // last controller

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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
*/


