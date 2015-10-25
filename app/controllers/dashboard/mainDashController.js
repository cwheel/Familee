familee.controller('mainDashController', ['$scope', '$timeout', '$location', '$http', '$rootScope', function($scope, $timeout, $location, $http, $rootScope) {	
	$rootScope.$on('devices', function(event, args) {
		$scope.battery = $rootScope.devices.battery;
		$scope.model = $rootScope.devices.deviceVersion;
		$scope.sync = moment($rootScope.devices.lastSyncTime).format('MMMM Do YYYY, h:mm:ss a');
	});

	$scope.battery = $rootScope.devices.battery;
	$scope.model = $rootScope.devices.deviceVersion;
	$scope.sync = $rootScope.devices.lastSyncTime;
}]);