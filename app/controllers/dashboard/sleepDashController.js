familee.controller('sleepDashController', ['$scope', '$timeout', '$location', '$http', '$rootScope', function($scope, $timeout, $location, $http, $rootScope) {
	$scope.data = [[]]
	console.log($rootScope.sleep.asleepdict)
	$scope.labels = [];
	$scope.series = ['Time Asleep'];
	for (var i = 0; i < $rootScope.sleep.asleepdict.length; i++) {
		$scope.data[0].push(parseInt($rootScope.sleep.asleepdict[i].value))
		$scope.labels.push($rootScope.sleep.asleepdict[i].dateTime)
	};
	$scope.avgSleepEff = $rootScope.sleep.efavg
	$scope.deviationHigh = 0;
	$scope.deviationLow = 100;
	for (var i = 0; i < $rootScope.sleep.efdict.length; i++){
		var cur = parseInt($rootScope.sleep.efdict[i].value)
		if (cur != 0){
			if (cur > $scope.deviationHigh){
				$scope.deviationHigh = cur;
			}
			if (cur < $scope.deviationLow){
				$scope.deviationLow = cur;
			}
		}	
	}
	$scope.deviationSleepEff = $scope.deviationHigh - $scope.deviationLow;
	if ($scope.deviationSleepEff == 0){
		$scope.deviationSleepEff = "No Sleep Deviation";
	}
	console.log($scope.data);

}]);