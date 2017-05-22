var cjhmeUI = angular.module('ui.cjhme');

/**
 * 模态框
 */
cjhmeUI.factory('cjhmeModal', ['$uibModal','$timeout','cjhmeConstant', function($uibModal,$timeout,cjhmeConstant) {
	var svc = {};

	var modalStack = [];
	var inModal = false;

	//打开
	var open = function(fn) {
		if(!inModal) {
			fn();
			inModal = true;
		} else {
			modalStack.push(fn);
		}
	};

	//关闭
	var close = function() {
		if(modalStack.length)
			modalStack.pop()();
		else {
			inModal = false;
		}
	};

	var commonDiaOpts = {
		backdrop: true,
		keyboard: true,
		animation: true,
		size: 'md',
		templateUrl: cjhmeConstant.baseCfg.path+"modal/modal.html",
		controller: ['$scope', '$uibModalInstance', 'params', function($scope, $uibModalInstance, params) {
			angular.extend($scope, params);
			
			//设置自动关闭
			if($scope.extra && $scope.extra.autoClose){
				$timeout(function(){
				   $scope.cancel();
				},$scope.extra.autoCloseTime);
			}
			
			
			$scope.detail = function() {
				$scope.showDetail = !$scope.showDetail;
			};
			$scope.ok = function() {
				$scope.$close();
				$scope.cbOk && $scope.cbOk();
			};
			$scope.cancel = function() {
				$scope.$dismiss();
				$scope.cbCancel && $scope.cbCancel();
			}
		}]
	};

	var dialog = function(param) {
		var o = angular.copy(commonDiaOpts);
		o.resolve = {
			params: function() {
				return {
					mode: param.mode,
					title: param.title,
					content: param.content,
					cbOk: param.ok,
					cbCancel: param.cancel,
					extra: param.extra
				};
			}
		};

		//调用open函数
		open(function() {
			var instance = $uibModal.open(o);
			instance.result.then(close, close);
		});
	};

	//警告框
	svc.warning = function(obj) {
		obj.mode='warning';
		if(obj.autoClose){
			if(!obj.autoCloseTime){
				obj.autoCloseTime=2000;
			}
			obj.extra={
				autoClose:obj.autoClose,
				autoCloseTime:obj.autoCloseTime
			}
		}
		
		dialog(obj);
	};

	//消息框
	svc.info = function(obj) {
		obj.mode='info';
		if(obj.autoClose){
			if(!obj.autoCloseTime){
				obj.autoCloseTime=2000;
			}
			obj.extra={
				autoClose:obj.autoClose,
				autoCloseTime:obj.autoCloseTime
			}
		}
		
		dialog(obj);
	};

	//错误框
	svc.error = function(obj) {
		obj.mode='error';
		if(obj.autoClose){
			if(!obj.autoCloseTime){
				obj.autoCloseTime=2000;
			}
			obj.extra={
				autoClose:obj.autoClose,
				autoCloseTime:obj.autoCloseTime
			}
		}
		
		dialog(obj);
	};

	//确认框
	svc.confirm = function(obj) {
		obj.mode='confirm';
		if(obj.detail){
			obj.extra={
				detail:obj.detail
			}
		}
		dialog(obj);
	};

	//自定义框
	svc.customModal = function(o) {
		open(function() {
			var instance = $uibModal.open(o);
			instance.result.then(close, close);
		});
	}

	return svc;
}]);