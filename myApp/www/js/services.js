angular.module('starter.services', [])

.factory('INTERPAGES_MSG', function() { // global data share between pages
	interpages_msg = {};
	//interpages_msg.msg = "";
	//interpages_msg.token = "";
	//interpages_msg.status = "";
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
		setObject: function(key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function(key) {
		    return JSON.parse($window.localStorage[key] || '{}');
		}
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

AuthService.factory('AuthService', ['$http', function($http) {
	var url = "http://127.0.0.1:8000/token-demo/api-token-auth/";
	var res = [];

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
				url: url,
				method: "POST",
				headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
				data: Object.toParams(creds),
			})
			.success( function(response){
				res = response;
				console.log("login() in AuthService success: " + angular.toJson(response) );
				return response;
			}).error( function(response){
				console.log("login() in AuthService error: " + angular.toJson(response) );
			});
			
			return ret;
		},
		
		getJWT: function() {
			return jwt;		
		},
		
		refreshJWT: function() {
			return jwt;
		}
	}// return
	
}]);



