var cjhmeUI = angular.module('ui.cjhme');

/**
 * 分页
 */
cjhmeUI.directive('cjhmePagination', ['cjhmeConstant',function(cjhmeConstant) {
	return {
		scope: {
			setOptions: '=setoptions',
			onPageChanged: '&onpagechanged'
		},
		replace: false,
		templateUrl: cjhmeConstant.baseCfg.path+'pagination/pagination.html',
		link: function($scope, $element, $attrs) {
			var opts = {
				total: 0,
				pageList: [10, 20, 30, 50, 100, 150, 200]
			};

			//初始化分页
			var initPagination = function() {
				$scope.options = opts;
				$scope.options.pageSize=$scope.options.pageList[0];
				refreshPagination();
			}

			//刷新分页
			var refreshPagination = function() {
				$scope.options.pageTotal = 0;
				if(parseInt($scope.options.total) % parseInt($scope.options.pageSize) == 0) {
					$scope.options.pageTotal = parseInt(parseInt($scope.options.total) / parseInt($scope.options.pageSize));
				} else {
					$scope.options.pageTotal = parseInt((parseInt($scope.options.total) / parseInt($scope.options.pageSize)) + 1);
				}

				if($scope.options.pageTotal <= 0) {
					$scope.options.pageNumber = 0;
				} else {
					$scope.options.pageNumber = 1;
				}
				
				
			}

			//下一页
			var nextPage = function() {
				$scope.options.pageNumber++;
				if($scope.options.pageNumber > $scope.options.pageTotal) {
					$scope.options.pageNumber = $scope.options.pageTotal;
				}
			}

			//上一页
			var previousPage = function() {
				$scope.options.pageNumber--;
				if($scope.options.pageNumber <= 0) {
					$scope.options.pageNumber = 1
				}
			}

			//最后一页
			var lastPage = function() {
				$scope.options.pageNumber = $scope.options.pageTotal;
			}

			//第一页
			var fristPage = function() {
				$scope.options.pageNumber = 1;
			}

			//分页操作
			var onPageChanged = function(type) {
				var pageParam = {
					pageNumber: $scope.options.pageNumber,
					pageSize: $scope.options.pageSize,
					pageTotal: $scope.options.pageTotal,
					total: $scope.options.total
				}

				$scope.onPageChanged()(type, pageParam);
			}

			//分页改变
			$scope.pageChanged = function(type) {
				switch(type) {
					case 'nextPage':
						nextPage();
						break;
					case 'lastPage':
						lastPage();
						break;
					case 'previousPage':
						previousPage();
						break;
					case 'fristPage':
						fristPage();
						break;
				}
				onPageChanged(type);
			}

			//页数改变
			$scope.pageSizeChanged = function(curSize) {
				$scope.options.pageSize = curSize;
				refreshPagination();
				onPageChanged("pageSizeChange");
			}
			
			initPagination();

			$scope.$watch('setOptions', function(newVal, oldVal) {
				if(newVal){
					angular.extend($scope.options,newVal );
					$scope.options.pageSize=$scope.options.pageList[0];
					refreshPagination();
				}
			})
		}

	};
}]);