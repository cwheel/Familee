familee.controller('sleepDashController', ['$scope', '$timeout', '$location', '$http', '$rootScope', function($scope, $timeout, $location, $http, $rootScope) {
	$scope.data = []
	console.log($rootScope.sleep.asleepdict)
	for (var i = 0; i < $rootScope.sleep.asleepdict.length; i++) {
		$scope.data[i] = $rootScope.sleep.asleepdict[i].value
	};
	$scope.series = ['Steps Per Day'];
	$scope.labels = [];

	console.log($scope.data)
	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  };


}]);