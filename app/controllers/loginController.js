familee.controller('loginController', ['$scope', '$timeout', '$location', '$http', function($scope, $timeout, $location, $http) {
	$scope.login = {};

	$scope.onLogin = function() {
		$http({
		    method  : 'POST',
		    url     : '/login',
		    data    : $.param({username : $scope.login.username, password : $scope.login.password}),
		    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.success(function(resp) {
			console.log(resp);
		    if (resp == "valid_auth") {
		       alert("yay");
		    } else {
		    	alert("boo");
		    }
		});
	};
}]);