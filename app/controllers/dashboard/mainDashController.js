familee.controller('mainDashController', ['$scope', '$timeout', '$location', '$http', '$rootScope', function($scope, $timeout, $location, $http, $rootScope) {	
	$rootScope.$on('devices', function(event, args) {
		$scope.battery = $rootScope.devices.battery;
		$scope.model = $rootScope.devices.deviceVersion;
		$scope.sync = moment($rootScope.devices.lastSyncTime).format('MMMM Do YYYY, h:mm:ss a');
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