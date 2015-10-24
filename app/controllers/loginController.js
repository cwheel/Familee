familee.controller('loginController', ['$scope', '$timeout', '$state', '$http', function($scope, $timeout, $state, $http) {
	$scope.login = {};

	$scope.onLogin = function() {
		$http({
		    method  : 'POST',
		    url     : '/login',
		    data    : $.param({username : $scope.login.username, password : $scope.login.password}),
		    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.success(function(resp) {
		    if (resp == "valid_auth") {
		      	$state.go("dashboard");
		    }
		})
		.error(function(err, status) {
			$scope.login = {};
		});
	};

	$scope.watchReturn = function(e) {
		if (e.which === 13) {
			$scope.onLogin();
		}
	};
}]);