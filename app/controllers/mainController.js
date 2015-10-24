familee.controller('mainController', ['$scope', '$timeout', '$state', '$http', function($scope, $timeout, $state, $http) {
	$http({
	    method  : 'GET',
	    url     : '/authstatus',
	})
	.success(function(resp) {
	    if (resp == "valid_auth") {
	      	$state.go("dashboard");
	    }
	});
}]);