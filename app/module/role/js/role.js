var cjhme = angular.module('cjhme');

//角色查询
cjhme.controller('role.roleListCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.$emit('pageTitle', "角色查询");

	$scope.dataTableConfig = {
		param: {
			aa: '1'
		}, //后台请求参数
		serialNumber: true, //显示序号
		pagination: true, //是否显示分页
		pageList: [15, 30], //分页条数列表
		data: [{
			"roleNo": "10001",
			"roleNmae": "管理员",
			"state": "可用",
			"createUser": "钱一",
			"createTime": "2016-02-25 20:25:12"
		}, {
			"roleNo": "10002",
			"roleNmae": "CEO",
			"state": "禁用",
			"createUser": "张三",
			"createTime": "2016-02-23 20:25:12"
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

	$scope.view = function(index, item) {
		$state.go('roleView', item);
	}
}]);

//角色添加
cjhme.controller('role.roleAddCtrl', ['$scope', '$state', function($scope, $state) {
	var type = $state.params.type;
	$scope.formObj = {};

	if(type && type == 'add') {
		$scope.$emit('pageTitle', "角色添加");
	} else if(type && type == 'edit') {
		$scope.$emit('pageTitle', "角色编辑");
	}

	$scope.stateList = [{
		'id': '1',
		'name': '可用'
	}, {
		'id': '2',
		'name': '禁用'
	}];

	$scope.supperRoleList = [{
		'id': '1',
		'name': '是'
	}, {
		'id': '2',
		'name': '否'
	}];

	if(type && type == 'edit') {
		$scope.formObj = {
			'roleNo': '10001',
			'roleName': '管理员',
			'state': '可用'
		};

		$scope.formObj.supperRole = {
			'id': '1',
			'name': '是'
		}

		$scope.formObj.state = {
			'id': '1',
			'name': '可用'
		}

	}

	$scope.typeSelect = function() {
		console.info($scope.formObj.type)
	}

	$scope.stateSelect = function() {
		console.info($scope.formObj.state)
	}

	$scope.save = function() {
		$state.reload();
	}

	$scope.saveAndBack = function() {
		$state.go('roleList');
	}

}]);

//角色查看
cjhme.controller('role.roleViewCtrl', ['$scope', '$state', 'cjhmeModal', function($scope, $state, cjhmeModal) {
	$scope.$emit('pageTitle', "角色查看");
	$scope.formObj = {
		'roleNo': '10001',
		'roleName': '管理员',
		'state': '可用'
	};

	$scope.edit = function() {
		$state.go('roleEdit');
	}

	$scope.delete = function() {
		cjhmeModal.question({
			title: '请确认',
			body: '您确定删除吗？',
			ok: function() {
				$state.go('roleList');
			}
		});
	}

	$scope.back = function() {
		$state.go('roleList');
	}
}]);