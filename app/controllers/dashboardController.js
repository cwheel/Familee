familee.controller('dashboardController', ['$scope', '$timeout', '$state', '$http', '$rootScope', function($scope, $timeout, $state, $http, $rootScope) {
	$scope.fullname = "";
	$scope.showRelativeNext = false;
	$scope.addRelative2 = false;
	$scope.addRelative1 = true;
	$scope.addingDevice = "";
	$scope.devices = [];
	$rootScope.selectedRow = "";
	$scope.currentTab = "Overview";
	$scope.addReminder2 = false;
	$scope.addReminder1 = true;
	$scope.newReminder = {phone : "", mssg : "", block : ""};
	$rootScope.devices = {};
	$rootScope.sleep = {};
	$rootScope.steps = {};
	$rootScope.heartrate = {};
	$scope.mssg = "";
	
	$http({
	    method  : 'GET',
	    url     : '/authstatus',
	})
	.success(function(resp) {
	    if (resp != "valid_auth") {
	      	$state.go("login");
	    }else {
	    	$state.go("dashboard.main");
	    }
	});

	$http({
	    method  : 'GET',
	    url     : '/userinfo/devices',
	    
	})
	.success(function(resp) {
	    $scope.devices = angular.fromJson(resp);

	    if ($scope.devices.length > 0) {
	    	$rootScope.selectedRow = $scope.devices[0].owner;
		}

		$scope.update();
	});

	$http({
	    method  : 'GET',
	    url     : '/userinfo',
	})
	.success(function(resp) {
	    var resItems = angular.fromJson(resp);
	    $scope.fullname = resItems.name;
	});

	$scope.nextAddReminder =  function() {
		if ($scope.addReminder2 == false) {
			$scope.addReminder2 = true;
			$scope.addReminder1 = false;
		} else {
			$http({
			    method  : 'POST',
			    url     : '/addReminder',
			    data    : $.param({phone : $scope.newReminder.phone, mssg : $scope.newReminder.mssg, block : $scope.newReminder.block}),
			    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
			.success(function(resp) {
			    if (resp == "valid_auth") {
			      	$state.go("dashboard");
			    }
			})
			$("#addReminder").modal('hide');
		}
	};

	$scope.chooseDevice = function (device) {
		$scope.addRelative1 = false;
		$scope.addRelative2 = true;

		$scope.addingDevice = device;
		$scope.showRelativeNext = true;

	};

	$scope.selectRow = function(row) {
		$rootScope.selectedRow = row;
		$scope.update();
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

	$scope.update = function() {
		$http({
		    method  : 'GET',
		    url     : '/fitbit/getDevices',
		    params  : {name: $rootScope.selectedRow}
		})
		.success(function(resp) {
			if (resp != "invalid") {
				$rootScope.devices = angular.fromJson(resp)[0];
				$rootScope.$broadcast('devices');
			}
		});

		$http({
		    method  : 'GET',
		    url     : '/fitbit/sleep',
		    params  : {name: $rootScope.selectedRow}
		})
		.success(function(resp) {
			if (resp != "invalid") {
				$rootScope.sleep = angular.fromJson(resp);
			}
		});

		$http({
		    method  : 'GET',
		    url     : '/fitbit/steps',
		    params  : {name: $rootScope.selectedRow}
		})
		.success(function(resp) {
			if (resp != "invalid") {
				$rootScope.steps = angular.fromJson(resp);
			}
		});

		$http({
		    method  : 'GET',
		    url     : '/fitbit/heartrate',
		    params  : {name: $rootScope.selectedRow}
		})
		.success(function(resp) {
			if (resp != "invalid") {
				$rootScope.heartrate = angular.fromJson(resp);
				$rootScope.$broadcast('heartrate');
			}
		});

		$scope.mssg = $scope.selectedRow;
	};
}]);