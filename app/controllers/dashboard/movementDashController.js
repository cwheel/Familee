familee.controller('movementDashController', ['$scope', '$timeout', '$location', '$http', '$rootScope', function($scope, $timeout, $location, $http, $rootScope) {
	$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	$scope.series = ['Steps Per Day'];

	$scope.data = [[65, 59, 80, 81, 56, 55, 40]];

	for (var i = 0; i < $rootScope.steeps.length; i++) {
		//$rootScope.steeps[i]
	};

	console.log($rootScope.steeps);
}]);