var cjhmeUI = angular.module('ui.cjhme');

/**
 * 日期控件
 */
cjhmeUI.directive('cjhmeDatePicker', ['cjhmeDateFormat', 'dateFilter', 'cjhmeDateTransition',
	function(formatTransition, dateFilter, dateTransition) {
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
					autoclose: true,
					todayHighlight: true,
					weekStart: 0
				};
				// 只选年月
				if(attrs.month !== undefined) {
					angular.extend(options, {
						startView: 2,
						minViewMode: 1,
						format: "yyyy-mm"
					});
				}

				// 只选年
				if(attrs.onlyYear !== undefined) {
					angular.extend(options, {
						startView: 2,
						minViewMode: 2,
						format: "yyyy"
					});
				}
				// 只选月
				if(attrs.onlyMonth !== undefined) {
					angular.extend(options, {
						startView: 1,
						minViewMode: 1,
						format: "mm"
					});
				}

				$scope.format && angular.extend(options, {
					format: $scope.format
				});
				$scope.options && angular.extend(options, $scope.$parent.$eval($scope.options));

				// 判断是否启用数字存储
				var onlyNumber$ = (attrs.onlyNumber !== undefined);

				// 事件
				element.on('click', function(ev) {
					$scope.setStartDate && !$scope.$parent.$eval($scope.setStartDate) && element.datepicker('setStartDate', null);
					$scope.setEndDate && !$scope.$parent.$eval($scope.setEndDate) && element.datepicker('setEndDate', null);

					$scope.setStartDate && $scope.$parent.$eval($scope.setStartDate) && element.datepicker('setStartDate', (onlyNumber$ ? dateTransition.intToString($scope.$parent.$eval($scope.setStartDate), options.format) : dateFilter($scope.$parent.$eval($scope.setStartDate), formatTransition.dateModule(options.format))));
					$scope.setEndDate && $scope.$parent.$eval($scope.setEndDate) && element.datepicker('setEndDate', (onlyNumber$ ? dateTransition.intToString($scope.$parent.$eval($scope.setEndDate), options.format) : dateFilter($scope.$parent.$eval($scope.setEndDate), formatTransition.dateModule(options.format))));
				});
				element.datepicker(options).on('hide', function(ev) {
					!ngModel.$isEmpty(ngModel.$viewValue) && ngModel.$setViewValue(onlyNumber$ ? dateTransition.dateToInt(ev.date.getTime(), options.format) : ev.date.getTime());

					var value = ngModel.$viewValue;
					if(angular.isFunction($scope.callback()) && value) {
						var formatVal = onlyNumber$ ? dateTransition.intToString(value, options.format) : dateFilter(value, formatTransition.dateModule(options.format));
						$scope.callback()(value, formatVal);
					}
				});

				element.attr("readonly", "readonly").addClass("readonly");
				ngModel.$formatters.push(function(value) {
					if(ngModel.$isEmpty(value)) {
						return value;
					} else {
						var val = onlyNumber$ ? dateTransition.intToString(value, options.format) : dateFilter(value, formatTransition.dateModule(options.format));
						element.datepicker('update', val);
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