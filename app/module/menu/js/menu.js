var myApp = angular.module('cjhme');

//菜单查询
myApp.controller('menu.menuListCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.$emit('pageTitle', "菜单查询");

}]);

//菜单添加
myApp.controller('menu.menuAddCtrl', ['$scope', '$state', function($scope, $state) {
	var type = $state.params.type;
	$scope.formObj = {};

	if(type && type == 'add') {
		$scope.$emit('pageTitle', "菜单添加");
	} else if(type && type == 'edit') {
		$scope.$emit('pageTitle', "菜单编辑");
	}

	$scope.menuInstance;

	$scope.menuData = [{
		"id": "1",
		"parentId": "#",
		"name": "用户管理",
		"icon": 'fa-wrench',
		"isExpend": true,
		"isChecked": false,
		"children": [{
			"id": "2",
			"parentId": "1",
			"name": "添加管理",
			"icon": 'fa-columns',
			"url": 'modal'
		}]
	}];

	$scope.options = {
		//'url':'http://localhost:8080/cjhme/test/getTreeData.jhtml',
		//'asyncTree':true,
		'canChecked': true, //使用选择框
		'singleChecked': true,
		'animatedCls': 'animated fadeIn', //动画样式
		'onCheckboxChanged': function(node, $event) { //选择框改变事件
			console.info("选择框改变事件：");
			console.info(node);
		},
		'onNodeClicked': function(node, $event) { //节点单击事件
			$scope.formObj.parentMenuName = node.name;
			$scope.formObj.parentMenuId = node.id;
		}
	}

	$scope.stateList = [{
		'id': '1',
		'name': '可用'
	}, {
		'id': '2',
		'name': '禁用'
	}];

	if(type && type == 'edit') {
		$scope.formObj = {

		};

	}

	//树事件
	$scope.menuEvents = {
		'changed': function(parent, args) {
			console.info(args.node);
		}
	}

}]);