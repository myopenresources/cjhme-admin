var cjhme = angular.module('cjhme');

/**
 * 首页控制器
 */
cjhme.controller('main.mainCtrl', ['$scope','$state','main.mainSvc', function($scope,$state,mainSvc) {
	$scope.$emit('pageTitle', "首页");

	//初始化信息
	$scope.isCollapsedTask = false;
	$scope.isCollapsedNotice = false;
	$scope.isCollapsedMemo = false;
	$scope.isCollapsedUserInfo = false;
	$scope.taskObj = {};
	$scope.noticeObj = {};
	
	//个人资料工具栏事件
	$scope.userInfoToolsEvent = function(btn) {
		if('collapse' == btn) {
			$scope.isCollapsedUserInfo = !$scope.isCollapsedUserInfo;
		}
	}
	
	//个人资料事件
	$scope.userInfoEvent=function(btn){
		if('userInfoView' == btn) {
			$state.go("userInfoView");
		} else if('userPwdEdit' == btn) {
			$state.go("userPwdEdit");
		} 
	}

	//待办工具栏事件
	$scope.taskToolsEvent = function(btn) {
		if('collapse' == btn) {
			$scope.isCollapsedTask = !$scope.isCollapsedTask;
		}
	}

	//通知工具栏事件
	$scope.noticeToolsEvent = function(btn) {
		if('collapse' == btn) {
			$scope.isCollapsedNotice = !$scope.isCollapsedNotice;
		}
	}

    //备忘工具栏事件
	$scope.memoToolsEvent = function(btn) {
		if('collapse' == btn) {
			$scope.isCollapsedMemo = !$scope.isCollapsedMemo;
		}
	}
	
	
    //获取信息
    var mainObj=mainSvc.findMainInfo();
	$scope.taskObj =mainObj.taskObj;
	$scope.noticeObj = mainObj.noticeObj;
	$scope.memoObj=mainObj.memoObj;
	

}]);