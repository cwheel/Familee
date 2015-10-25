familee.controller('sickDashController', ['$scope', '$timeout', '$location', '$http','$rootScope', function($scope, $timeout, $location, $http,$rootScope) {
	var level = 0;
	var count = 0;
	for (var i = 0; i < $rootScope.steps['activities-tracker-steps'].length; i++) {
		if ($rootScope.steps['activities-tracker-steps'][i].value != 0){
			$scope.numSteps += parseInt($rootScope.steps['activities-tracker-steps'][i].value);
			count = count + 1;
		}
	}
	$scope.averageSteps = $scope.numSteps / count;
	$scope.stepMess = false;
	if ($scope.averageSteps > parseInt($rootScope.steps['activities-tracker-steps'][29].value) ){
		level = level + 1;
		$scope.stepMess = true;
	}
	count = 0;
	for (var i = 0; i < $rootScope.sleep.asleepdict.length; i++) {
		if(parseInt($rootScope.sleep.asleepdict[i].value) != 0){
			$scope.numSlept += (parseInt($rootScope.sleep.asleepdict[i].value));
			count += 1;
		}
	};
	$scopeAverageSleepTime = $scope.numSlept / count;
	$scope.sleepMess = false;
	if ($scopeAverageSleepTime < $rootScope.sleep.asleepdict[29].value){
		level += 1;
		$scope.sleepMess = true;
	}
	var count = 0;
	var closestHeartRate = 0;
	if($rootScope.heartrate["activities-heart"] != undefined){
		for(var i = 1; i < $rootScope.heartrate["activities-heart"].length;i++){
			if("restingHeartRate" in $rootScope.heartrate["activities-heart"][i].value){
				$scope.Heartaverage += parseInt($rootScope.heartrate["activities-heart"][i].value.restingHeartRate);
				count += 1;
				closestHeartRate = i;
			}
		}
	}
	if( count > 1){
		$scope.AverageRestHeartRate = $scope.Heartaverage / count;
		$scope.HeartMess = false;
		$scope.HeartData = true;
		if (80 < $rootScope.heartrate["activities-heart"][closestHeartRate].value.restingHeartRate){
			level += 2;
			$scope.HeartMess = true
		}
	}else{
		$scope.HeartData = false
	}

	console.log(level);
	if (level == 0 || level == 1){
		$scope.smiley = 0;
	}else if (level == 2 || level == 3){
		$scope.smiley = 1;
	} else {
		$scope.smiley = 2;
	}
	console.log($scope.smiley)
}]);