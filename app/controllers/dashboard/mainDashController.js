familee.controller('mainDashController', ['$scope', '$timeout', '$location', '$http', '$rootScope', function($scope, $timeout, $location, $http, $rootScope) {	
	if ($rootScope.selectedRow != "" || $rootScope.selectedRow != null) {
		$http({
		    method  : 'GET',
		    url     : '/fitbit/getProfile',
		    params  : {name: $rootScope.selectedRow}
		})
		.success(function(resp) {
		    var dev = angular.fromJson(resp);
		    console.log(dev);
		});
	}
}]);