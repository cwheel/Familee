familee.controller('movementDashController', ['$scope', '$timeout', '$location', '$http', function($scope, $timeout, $location, $http) {
	$http({
			method: 'GET',
			url: '/fitbit/getSleep',
			data: {name: rootScope.selectedRow, }
		})
	.success(function(resp) {
		    var dev = angular.fromJson(resp);
		    console.log(dev);
		});
	
}]);