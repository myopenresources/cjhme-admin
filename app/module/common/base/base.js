var cjhmeUI = angular.module('ui.cjhme', []);

/**
 * 常量 
 */
cjhmeUI.constant('cjhmeConstant', {
	baseCfg: {
		path: 'module/common/directive/'
	}
});

/**
 * 净化
 */
cjhmeUI.filter("cjhmeSanitize", ['$sce', function($sce) {
	return function(htmlContent) {
		return $sce.trustAsHtml(htmlContent);
	}
}]);

/**
 * 日期与数字互转
 */
cjhmeUI.factory('cjhmeDateTransition', ['cjhmeDateFormat', 'dateFilter',
	function(formatTransition, dateFilter) {
		return {
			dateToInt: function(value, format) {
				var _value = dateFilter(value, formatTransition.dateModule(format));
				return _value.replace(/\D/g, function(str, match) {
					return "";
				});
			},
			intToString: function(value, format) {
				value += "";
				var end = 0;
				return format.replace(/[a-zA-Z]+/g, function(str, match) {
					end += str.length;
					return value.substring(end - str.length, end);
				});
			},
			stringToInt: function(value) {
				return value.replace(/\D/g, function(str, match) {
					return "";
				});
			}
		}
	}
]);

/**
 * 日期格式化
 */
cjhmeUI.factory('cjhmeDateFormat', [function() {
	return {
		dateModule: function(format) {
			return format.replace(/m/g, "M")
				.replace(/i/g, "m")
				.replace(/h|H/g, function(str, match) {
					if(str == "H") {
						return "h";
					} else {
						return "H";
					}
				});
		}
	}
}]);

/**
 * 签名
 */
cjhmeUI.factory('cjhmeSignature', [function() {
	var method = {};
	
	method.create=function(svcUrl,params){
		
	}
	
	return method;
}]);