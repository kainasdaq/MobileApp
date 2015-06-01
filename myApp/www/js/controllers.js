angular.module('starter.controllers', [])

// login controller, Kai added on 5/31/2015
.controller('LoginCtrl', function( $scope, LoginService, $ionicPopup, $state, WELCOME_MSG ) {
	$scope.login_msg = WELCOME_MSG;
	$scope.data = {};
	
	$scope.login = function() {
		console.log( "LOGIN USER: " + $scope.data.username + " - PW: " + $scope.data.password );
		/*	
		LoginService.loginUser( $scope.data.username, $scope.data.password 
			).success( function( data ) {
				$scope.login_msg.msg = data;
				$state.go( 'tab.dash' );
			}).error( function( data ) {
				$scope.login_msg.msg = data;
				$ionicPopup.alert({
					title: 'Login failed!',
					template: 'Please check your credentials!'
				});
			});*/
		
		var promise = LoginService.loginUser( $scope.data.username, $scope.data.password );
		promise.then( function(data) {
				$scope.login_msg.msg = data;
				$state.go('tab.dash');
			}, function(data) {
				$scope.login_msg.msg = data;
				var alertPopup = $ionicPopup.alert({
					title: 'Login failed!',
					template: 'Please check your credentials!'
				});
			});
	}
})

.controller('DashCtrl', function($scope, WELCOME_MSG) {
	$scope.input = WELCOME_MSG;
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
