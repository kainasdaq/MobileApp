angular.module('starter.services', [])

.factory('INTERPAGES_MSG', function() { // global data share between pages
	interpages_msg = {};
	return interpages_msg;
})


.factory('$localstorage', ['$window', function($window) {
	return {
		set: function(key, value) {
			$window.localStorage[key] = value;
		},
		get: function(key, defaultValue) {
			return $window.localStorage[key] || defaultValue;
		},
		remove: function(key) {
		    $window.localStorage.removeItem(key);
		},
		setObject: function(key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function(key) {
		    return JSON.parse($window.localStorage[key] || '{}');
		},
		removeObject: function(key) {
		    $window.localStorage.removeItem(key);
		},
	}
}])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };

});

/* ======  AuthService  ====== */

var AuthService = angular.module('AuthService', []);

AuthService.factory('AuthService', ['$http', '$localstorage', function($http, $localstorage) {
	var url_auth = "http://127.0.0.1:8000/token-demo/api-token-auth/";
	var url_refresh = "http://127.0.0.1:8000/token-demo/api-token-refresh/";
	var url_restricted = "http://127.0.0.1:8000/token-demo/users-restricted/";

	return {
		login: function(username, password){
						
			var creds = {
				username: username,
				password: password,
			};
			
			Object.toParams = function ObjectToParams(obj) {
				var p = [];
				for (var key in obj) {
					p.push(key + '=' + encodeURIComponent(obj[key]));
				}
				return p.join('&');
			};

			var ret = $http({
				url: url_auth,
				method: "POST",
				headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
				data: Object.toParams(creds),
			})
			.success( function(response){
				$localstorage.setObject('jwt', response);
				console.log("login() in AuthService success: " + angular.toJson(response) );
				return response;
			}).error( function(response){
				console.log("login() in AuthService error: " + angular.toJson(response) );
			});
			
			return ret;
		},
		
		logout: function() {
			return $localstorage.removeObject('jwt');
		},
		
		getJWT: function() {
			return $localstorage.getObject('jwt');	
		},
		
		refreshJWT: function() {
			var $jwt = $localstorage.getObject('jwt');
			
			var ret = $http({
				url: url_refresh,
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				data: $jwt,
			})
			.success( function(response){
				$localstorage.setObject('jwt', response);
				console.log("refreshJWT() in AuthService success: " + angular.toJson(response) );
				return response;
			}).error( function(response){
				console.log("refreshJWT() in AuthService error: " + angular.toJson(response) );
			});
			
			return ret;
		},
		
		accessRestricted: function() {
			var $jwt = $localstorage.getObject('jwt');
			//console.log("accessRestricted() $jwt: " + angular.toJson($jwt.token) );
			var ret = $http({
				url: url_restricted,
				method: "GET",
				headers: {'Authorization': 'JWT ' + $jwt.token},
			})
			.success( function(response){
				//$localstorage.setObject('jwt', response);
				console.log("accessRestricted() in AuthService success: " + angular.toJson(response) );
				return response;
			}).error( function(response){
				console.log("accessRestricted() in AuthService error: " + angular.toJson(response) );
			});
			
			return ret;
		}
		
	}// return
}]);



