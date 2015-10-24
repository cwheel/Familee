familee.controller('dashboardController', ['$scope', '$timeout', '$location', '$http', function($scope, $timeout, $location, $http) {
	$scope.fullname = "";

	$http({
	    method  : 'GET',
	    url     : '/userinfo',
	})
	.success(function(resp) {
	    var resItems = angular.fromJson(resp);
	    $scope.fullname = resItems.name;
	});
}]);