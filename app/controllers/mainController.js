familee.controller('mainController', ['$scope', '$timeout', '$location', '$http', function($scope, $timeout, $location, $http) {
	$http({
	    method  : 'GET',
	    url     : '/authstatus',
	})
	.success(function(resp) {
	    if (resp == "valid_auth") {
	      	$location.path("/dashboard");
	    }
	});
}]);