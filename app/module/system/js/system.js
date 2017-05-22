var myApp = angular.module('cjhme');

//系统日志
myApp.controller('system.systemLogCtrl', ['$scope', '$state','cjhmeModal', function($scope, $state,cjhmeModal) {
	$scope.$emit('pageTitle', "系统日志");
	
}]);