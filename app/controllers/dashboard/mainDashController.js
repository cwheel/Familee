familee.controller('mainDashController', ['$scope', '$timeout', '$location', '$http', '$rootScope', function($scope, $timeout, $location, $http, $rootScope) {	
	$http({
	    method  : 'GET',
	    url     : '/fitbit/getDevices',
	    params  : {name: $rootScope.selectedRow}
	})
	.success(function(resp) {
		if (resp != "invalid") {
			var dev = angular.fromJson(resp)[0];
			console.log(dev);
			$scope.battery = dev.battery;
			$scope.sync = dev.lastSyncTime;
			$scope.model = dev.deviceVersion;
		}
	});
}]);