familee.controller('dashboardController', ['$scope', '$timeout', '$state', '$http', '$rootScope', function($scope, $timeout, $state, $http, $rootScope) {
	$scope.fullname = "";
	$scope.showRelativeNext = false;
	$scope.addRelative2 = false;
	$scope.addRelative1 = true;
	$scope.addingDevice = "";
	$scope.devices = [];
	$rootScope.selectedRow = "";
	$scope.currentTab = "";

	$state.go('dashboard.main');

	$http({
	    method  : 'GET',
	    url     : '/authstatus',
	})
	.success(function(resp) {
	    if (resp != "valid_auth") {
	      	$state.go("login");
	    }
	});

	$http({
	    method  : 'GET',
	    url     : '/userinfo/devices',
	    
	})
	.success(function(resp) {
	    $scope.devices = angular.fromJson(resp);

	    if ($scope.devices.length > 0) {
	    	$scope.selectedRow = $scope.devices[0].owner;
		}
		
		for (var i = 0; i < $scope.devices.length; i++) {
			$http({
			    method  : 'GET',
			    url     : '/fitbit/getDevices',
			    params  : {name: $scope.devices[i].owner}
			})
			.success(function(resp) {
			    var dev = angular.fromJson(resp)[0];
			    $scope.devices[i].battery = dev.battery;
			    $scope.devices[i].deviceVersion = dev.deviceVersion;
			    $scope.devices[i].lastSyncTime = dev.lastSyncTime;
			});
		}
	});

	$http({
	    method  : 'GET',
	    url     : '/userinfo',
	})
	.success(function(resp) {
	    var resItems = angular.fromJson(resp);
	    $scope.fullname = resItems.name;
	});

	$scope.chooseDevice = function (device) {
		$scope.addRelative1 = false;
		$scope.addRelative2 = true;

		$scope.addingDevice = device;
		$scope.showRelativeNext = true;

	};

	$scope.selectRow = function(row) {
		$scope.selectedRow = row;
	};

	$scope.next = function() {
		//So, so truely terrible...
		//Yet so, so easy to do...
		if ($("#secondaryAddTitle").text() == "Setup Complete!") {
			$("#addRelative").modal('hide');

			$setTimeout(function() {
				$scope.showRelativeNext = false;
				$scope.addRelative2 = false;
				$scope.addRelative1 = true;

				$("#secondaryAddTitle").text("Connect to Fitbit");
				$("#secondaryAddMessage").text("Great, to set up your relatives Fitbit {{ addingDevice }} we'll need to have you login with the Fitbit account the device is associated with. This account may be registered to you, or to your relative depending on who's device it actually is. When your ready, press Next and we'll open up Fitbits website for you to login in at.");
				$("#nextButton").text("Next");
			}, 1000);
		} else {
			window.open("http://localhost:3000/connect/fitbit2")
		}
		
	};
}]);