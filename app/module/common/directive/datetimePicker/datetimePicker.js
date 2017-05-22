var cjhmeUI = angular.module('ui.cjhme');

/**
 * 时间控件
 */
cjhmeUI.directive('cjhmeDatetimePicker', ['cjhmeDateFormat', 'dateFilter',
	function(formatTransition, dateFilter) {
		return {
			restrict: 'A',
			require: 'ngModel',
			scope: {
				"format": "@",
				"options": "@",
				"setStartDate": "@",
				"setEndDate": "@",
				"callback": "&"
			},
			link: function($scope, element, attrs, ngModel) {
				var options = {
					language: "zh-CN",
					format: "yyyy-mm-dd",
					todayBtn: true,
					autoclose: true
				};
				// 只选时间
				if(attrs.hour !== undefined) {
					angular.extend(options, {
						startView: 1,
						minView: 0,
						maxView: 1,
						forceParse: 0,
						format: 'hh:ii'
					});
				}
				$scope.format && angular.extend(options, {
					format: $scope.format
				});
				$scope.options && angular.extend(options, $scope.$parent.$eval($scope.options));

				// 事件
				element.on('click', function(ev) {
					$scope.setStartDate && !$scope.$parent.$eval($scope.setStartDate) && element.datetimepicker('setStartDate', null);
					$scope.setEndDate && !$scope.$parent.$eval($scope.setEndDate) && element.datetimepicker('setEndDate', null);

					$scope.setStartDate && $scope.$parent.$eval($scope.setStartDate) && element.datetimepicker('setStartDate', dateFilter($scope.$parent.$eval($scope.setStartDate), formatTransition.dateModule(options.format)));
					$scope.setEndDate && $scope.$parent.$eval($scope.setEndDate) && element.datetimepicker('setEndDate', dateFilter($scope.$parent.$eval($scope.setEndDate), formatTransition.dateModule(options.format)));
				});
				element.datetimepicker(options).on('hide', function(ev) {
					!ngModel.$isEmpty(ngModel.$viewValue) && ngModel.$setViewValue(ev.date.getTime() + ev.date.getTimezoneOffset() * 60000);

					var value = ngModel.$viewValue;
					if(angular.isFunction($scope.callback()) && value) {
						var formatVal = dateFilter(value, formatTransition.dateModule(options.format));
						$scope.callback()(value, formatVal);
					}
				});

				element.attr("readonly", "readonly").addClass("readonly");
				ngModel.$formatters.push(function(value) {
					if(ngModel.$isEmpty(value)) {
						return value;
					} else {
						var val = dateFilter(value, formatTransition.dateModule(options.format));
						element.datetimepicker('update', val);
						ngModel.$setViewValue(value);
						return val;
					}
				});

				attrs.$observe('disabled', function() {
					if(attrs.disabled) {
						element.removeClass("readonly");
					} else {
						element.addClass("readonly");
					}
				});
			}
		};
	}
]);