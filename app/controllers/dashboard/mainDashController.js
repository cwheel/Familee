familee.controller('mainDashController', ['$scope', '$timeout', '$location', '$http', '$rootScope', function($scope, $timeout, $location, $http, $rootScope) {	
	$rootScope.$on('devices', function(event, args) {
		$scope.battery = $rootScope.devices.battery;
		$scope.model = $rootScope.devices.deviceVersion;
		$scope.sync = moment($rootScope.devices.lastSyncTime).format('MMMM Do YYYY, h:mm:ss a');
	});
	$rootScope.$on('heartrate', function(event, args) {
	 	var count = 0;
		var closestHeartRate = 0;
		if($rootScope.heartrate["activities-heart"] != undefined){
			console.log("step 1")
			$scope.Heartaverage = 0;
			for(var i = 0; i < $rootScope.heartrate["activities-heart"].length;i++){
				if("restingHeartRate" in $rootScope.heartrate["activities-heart"][i].value){
					$scope.Heartaverage += parseInt($rootScope.heartrate["activities-heart"][i].value.restingHeartRate);
					console.log($scope.Heartaverage);
					console.log(count)
					console.log(i)
					count += 1;
					closestHeartRate = i;
				}
			}
		}
		if( count > 2){
			$scope.AverageRestHeartRate = $scope.Heartaverage / count;
		}
	});

	$scope.battery = $rootScope.devices.battery;
	$scope.model = $rootScope.devices.deviceVersion;
	$scope.sync =  moment($rootScope.devices.lastSyncTime).format('MMMM Do YYYY, h:mm:ss a');
	
	if($rootScope.heartrate["activities-heart"] != undefined){
		if("restingHeartRate" in $rootScope.heartrate["activities-heart"][0].value){
			$scope.average = parseInt($rootScope.heartrate["activities-heart"][0].value.restingHeartRate)
			for(var i = 1; i < $rootScope.heartrate["activities-heart"].length;i++){
				$scope.average = ($scope.average + parseInt($rootScope.heartrate["activities-heart"][0].value.restingHeartRate)) / 2
			}
			console.log($scope.average)
		}else{
			$scope.average = "No Heart Rate Data"
		}
	}
}]);