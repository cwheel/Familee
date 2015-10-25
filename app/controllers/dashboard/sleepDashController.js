familee.controller('sleepDashController', ['$scope', '$timeout', '$location', '$http', '$rootScope', function($scope, $timeout, $location, $http, $rootScope) {
	$scope.data = [[]]
	console.log($rootScope.sleep.asleepdict)
	$scope.labels = [];
	$scope.series = ['Time Asleep'];
	for (var i = 0; i < $rootScope.sleep.asleepdict.length; i++) {
		$scope.data[0].push(parseInt($rootScope.sleep.asleepdict[i].value))
		$scope.labels.push($rootScope.sleep.asleepdict[i].dateTime)
	};

	console.log($scope.data)
	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  };


}]);