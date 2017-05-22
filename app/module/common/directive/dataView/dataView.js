var cjhmeUI = angular.module('ui.cjhme');

/**
 * 数据表格
 */
cjhmeUI.directive('cjhmeDataTable', ['$filter', '$compile', '$http', 'cjhmeConstant', function($filter, $compile, $http, cjhmeConstant) {
	return {
		scope: {
			options: '=',
			event: '=',
			search:'='
		},
		replace: false,
		templateUrl: cjhmeConstant.baseCfg.path + 'dataView/dataTable.html',
		link: function($scope, $element, $attrs) {
			var opts = {
				url: '',
				sort: '',
				method: 'POST',
				param: {},
				tableCls: 'table table-bordered  table-hover',
				serialNumber: false,
				pagination: true,
				pageList: [10, 20, 30, 50, 100, 150, 200],
				dataEmptyMsg: '暂无数据...',
				data: [],
				columns: []
			};

			//编译tr
			var compiledTrs = function(pageNumber, pageSize) {
				var html = '';
				var serialIndex = (pageNumber - 1) * pageSize;
				if($scope.options.dataList.length > 0) {
					angular.forEach($scope.options.dataList, function(item, i) {
						html += '<tr>';
						if($scope.options.serialNumber) {
							html += '<td>' + (serialIndex + i + 1) + '</td>';
						}

						angular.forEach($scope.options.columns, function(column, j) {
							if(column.type == 'render') {
								html += '<td>' + column.render(item[column.field], column.field, item, i, j, 'options.dataList') + '</td>';
							} else if(column.type == 'action') {
								html += '<td class="' + column.fieldCls + '">';
								angular.forEach(column.buttons, function(btn, k) {
									if(!btn.visible || eval(btn.visible)) {
										html += '<button class="btn ' + btn.btnCls + '" style="margin-right:10px" ng-click="event(\'' + btn.action + '\',options.dataList[' + i + '])();">' + btn.title + '</button>';
									}
								});
								html += '</td>';
							} else {
								html += '<td class="' + column.fieldCls + '">' + item[column.field] + '</td>';
							}
						});

						html += '</tr>';
					});
				}

				var compiledContents;
				if(!compiledContents) {
					compiledContents = $compile(html);
				}

				compiledContents($scope, function(clone) {
					$element.find('tbody').html(clone);
				});

			}

			//初始化表格
			var initDataTable = function() {
				angular.extend(opts, $scope.options);
				$scope.options = opts;

				//数据与url为空时，不显示分页,同时显示暂无数据
				if($scope.options.data == '' && $scope.options.url == '') {
					$scope.options.pagination = false;
					$scope.options.dataList = [];
					$scope.options.dataType = "unknown";
				} else if($scope.options.url != '' && $scope.options.url.length > 0) {
					$scope.options.dataType = "serverData";
					getServerData('init', 1, $scope.options.pageList[0]);
				} else if($scope.options.data != '' && $scope.options.data.length > 0) {
					$scope.options.dataType = "localData";
					initPagination($scope.options.data.length);
					$scope.options.dataList = $scope.options.data.slice(0, $scope.paginationConfig.pageSize);
					compiledTrs($scope.paginationConfig.pageNumber, $scope.paginationConfig.pageSize);
				}

			}

			//获得服务器端数据
			var getServerData = function(type, pageNumber, pageSize) {
				$http({
					url: $scope.options.url,
					method: $scope.options.method,
					params: {
						'page': pageNumber,
						'rows': pageSize,
						'sort': $scope.options.sort
					},
					data: $scope.options.param,
				}).success(function(data, status, headers, config) {
					if(status == 200) {
						$scope.options.dataList = data.rows;

						//判断是否初始化或是进行中
						if('init' == type) {
							initPagination(data.total);
						} else if('conduct' == type) {
							//如果总条数发生改变的时候，重新初始化
							if($scope.paginationConfig.total != data.total) {
								initPagination(data.total);
							}
						}

						compiledTrs(pageNumber, pageSize);
					} else {
						console.error("获得服务器端数据失败！");
					}
				}).error(function(data, header, config, status) {
					console.error("获得服务器端数据出错！");
				});
			}

			//初始化分页
			var initPagination = function(total) {
				//是否显示分页，显示后进行分页计算
				if($scope.options.pagination) {
					$scope.paginationConfig = {
						pageList: $scope.options.pageList,
						total: total,
						pageSize: $scope.options.pageList[0],
						pageNumber: 1
					}
				}
			}

			//本地数据改变
			var localDataChanged = function(start, end, type, pageParam) {
				$scope.options.dataList = $scope.options.data.slice(start, end);
				compiledTrs(pageParam.pageNumber, pageParam.pageSize);
			}

			//服务器数据改变
			var serverDataChanged = function(start, end, type, pageParam) {
				getServerData('conduct', pageParam.pageNumber, pageParam.pageSize);
			}

			//分页操作
			$scope.paginationChange = function(type, pageParam) {
				var start = 0,
					end = 0;

				if('nextPage' == type || 'previousPage' == type || 'refresh' == type) {
					start = (pageParam.pageNumber - 1) * pageParam.pageSize;
					end = pageParam.pageNumber * pageParam.pageSize;
				} else if('lastPage' == type) {
					start = (pageParam.pageTotal - 1) * pageParam.pageSize;
					end = pageParam.pageTotal * pageParam.pageSize;
				} else if('fristPage' == type || 'pageSizeChange' == type) {
					start = 0;
					end = pageParam.pageSize;
				}

				if("localData" == $scope.options.dataType) {
					localDataChanged(start, end, type, pageParam);
				} else if("serverData" == $scope.options.dataType) {
					serverDataChanged(start, end, type, pageParam);
				}
			}
			
			//搜索
			$scope.search=function(param){
				$scope.options.param=param;
				$scope.options.dataType = "serverData";
				getServerData('init', 1, $scope.options.pageList[0]);
			}

			//初始化表格
			initDataTable();
		}

	};

}]);

/**
 * 数据分页器
 */
cjhmeUI.directive('cjhmeDataPager', ['$filter', '$compile','$http', 'cjhmeConstant', function($filter, $compile, $http,cjhmeConstant) {
	return {
		scope: {
			options: '=',
			receive: '=',
			search:'='
		},
		replace: false,
		template: '<div cjhme-pagination   setOptions="paginationConfig" onPageChanged="paginationChange"></div>',
		link: function($scope, $element, $attrs) {
			var opts = {
				url: '',
				sort: '',
				method: 'POST',
				param: {},
				pagination: true,
				pageList: [10, 20, 30, 50, 100, 150, 200],
				data: []
			};

			//初始化表格
			var initDataPager = function() {
				angular.extend(opts, $scope.options);
				$scope.options = opts;

				//数据与url为空时，不显示分页,同时显示暂无数据
				if($scope.options.data == '' && $scope.options.url == '') {
					$scope.options.pagination = false;
					$scope.options.dataList = [];
					$scope.options.dataType = "unknown";
				} else if($scope.options.url != '' && $scope.options.url.length > 0) {
					$scope.options.dataType = "serverData";
					getServerData('init', 1, $scope.options.pageList[0]);
				} else if($scope.options.data != '' && $scope.options.data.length > 0) {
					$scope.options.dataType = "localData";
					initPagination($scope.options.data.length);
					$scope.options.dataList = $scope.options.data.slice(0, $scope.paginationConfig.pageSize);
					$scope.receive($scope.paginationConfig.pageNumber, $scope.paginationConfig.pageSize,$scope.options.dataList);
				}

			}

			//获得服务器端数据
			var getServerData = function(type, pageNumber, pageSize) {
				$http({
					url: $scope.options.url,
					method: $scope.options.method,
					params: {
						'page': pageNumber,
						'rows': pageSize,
						'sort': $scope.options.sort
					},
					data: $scope.options.param,
				}).success(function(data, status, headers, config) {
					if(status == 200) {
						$scope.options.dataList = data.rows;

						//判断是否初始化或是进行中
						if('init' == type) {
							initPagination(data.total);
						} else if('conduct' == type) {
							//如果总条数发生改变的时候，重新初始化
							if($scope.paginationConfig.total != data.total) {
								initPagination(data.total);
							}
						}

						$scope.receive(pageNumber, pageSize,$scope.options.dataList);
					} else {
						console.error("获得服务器端数据失败！");
					}
				}).error(function(data, header, config, status) {
					console.error("获得服务器端数据出错！");
				});
			}

			//初始化分页
			var initPagination = function(total) {
				//是否显示分页，显示后进行分页计算
				if($scope.options.pagination) {
					$scope.paginationConfig = {
						pageList: $scope.options.pageList,
						total: total,
						pageSize: $scope.options.pageList[0],
						pageNumber: 1
					}
				}
			}

			//本地数据改变
			var localDataChanged = function(start, end, type, pageParam) {
				$scope.options.dataList = $scope.options.data.slice(start, end);
				$scope.receive(pageParam.pageNumber, pageParam.pageSize,$scope.options.dataList);
			}

			//服务器数据改变
			var serverDataChanged = function(start, end, type, pageParam) {
				getServerData('conduct', pageParam.pageNumber, pageParam.pageSize);
			}

			//分页操作
			$scope.paginationChange = function(type, pageParam) {
				var start = 0,
					end = 0;

				if('nextPage' == type || 'previousPage' == type || 'refresh' == type) {
					start = (pageParam.pageNumber - 1) * pageParam.pageSize;
					end = pageParam.pageNumber * pageParam.pageSize;
				} else if('lastPage' == type) {
					start = (pageParam.pageTotal - 1) * pageParam.pageSize;
					end = pageParam.pageTotal * pageParam.pageSize;
				} else if('fristPage' == type || 'pageSizeChange' == type) {
					start = 0;
					end = pageParam.pageSize;
				}

				if("localData" == $scope.options.dataType) {
					localDataChanged(start, end, type, pageParam);
				} else if("serverData" == $scope.options.dataType) {
					serverDataChanged(start, end, type, pageParam);
				}
			}
			
			//搜索
			$scope.search=function(param){
				$scope.options.param=param;
				$scope.options.dataType = "serverData";
				getServerData('init', 1, $scope.options.pageList[0]);
			}

			//初始化表格
			initDataPager();
		}

	};

}]);