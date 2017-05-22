var myApp = angular.module('cjhme');

//用户查询
myApp.controller('user.userListCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.$emit('pageTitle', "用户查询");

	$scope.dataTableConfig = {
		param: {
			aa: '1'
		}, //后台请求参数
		serialNumber: true, //显示序号
		pagination: true, //是否显示分页
		pageList: [15, 30], //分页条数列表
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

	$scope.view = function(index, item) {
		$state.go('userView', item);
	}

}]);

//用户添加
myApp.controller('user.userAddCtrl', ['$scope', '$state', 'Upload', function($scope, $state, Upload) {
	var type = $state.params.type;
	$scope.formObj = {};

	if(type && type == 'add') {
		$scope.$emit('pageTitle', "用户添加");
	} else if(type && type == 'edit') {
		$scope.$emit('pageTitle', "用户编辑");
	}

	$scope.typeList = [{
		'id': '1',
		'name': '普通用户'
	}, {
		'id': '2',
		'name': '高级用户'
	}];

	$scope.stateList = [{
		'id': '1',
		'name': '可用'
	}, {
		'id': '2',
		'name': '禁用'
	}];

	$scope.sexList = [{
		'id': '1',
		'name': '男'
	}, {
		'id': '2',
		'name': '女'
	}];

	$scope.educationList = [{
		'id': '1',
		'name': '小学'
	}, {
		'id': '2',
		'name': '初中'
	}, {
		'id': '3',
		'name': '中专/高中'
	}, {
		'id': '4',
		'name': '专科'
	}, {
		'id': '5',
		'name': '本科'
	}, {
		'id': '6',
		'name': '硕士研究生'
	}, {
		'id': '7',
		'name': '博士研究生'
	}, {
		'id': '8',
		'name': '海归'
	}];

	$scope.maritalStatusList = [{
		'id': '1',
		'name': '未婚'
	}, {
		'id': '2',
		'name': '已婚'
	}, {
		'id': '3',
		'name': '离婚'
	}, {
		'id': '4',
		'name': '丧偶'
	}];

	if(type && type == 'edit') {
		$scope.formObj = {
			'userName': 'a123456',
			'password': '123456',
			'userNo': '123456',
			'realName': '张三',
			'birth': '1991-03-03',
			'idCard': '350581199103036623',
			'nativePlace': '福建-福州',
			'registerAddr': '福建省 福州市 鼓楼区',
			'homeAddr': '福建省 福州市 鼓楼区',
			'school': '福州大学',
			'specialty': '软件工程',
			'telephone': '1895025326x',
			'email': '1895025326x@139.com',
			'describe': '第一个用户',
			'familyMemberList': [{
				'realName': '张二',
				'relationship': '父亲',
				'telephone': '1565025326x',
				'describe': '紧急联系人'
			}, {
				'realName': '李丽',
				'relationship': '母亲',
				'telephone': '1335025326x',
				'describe': ''
			}],
			'educationalBgList': [{
				'timeRange': '2011-09-01至2015-06-30',
				'school': '福州大学',
				'specialty': '软件工程',
				'describe': '全日制本科'
			}],
			'certificateAndRewardList': [{
				'timeRange': '2011-09-01至2015-06-30',
				'serialNumber': 'jy10201236',
				'name': '学士学位',
				'describe': ''
			}],
			'workExperience': [{
				'timeRange': '2011-09-01至2015-06-30',
				'companyName': 'XXXXX公司',
				'witness': '李白',
				'telephone': '1335025326x',
				'describe': '有离职证明'
			}]
		};

		$scope.formObj.type = {
			'id': '1',
			'name': '普通用户'
		}

		$scope.formObj.state = {
			'id': '1',
			'name': '可用'
		}

		$scope.formObj.sex = {
			'id': '2',
			'name': '女'
		}

		$scope.formObj.education = {
			'id': '8',
			'name': '海归'
		}

		$scope.formObj.maritalStatus = {
			'id': '1',
			'name': '未婚'
		}

	}

	$scope.typeSelect = function() {
		console.info($scope.formObj.type)
	}

	$scope.stateSelect = function() {
		console.info($scope.formObj.state)
	}

	$scope.sexSelect = function() {
		console.info($scope.formObj.sex)
	}

	$scope.birthSelect = function() {
		console.info($scope.formObj.birth)
	}

	$scope.educationSelect = function() {
		console.info($scope.formObj.education)
	}

	$scope.maritalStatusSelect = function() {
		console.info($scope.formObj.maritalStatus)
	}

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

	$scope.save = function() {
		$state.reload();
	}

	$scope.saveAndBack = function() {
		$state.go('userList');
	}

}]);

//用户查看
myApp.controller('user.userViewCtrl', ['$scope', '$state', 'cjhmeModal', function($scope, $state, cjhmeModal) {
	$scope.$emit('pageTitle', "用户查看");
	$scope.formObj = {
		'userName': 'a123456',
		'password': '********',
		'userNo': '123456',
		'realName': '张三',
		'type': '普通用户',
		'state': '可用',
		'sex': '男',
		'education': '本科',
		'maritalStatus': '未婚',
		'birth': '1991-03-03',
		'idCard': '350581199103036623',
		'nativePlace': '福建-福州',
		'registerAddr': '福建省 福州市 鼓楼区',
		'homeAddr': '福建省 福州市 鼓楼区',
		'school': '社会大学',
		'specialty': '搬砖专业',
		'telephone': '1895025326x',
		'email': '1895025326x@139.com',
		'describe': '第一个用户',
		'familyMemberList': [{
			'realName': '张二',
			'relationship': '父亲',
			'telephone': '1565025326x',
			'describe': '紧急联系人'
		}, {
			'realName': '李丽',
			'relationship': '母亲',
			'telephone': '1335025326x',
			'describe': ''
		}],
		'educationalBgList': [{
			'timeRange': '2011-09-01至2015-06-30',
			'school': '福州大学',
			'specialty': '软件工程',
			'describe': '全日制本科'
		}],
		'certificateAndRewardList': [{
			'timeRange': '2011-09-01至2015-06-30',
			'serialNumber': 'jy10201236',
			'name': '学士学位',
			'describe': ''
		}],
		'workExperience': [{
			'timeRange': '2011-09-01至2015-06-30',
			'companyName': 'XXXXX公司',
			'witness': '李白',
			'telephone': '1335025326x',
			'describe': '有离职证明'
		}]
	};

	$scope.edit = function() {
		$state.go('userEdit');
	}

	$scope.delete = function() {
		cjhmeModal.question({
			title: '请确认',
			body: '您确定删除吗？',
			ok: function() {
				$state.go('userList');
			}
		});
	}

	$scope.back = function() {
		$state.go('userList');
	}
}]);

//个人资料
myApp.controller('user.userInfoViewCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.$emit('pageTitle', "个人资料");
	$scope.formObj = {
		'userName': 'a123456',
		'password': '********',
		'userNo': '123456',
		'realName': '张三',
		'type': '普通用户',
		'state': '可用',
		'sex': '男',
		'education': '本科',
		'maritalStatus': '未婚',
		'birth': '1991-03-03',
		'idCard': '350581199103036623',
		'nativePlace': '福建-福州',
		'registerAddr': '福建省 福州市 鼓楼区',
		'homeAddr': '福建省 福州市 鼓楼区',
		'school': '社会大学',
		'specialty': '搬砖专业',
		'telephone': '1895025326x',
		'email': '1895025326x@139.com',
		'describe': '第一个用户',
		'familyMemberList': [{
			'realName': '张二',
			'relationship': '父亲',
			'telephone': '1565025326x',
			'describe': '紧急联系人'
		}, {
			'realName': '李丽',
			'relationship': '母亲',
			'telephone': '1335025326x',
			'describe': ''
		}],
		'educationalBgList': [{
			'timeRange': '2011-09-01至2015-06-30',
			'school': '福州大学',
			'specialty': '软件工程',
			'describe': '全日制本科'
		}],
		'certificateAndRewardList': [{
			'timeRange': '2011-09-01至2015-06-30',
			'serialNumber': 'jy10201236',
			'name': '学士学位',
			'describe': ''
		}],
		'workExperience': [{
			'timeRange': '2011-09-01至2015-06-30',
			'companyName': 'XXXXX公司',
			'witness': '李白',
			'telephone': '1335025326x',
			'describe': '有离职证明'
		}]
	};

	$scope.back = function() {
		$state.go('main');
	}

}]);

//密码修改
myApp.controller('user.userPwdEditCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.$emit('pageTitle', "密码修改");
	$scope.formObj = {
		'userName': '百变小咖'
	};

	$scope.save = function() {
		$state.reload();
	}
	
	$scope.back = function() {
		$state.go('main');
	}

}]);