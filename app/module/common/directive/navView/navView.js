var cjhmeUI = angular.module('ui.cjhme');

/**
 * 导航
 */
cjhmeUI.directive('cjhmeNavView', ['cjhmeConstant', function(cjhmeConstant) {
	return {
		restrict: 'E',
		templateUrl: cjhmeConstant.baseCfg.path + 'navView/navView.html',
		scope: {
			navData: '=',
			itemClicked: '&'
		},
		link: function($scope, $element, $attrs) {

			$scope.templateUrl = function() {
				return cjhmeConstant.baseCfg.path + "navView/navItem.html";
			}

			$scope.itemExpended = function(item, $event) {
				item.isExpend = !item.isExpend;
				$event.stopPropagation();
			};
			$scope.isLeaf = function(item) {
				return !item.children || !item.children.length;
			};
			$scope.warpCallback = function(callback, item, $event) {
				//存在子节点，展开
				if(!$scope.isLeaf(item)) {
					$scope.itemExpended(item, $event);
				} else {
					($scope[callback] || angular.noop)({
						$item: item,
						$event: $event
					});
				}

			};
		}
	};
}]);