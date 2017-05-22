var myApp = angular.module('cjhme');

myApp.filter("salaryFormat", ['$filter', function($filter) {
	return function(input) {
		return $filter('currency')(input / 1000, '￥');
	}
}]);

//分页
myApp.controller('demo.paginationCtrl', ['$scope', function($scope) {
	$scope.$emit('pageTitle', "分页");
	//分页
	$scope.pagerConfig = {
		total: 30,
		pageList: [15, 25, 35]
	}

	$scope.pagerChange = function(type, pageParam) {
		console.info(type);
		console.info(pageParam);

	}
}]);

//数据分页
myApp.controller('demo.dataPagerCtrl', ['$scope', '$filter', function($scope, $filter) {
	$scope.$emit('pageTitle', "数据分页器");

	$scope.dataPagerConfig = {
		pageList: [10, 15, 30], //分页条数列表
		data: [{
			"num": "10001",
			"name": "钱一",
			"age": 16,
			"salary": 25355656,
			"phone": "18950950213",
			"createTime": "2016-02-25 20:25:12"
		}, {
			"num": "10002",
			"name": "王二",
			"age": 32,
			"salary": 525355656,
			"phone": "18950950213",
			"createTime": "2016-02-25 20:25:12"
		}, {
			"num": "10003",
			"name": "张三",
			"age": 25,
			"salary": 255355656,
			"phone": "18358013642",
			"createTime": "2016-02-25 20:25:12"
		}, {
			"num": "10004",
			"name": "李四",
			"age": 20,
			"salary": 253556,
			"phone": "18558013565",
			"createTime": "2016-02-25 20:25:12"
		}, {
			"num": "10005",
			"name": "王五",
			"age": 30,
			"salary": 55656,
			"phone": "18958013552",
			"createTime": "2016-02-25 20:25:12"
		}, {
			"num": "10006",
			"name": "赵六",
			"age": 32,
			"salary": 5656,
			"phone": "18958015327",
			"createTime": "2016-02-25 20:25:12"
		}, {
			"num": "10007",
			"name": "马七",
			"age": 37,
			"salary": 25355656000,
			"phone": "18958035552",
			"createTime": "2016-02-25 20:25:12"
		}, {
			"num": "10008",
			"name": "刘八",
			"age": 60,
			"salary": 56,
			"phone": "13558606352",
			"createTime": "2016-02-25 20:25:12"
		}, {
			"num": "10009",
			"name": "孙九",
			"age": 26,
			"salary": 85655656,
			"phone": "18695815352",
			"createTime": "2016-02-25 20:25:12"
		}, {
			"num": "10010",
			"name": "周十",
			"age": 40,
			"salary": 6,
			"phone": "15662561352",
			"createTime": "2016-02-25 20:25:12"
		}, {
			"num": "10011",
			"name": "陈年",
			"age": 30,
			"salary": 0,
			"phone": "17655013552",
			"createTime": "2016-02-25 20:25:12"
		}, {
			"num": "10012",
			"name": "林杰",
			"age": 50,
			"salary": 10,
			"phone": "18980153522",
			"createTime": "2016-02-25 20:25:12"
		}, {
			"num": "10013",
			"name": "张明",
			"age": 10,
			"salary": 0,
			"phone": "16958013522",
			"createTime": "2016-02-25 20:25:12"
		}, {
			"num": "10014",
			"name": "许丽",
			"age": 25,
			"salary": 100,
			"phone": "18958013524",
			"createTime": "2016-02-25 20:25:12"
		}, {
			"num": "10015",
			"name": "上官丹凤",
			"age": 30,
			"salary": 3660,
			"phone": "18958301352",
			"createTime": "2016-02-25 20:25:12"
		}]
	}

	$scope.dataPagerReceive = function(pageNumber, pageSize, dataList) {
		$scope.list = dataList;
	}

	$scope.search = function() {
		console.info("search");
		$scope.dataPagerSearch({
			'data': '1'
		});
	}

}]);

//数据表格
myApp.controller('demo.dataTableCtrl', ['$scope', '$filter', function($scope, $filter) {
	$scope.$emit('pageTitle', "数据表格");
	var data = [{
		"num": "10001",
		"name": "钱一",
		"age": 16,
		"salary": 25355656,
		"phone": "18950950213",
		"createTime": "2016-02-25 20:25:12"
	}, {
		"num": "10002",
		"name": "王二",
		"age": 32,
		"salary": 525355656,
		"phone": "18950950213",
		"createTime": "2016-02-25 20:25:12"
	}, {
		"num": "10003",
		"name": "张三",
		"age": 25,
		"salary": 255355656,
		"phone": "18358013642",
		"createTime": "2016-02-25 20:25:12"
	}, {
		"num": "10004",
		"name": "李四",
		"age": 20,
		"salary": 253556,
		"phone": "18558013565",
		"createTime": "2016-02-25 20:25:12"
	}, {
		"num": "10005",
		"name": "王五",
		"age": 30,
		"salary": 55656,
		"phone": "18958013552",
		"createTime": "2016-02-25 20:25:12"
	}, {
		"num": "10006",
		"name": "赵六",
		"age": 32,
		"salary": 5656,
		"phone": "18958015327",
		"createTime": "2016-02-25 20:25:12"
	}, {
		"num": "10007",
		"name": "马七",
		"age": 37,
		"salary": 25355656000,
		"phone": "18958035552",
		"createTime": "2016-02-25 20:25:12"
	}, {
		"num": "10008",
		"name": "刘八",
		"age": 60,
		"salary": 56,
		"phone": "13558606352",
		"createTime": "2016-02-25 20:25:12"
	}, {
		"num": "10009",
		"name": "孙九",
		"age": 26,
		"salary": 85655656,
		"phone": "18695815352",
		"createTime": "2016-02-25 20:25:12"
	}, {
		"num": "10010",
		"name": "周十",
		"age": 40,
		"salary": 6,
		"phone": "15662561352",
		"createTime": "2016-02-25 20:25:12"
	}, {
		"num": "10011",
		"name": "陈年",
		"age": 30,
		"salary": 0,
		"phone": "17655013552",
		"createTime": "2016-02-25 20:25:12"
	}, {
		"num": "10012",
		"name": "林杰",
		"age": 50,
		"salary": 10,
		"phone": "18980153522",
		"createTime": "2016-02-25 20:25:12"
	}, {
		"num": "10013",
		"name": "张明",
		"age": 10,
		"salary": 0,
		"phone": "16958013522",
		"createTime": "2016-02-25 20:25:12"
	}, {
		"num": "10014",
		"name": "许丽",
		"age": 25,
		"salary": 100,
		"phone": "18958013524",
		"createTime": "2016-02-25 20:25:12"
	}, {
		"num": "10015",
		"name": "上官丹凤",
		"age": 30,
		"salary": 3660,
		"phone": "18958301352",
		"createTime": "2016-02-25 20:25:12"
	}];

	$scope.dataTableConfig = {
		tableCls: 'c-line-table table-hover', //表格样式
		serialNumber: true, //显示序号
		pagination: true, //是否显示分页
		pageList: [5, 10, 15], //分页条数列表
		dataEmptyMsg: '暂无数据...', //暂无数据提示消息
		columns: [{
			title: '编号',
			field: 'num',
			headerCls: 'col-md-1 text-center',
			fieldCls: 'text-center'
		}, { //字段
			title: '姓名',
			field: 'name',
			headerCls: 'col-md-1 text-center',
			type: 'render',
			render: function(val, column, rowData) {
				//return "<div style='color:red'>" + rowData['name'] + "</div>";
				return "<div class='text-center' style='color:red'>" + val + "</div>";
			}
		}, {
			title: '电话',
			field: 'phone',
			headerCls: 'col-md-2 text-center',
			fieldCls: 'text-center',
			type: 'render',
			render: function(val, column, rowData, rowIndex, columnIndex, dataListName) {
				return '<div class="text-center"><button class="btn btn-success btn-sm" ng-click="event(\'' + column + '\',' + dataListName + '[' + rowIndex + '])();">拨打' + val + '</button></div>';
			}
		}, {
			title: '薪水',
			field: 'salary',
			headerCls: 'col-md-2 text-center',
			fieldCls: 'text-center',
			type: 'render',
			render: function(val, column, rowData, rowIndex, columnIndex, dataListName) {
				return "<div class='text-center'>" + $filter('salaryFormat')(val) + "</div>";
			}
		}, {
			title: '创建时间',
			field: 'createTime',
			headerCls: 'col-md-2 text-center',
			type: 'render',
			render: function(val, column, rowData, rowIndex, columnIndex, dataListName) {
				return "<div class='text-center'>" + $filter('date')(new Date(val), 'yyyy-MM-dd') + "</div>";
			}
		}, {
			title: '操作',
			field: 'phone',
			headerCls: 'col-md-3 text-left',
			fieldCls: 'text-left',
			type: 'action',
			buttons: [{
				title: '查看',
				btnCls: 'btn-sm btn-info',
				action: 'view',
			}, {
				title: '删除',
				btnCls: 'btn-sm btn-danger',
				action: 'delete',
				visible: 'item["age"]>30',
			}]
		}],
		data: data
	}

	$scope.dataTableEvent = function(act, item) {
		console.info(act);
		console.info(item);
	}

	$scope.search = function() {
		console.info("search");
		$scope.dataTableSearch({
			'name': '张三'
		});
	}
}]);

//模态框
myApp.controller('demo.modalCtrl', ['$scope', 'cjhmeModal', function($scope, cjhmeModal) {
	$scope.$emit('pageTitle', "模态框");

	$scope.openConfirm = function() {
		cjhmeModal.confirm({
			title: '请确认',
			content: '您确定？',
			detail: '这里的详细内容！',
			ok: function() {
				console.info("确认框 ok")
			},
			cancel: function() {
				console.info("确认框 cancel")
			}
		});
	}

	$scope.openWarning = function() {
		cjhmeModal.warning({
			title: '警告框',
			content: '这是一个警告',
			ok: function() {
				console.info("警告框 ok")
			}
		});
	}

	$scope.openInfo = function() {
		cjhmeModal.info({
			title: '消息框',
			content: '这是一个消息',
			ok: function() {
				console.info("消息框 ok")
			}
		});
	}

	$scope.openError = function() {
		cjhmeModal.error({
			title: '错误框',
			content: '这是一个错误框',
			ok: function() {
				console.info("错误框 ok")
			}
		});
	}

	$scope.openInfoAutoClose = function() {
		cjhmeModal.info({
			title: '自动关闭消息框',
			content: '这是一个自动关闭消息',
			autoClose: true
		});
	}

	$scope.openWarningAutoClose = function() {
		cjhmeModal.warning({
			title: '自动关闭警告框',
			content: '这是一个自动关闭警告',
			autoClose: true,
			autoCloseTime: 1000
		});
	}

	$scope.openErrorAutoClose = function() {
		cjhmeModal.error({
			title: '自动关闭错误框',
			content: '这是一个自动关闭错误框',
			autoClose: true,
			autoCloseTime: 2500
		});
	}

	$scope.openCustomModal = function() {
		cjhmeModal.customModal({
			templateUrl: "modalContent.html",
			scope: $scope,
			size: 'md',
			controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
				$scope.ok = function() {
					$scope.$dismiss();
				}
			}]
		});
	}

}]);

//时间选择器
myApp.controller('demo.datepickerCtrl', ['$scope', '$filter', function($scope, $filter) {
	$scope.$emit('pageTitle', "时间选择器");

	$scope.myDate;

	$scope.myDateTime;

	$scope.callback = function(val, formatVal) {
		console.info(val + "-" + formatVal);
	}

}]);

//开关按钮
myApp.controller('demo.switchCtrl', ['$scope', '$filter', function($scope, $filter) {
	$scope.$emit('pageTitle', "开关按钮");

	$scope.switchChange = function(val) {
		console.info(val)
	}
}]);

//bootstrap css
myApp.controller('demo.bootCssCtrl', ['$scope', '$filter', function($scope, $filter) {
	$scope.$emit('pageTitle', "样式");
}]);

//列表
myApp.controller('demo.listCtrl', ['$scope', '$filter', function($scope, $filter) {
	$scope.$emit('pageTitle', "列表");
}]);

//图表
myApp.config(['ChartJsProvider', function(ChartJsProvider) {
	ChartJsProvider.setOptions({
		chartColors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
	});
}]).controller('demo.chartCtrl', ['$scope', function($scope) {
	$scope.$emit('pageTitle', "图表");

	$scope.lineLabels = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"];
	$scope.lineSeries = ['福州', '厦门'];
	$scope.lineData = [
		[23, 55, 90, 75, 66, 55, 39],
		[37, 15, 23, 55, 52, 12, 300]
	];
	$scope.lineClick = function(points, evt) {
		console.log(points, evt);
	};
	$scope.lineDatasetOverride = [{
		yAxisID: 'y-axis-1'
	}, {
		yAxisID: 'y-axis-2'
	}];
	$scope.lineOptions = {
		scales: {
			yAxes: [{
				id: 'y-axis-1',
				type: 'linear',
				display: true,
				position: 'left'
			}, {
				id: 'y-axis-2',
				type: 'linear',
				display: true,
				position: 'right'
			}]
		}
	};

	$scope.barLabels = ["一季度", "二季度", "三季度", "四季度"];
	$scope.barData = [200, 150, 300, 120];

	$scope.pieLabels = ["一季度", "二季度", "三季度", "四季度"];
	$scope.pieData = [200, 150, 300, 120];
}]);

//日历
myApp.controller('demo.calendarCtrl', ['$scope', '$filter', function($scope, $filter) {
	$scope.$emit('pageTitle', "日历");
	$scope.eventSources = [];

	$scope.uiConfig = {
		calendar: {
			height: 500,
			editable: true,
			header: {
				left: 'month basicWeek basicDay agendaWeek agendaDay',
				center: 'title',
				right: 'today prev,next'
			},
			eventClick: $scope.alertEventOnClick,
			eventDrop: $scope.alertOnDrop,
			eventResize: $scope.alertOnResize
		}
	};
}]);

//树
myApp.controller('demo.treeCtrl', ['$scope', '$filter', function($scope, $filter) {
	$scope.$emit('pageTitle', "树与下拉树");
	$scope.instance;
	$scope.tData = [{
		"id": "1",
		"parentId": "#",
		"name": "1",
		"icon": 'fa-wrench',
		"isExpend": true,
		"isChecked": false,
		"children": [{
			"id": "2",
			"parentId": "1",
			"name": "1-1",
			"icon": 'fa-columns',
			"url": 'modal'
		}, {
			"id": "3",
			"parentId": "1",
			"name": "1-2",
			"icon": 'fa-pagelines',
			"isChecked": false,
			"url": 'pagination'
		}, {
			"id": "4",
			"parentId": "1",
			"name": "1-3",
			"icon": 'fa-table',
			"url": 'dataPager'
		}, {
			"id": "5",
			"parentId": "1",
			"name": "1-4",
			"icon": 'fa-bell',
			"isChecked": true,
			"url": 'dataTable'
		}, {
			"id": "6",
			"parentId": "1",
			"name": "1-5",
			"icon": 'fa-css3',
			"url": 'bootstrapCss',
			"isExpend": true,
			"isChecked": true,
			"children": [{
				"id": "7",
				"parentId": "6",
				"name": "1-5-1",
				"icon": 'fa-bug',
				"url": '1-5-1',
				"isExpend": true,
				"children": [{
					"id": "8",
					"parentId": "7",
					"name": "1-5-1-1",
					"icon": 'fa-cab',
					"url": 'bootstrapCss',
					"isExpend": true,
					"children": [{
						"id": "9",
						"parentId": "8",
						"name": "1-5-1-1-1",
						"icon": 'fa-bus',
						"url": '1',
						"isExpend": true,
					}, {
						"id": "10",
						"parentId": "8",
						"name": "1-5-1-1-2",
						"icon": 'fa-car',
						"url": '1',
						"isExpend": true,
					}]
				}]
			}, {
				"id": "11",
				"parentId": "6",
				"name": "1-5-2",
				"icon": 'fa-book',
				"url": 'bootstrapCss',
				"isExpend": true,
				"isChecked": false
			}]
		}]
	}]

	$scope.options = {
		//'url':'http://localhost:8080/cjhme/test/getTreeData.jhtml',
		//'asyncTree':true,
		'canChecked': true, //使用选择框
		'cascadeChecked': false, //级联选择
		'singleChecked': false,
		'singleCheckedNodeId': 9,
		'hideParentCheckBox': false,
		'animatedCls': 'animated fadeIn', //动画样式
		'onCheckboxChanged': function(node, $event) { //选择框改变事件
			console.info("选择框改变事件：");
			console.info(node);
		},
		'onNodeClicked': function(node, $event) { //节点单击事件
			console.info("节点单击事件：");
			console.info(node);
		}
	}

	//获得选中的数据
	$scope.getCheckedData = function() {
		console.info("获得选中的数据：");
		console.info($scope.instance.getCheckedData());
	}

	//获得所有数据
	$scope.getAllData = function() {
		console.info("获得所有数据：");
		console.info($scope.instance.getAllData());
	}

	//选择一个节点
	$scope.checkedNode = function() {
		console.info("选择一个节点：");
		//$scope.instance.setCheckedNodeById(5);
	}

	$scope.myDropdownTree;
	$scope.dInstance;
	$scope.treeData = [{
		"id": "1",
		"parentId": "#",
		"name": "节点一",
		"icon": 'fa-wrench',
		"isExpend": true,
		"isChecked": false,
		"children": [{
			"id": "2",
			"parentId": "1",
			"name": "节点二",
			"icon": 'fa-columns',
			"url": 'modal'
		}, {
			"id": "3",
			"parentId": "1",
			"name": "节点三",
			"icon": 'fa-pagelines',
			"isChecked": false,
			"url": 'pagination'
		}, {
			"id": "4",
			"parentId": "1",
			"name": "节点四",
			"icon": 'fa-table',
			"url": 'dataPager'
		}, {
			"id": "5",
			"parentId": "1",
			"name": "节点五",
			"icon": 'fa-bell',
			"isChecked": false,
			"url": 'dataTable'
		}, {
			"id": "6",
			"parentId": "1",
			"name": "节点六",
			"icon": 'fa-css3',
			"url": 'bootstrapCss',
			"isExpend": true,
			"isChecked": false,
			"children": [{
				"id": "7",
				"parentId": "6",
				"name": "节点七",
				"icon": 'fa-bug',
				"url": '1-5-1',
				"isExpend": true,
				"children": [{
					"id": "8",
					"parentId": "7",
					"name": "节点八",
					"icon": 'fa-cab',
					"url": 'bootstrapCss',
					"isExpend": true,
					"children": [{
						"id": "9",
						"parentId": "8",
						"name": "节点九",
						"icon": 'fa-bus',
						"url": '1',
						"isExpend": false,
					}, {
						"id": "10",
						"parentId": "8",
						"name": "节点十",
						"icon": 'fa-car',
						"url": '1',
						"isExpend": false,
					}]
				}]
			}, {
				"id": "11",
				"parentId": "6",
				"name": "节点十一",
				"icon": 'fa-book',
				"url": 'bootstrapCss',
				"isExpend": true,
				"isChecked": false
			}]
		}]
	}]

	$scope.treeOptions = {
		//'url':'http://localhost:8080/cjhme/test/getTreeData.jhtml',
		//'asyncTree':true,
		'canChecked': true, //使用选择框
		'cascadeChecked': false, //级联选择
		'singleChecked': false,
		'singleCheckedNodeId': 9,
		'hideParentCheckBox': false,
		'animatedCls': 'animated fadeIn', //动画样式
		'direction': false, //下拉方向，false向上，true向下（默认）
		'onCheckboxChanged': function(node, $event) { //选择框改变事件
			console.info("下拉选择框改变事件：");
			console.info(node);
		},
		'onNodeClicked': function(node, $event) { //节点单击事件
			console.info("下拉节点单击事件：");
			console.info(node);
		},
		'onOk': function() {
			console.info($scope.myDropdownTree);
		},
		'onClose': function() {
			console.info($scope.myDropdownTree);
		}
	}

	//设置值
	$scope.setVal = function() {
		$scope.dInstance.setVal('2,4,6');
		console.info("value:" + $scope.myDropdownTree);
	}

}]);

//文件上传
myApp.controller('demo.fileUploadCtrl', ['$scope', '$filter', 'Upload', function($scope, $filter, Upload) {
	$scope.$emit('pageTitle', "文件上传");

	$scope.uploadImg = function(file) {
		Upload.upload({
			url: '',
			data: {
				'file': file,
				'name': 'aa'
			}
		}).then(function(resp) {
			console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
		}, function(resp) {
			console.log('Error status: ' + resp.status);
		}, function(evt) {
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		});
	};

}]);

//自定义样式
myApp.controller('demo.customCssCtrl', ['$scope', '$filter', '$http', function($scope, $filter, $http) {
	$scope.$emit('pageTitle', "自定义样式");

	var url = "http://localhost:8080/cjhme/user/queryUserByConditionPaging.jhtml";

	$scope.doPost = function() {
		$http({
			url: url,
			method: "POST",
		}).success(function(data, status, headers, config) {
			doSvc();
			doSvc();
		}).error(function(data, header, config, status) {
			console.info(data)
		});
	}

	function doSvc() {
		$http({
			url: url,
			method: "POST",
		}).success(function(data, status, headers, config) {
			console.info(data)
		}).error(function(data, header, config, status) {
			console.info(data)
		});
	}

}]);

//富文本编辑器
myApp.controller('demo.editorCtrl', ['$scope', '$filter', '$http', function($scope, $filter, $http) {
	$scope.$emit('pageTitle', "富文本编辑器");

	$scope.configAll = {
		initialFrameHeight: 500, //初始化高度
		initialFrameWidth: '100%', //初始化宽度
		autoFloatEnabled: false, //浮动
		toolbars: [
			[
				'source', //源代码
				'undo', //撤销
				'redo', //重做
				'customstyle', //自定义标题
				'insertcode', //代码语言
				'fontfamily', //字体
				'fontsize', //字号
				'paragraph', //段落格式
				'forecolor', //字体颜色
				'backcolor', //背景色
				'background', //背景
				'edittip ', //编辑提示
				'autotypeset', //自动排版
				'touppercase', //字母大写
				'tolowercase', //字母小写
				'bold', //加粗
				'indent', //首行缩进
				'italic', //斜体
				'underline', //下划线
				'strikethrough', //删除线
				'subscript', //下标
				'superscript', //上标
				'fontborder', //字符边框
				'formatmatch', //格式刷
				'blockquote', //引用
				'insertorderedlist', //有序列表
				'insertunorderedlist', //无序列表
				'directionalityltr', //从左向右输入
				'directionalityrtl', //从右向左输入
				'lineheight', //行间距
				'rowspacingtop', //段前距
				'rowspacingbottom', //段后距
				'justifyleft', //居左对齐
				'justifyright', //居右对齐
				'justifycenter', //居中对齐
				'justifyjustify', //两端对齐
				'pasteplain', //纯文本粘贴模式
				'selectall', //全选
				'horizontal', //分隔线
				'removeformat', //清除格式
				'cleardoc', //清空文档
				'time', //时间
				'date', //日期
				'unlink', //取消链接
				'simpleupload', //单图上传
				'insertimage', //多图上传
				'edittable', //表格属性
				'edittd', //单元格属性
				'link', //超链接
				'anchor', //锚点
				'emotion', //表情
				'spechars', //特殊字符
				'searchreplace', //查询替换
				'map', //Baidu地图
				'insertvideo', //视频
				'scrawl', //涂鸦
				'music', //音乐
				'pagebreak', //分页
				'insertframe', //插入Iframe
				'imagenone', //默认
				'imageleft', //左浮动
				'imageright', //右浮动
				'attachment', //附件
				'imagecenter', //居中
				'wordimage', //图片转存
				'template', //模板
				'inserttable', //插入表格
				'insertrow', //前插入行
				'insertcol', //前插入列
				'mergeright', //右合并单元格
				'mergedown', //下合并单元格
				'deleterow', //删除行
				'deletecol', //删除列
				'splittorows', //拆分成行
				'splittocols', //拆分成列
				'splittocells', //完全拆分单元格
				'deletecaption', //删除表格标题
				'inserttitle', //插入标题
				'mergecells', //合并多个单元格
				'deletetable', //删除表格
				'insertparagraphbeforetable', //"表格前插入行"
				'drafts', // 从草稿箱加载
				'print', //打印
				'preview' //预览
			]
		]

	}

	$scope.config = {
		toolbars: [
			['Source', 'Undo', 'Redo', 'Bold']
		],
		initialFrameHeight: 300
	}
}]);

//下拉框
myApp.controller('demo.selectCtrl', ['$scope', '$filter', 'Upload', function($scope, $filter, Upload) {
	$scope.$emit('pageTitle', "下拉框");

    //初始化
	$scope.typeList = [{
		'id': '1',
		'name': '普通用户'
	}, {
		'id': '2',
		'name': '高级用户'
	}];
	
	//选择
	$scope.selectType=function(){
		$scope.type = {
			'id': '2',
			'name': '高级用户'
		}
	}

}]);