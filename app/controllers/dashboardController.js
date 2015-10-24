familee.controller('dashboardController', ['$scope', '$timeout', '$location', '$http', function($scope, $timeout, $location, $http) {
	$scope.fullname = "";
	$scope.showRelativeNext = false;
	$scope.addRelative2 = false;
	$scope.addRelative1 = true;
	$scope.addingDevice = "";

	$http({
	    method  : 'GET',
	    url     : '/userinfo',
	})
	.success(function(resp) {
	    var resItems = angular.fromJson(resp);
	    $scope.fullname = resItems.name;
	});

	$scope.chooseDevice = function (device) {
		$scope.addRelative1 = false;
		$scope.addRelative2 = true;

		$scope.addingDevice = device;
		$scope.showRelativeNext = true;
	};
}]);