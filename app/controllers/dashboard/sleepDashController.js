familee.controller('sleepDashController', ['$scope', '$timeout', '$location', '$http', function($scope, $timeout, $location, $http, $rootScope) {
		$http({
			method: 'GET',
			url: '/fitbit/steps',
			data: {name: rootScope.selectedRow, }
		}).success (function(response){
			console.log(response)
		});

	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	  $scope.series = ['Series A', 'Series B'];
	  $scope.data = [
	    [65, 59, 80, 81, 56, 55, 40],
	    [28, 48, 40, 19, 86, 27, 90]
	  ];
	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  };


}]);