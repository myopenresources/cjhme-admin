var cjhmeUI = angular.module('ui.cjhme');

/**
 * 树
 */
cjhmeUI.directive('cjhmeTree', ['$http', 'cjhmeConstant', function($http, cjhmeConstant) {
	return {
		restrict: 'E',
		templateUrl: cjhmeConstant.baseCfg.path + 'tree/treeRoot.html',
		scope: {
			treeData: '=',
			options: '=',
			instance: '='
		},
		link: function($scope, $element, $attrs) {
			var opts = {
				'url': '', //AJAX请求后台服务器地址
				'method': 'POST', //AJAX请求类型
				'params': '', //AJAX请求参数
				'asyncTree': false, //异步树
				'singleChecked': false, //单选
				'singleCheckedNodeId': '', //单选，根据id节点选择节点
				'canChecked': false, //使用选择框
				'cascadeChecked': false, //级联选择
				'hideParentCheckBox': false, //隐藏父选择框
				'animatedCls': '', //动画样式
				'onCheckboxChanged': function(node, $event) {}, //选择框改变事件
				'onNodeClicked': function(node, $event) {} //节点单击事件
			};

			//内部方法
			var innerMethod = {
				initTree: function() { //初始化树
					angular.extend(opts, $scope.options);
					$scope.options = opts;

					//url参数存在时,从服务器获取初始数据
					if($scope.options.url && '' != $scope.options.url && undefined != $scope.options.url && null != $scope.options.url) {
						innerMethod.getInitDataFromServer();
					}
				},
				getInitDataFromServer: function() { //从服务器获取初始数据
					$http({
						url: $scope.options.url,
						method: $scope.options.method,
						params: $scope.options.params,
					}).success(function(data, status, headers, config) {
						if(status == 200) {
							$scope.treeData = data;
						} else {
							console.error("从服务器获取初始数据失败！");
						}
					}).error(function(data, header, config, status) {
						console.error("从服务器获取初始数据出错！");
					});
				},
				getAsyncDataFromServer: function(node) { //从服务器获取异步数据
					$http({
						url: $scope.options.url,
						method: $scope.options.method,
						params: $scope.options.params,
					}).success(function(data, status, headers, config) {
						if(status == 200) {
							node.children = data;
							node.isExpend = true;
						} else {
							console.error("从服务器获取异步数据失败！");
						}
					}).error(function(data, header, config, status) {
						console.error("从服务器获取异步数据出错！");
					});
				},
				getCheckedData: function(node, ckList) { //获得选中的数据
					var nodes = node.children;
					if(nodes && null != nodes && undefined != nodes) {
						for(var i = 0; i < nodes.length; i++) {
							if(nodes[i].isChecked) {
								ckList.push(nodes[i]);
							}

							if(nodes[i].children) {
								innerMethod.getCheckedData(nodes[i], ckList);
							}
						}
					}
				},
				checkedChildrenNodes: function(node, id, checkedState) { //选中所有子节点
					var nodes = node.children;
					if(nodes && null != nodes && undefined != nodes) {
						for(var i = 0; i < nodes.length; i++) {
							if(nodes[i].parentId == id) {
								nodes[i].isChecked = checkedState;
							}

							if(nodes[i].children) {
								innerMethod.checkedChildrenNodes(nodes[i], nodes[i].id, checkedState);
							}
						}
					}
				},
				checkedParentNode: function(node) { //选择父节点
					var nodeList = new Array();
					//查询到当前节点的父节点
					for(var i = 0; i < $scope.treeData.length; i++) {
						innerMethod.searchParentNode($scope.treeData[i], node.parentId, nodeList);
					}

					if(nodeList && nodeList.length > 0) {
						var parentNode = nodeList[0];
						var checkedCount = 0;
						for(var j = 0; j < parentNode.children.length; j++) {
							if(parentNode.children[j].isChecked) {
								checkedCount += 1;
							}
						}

						//子节点选择的数量与父节点一样时，父节点选中，不一样时父节点取消选中
						if(parentNode.children.length == checkedCount) {
							parentNode.isChecked = true;
						} else {
							parentNode.isChecked = false;
						}

						//选择自己的父节点
						innerMethod.checkedParentNode(parentNode);
					}
				},
				searchParentNode: function(node, parentId, nodeList) { //查找父节点
					if(node.id == parentId) {
						nodeList.push(node);
						return;
					}

					var nodes = node.children;
					if(nodes && null != nodes && undefined != nodes) {
						for(var i = 0; i < nodes.length; i++) {
							innerMethod.searchParentNode(nodes[i], parentId, nodeList);
						}
					}
				},
				searchNode: function(node, id, nodeList) { //查找节点
					if(node.id == id) {
						nodeList.push(node);
						return;
					}

					var nodes = node.children;
					if(nodes && null != nodes && undefined != nodes) {
						for(var i = 0; i < nodes.length; i++) {
							innerMethod.searchParentNode(nodes[i], id, nodeList);
						}
					}
				},
				checkedAllByState: function(nodes, state) { //根据状态选择所有节点
					for(var i = 0; i < nodes.length; i++) {
						nodes[i].isChecked = state;
						if(nodes[i].children) {
							innerMethod.checkedAllByState(nodes[i].children, state);
						}
					}
				},
				checkedNodesByState: function(node, ids, state) {
					var curId = '';
					var index = '';
					for(var i = 0; i < ids.length; i++) {
						if(node.id == ids[i]) {
							curId = node.id;
							index = i;
							break;
						}
					}

					if(curId && curId != '') {
						node.isChecked = state;
						ids.splice(index, 1);
					} else {
						node.isChecked = !state;
					}

					var nodes = node.children;
					if(nodes && null != nodes && undefined != nodes) {
						for(var i = 0; i < nodes.length; i++) {
							innerMethod.checkedNodesByState(nodes[i], ids, state);
						}
					}
				}
			}

			//模版路径
			$scope.templateUrl = function() {
				return cjhmeConstant.baseCfg.path + "tree/treeItem.html";
			}

			//初始化显示选择框
			$scope.initShowCheckbox = function(node) {
				if($scope.options.canChecked && !($scope.options.hideParentCheckBox && !$scope.isLeaf(node))) {
					return true;
				} else {
					return false;
				}
			}

			//初始选择框
			$scope.initChecked = function(node) {
				//使用选择框
				if($scope.options.canChecked) {
					//如果是单选(初始化都为false)
					if($scope.options.singleChecked) {
						//匹配选择的节点
						if($scope.options.singleCheckedNodeId == node.id) {
							node.isChecked = true;
						} else {
							node.isChecked = false;
						}
					} else {
						//如果isChecked不存在时默认为false
						if(node.isChecked == '' || node.isChecked == null || node.isChecked == undefined) {
							node.isChecked = false;
						} else {
							//级联选择
							if($scope.options.cascadeChecked) {
								innerMethod.checkedChildrenNodes(node, node.id, node.isChecked);
							}
						}
					}
				}
			}

			//展开
			$scope.nodeExpended = function(node, $event) {
				node.isExpend = !node.isExpend;
				$event.stopPropagation();
			};

			//是否子节点
			$scope.isLeaf = function(node) {
				return !node.children || !node.children.length;
			};

			//选择框改变
			$scope.onCheckboxChanged = function(node, $event) {
				if($scope.options.onCheckboxChanged) {
					$scope.options.onCheckboxChanged(node, $event);
				}

				//如果是单选
				if($scope.options.singleChecked) {
					innerMethod.checkedAllByState($scope.treeData, false);
					node.isChecked = true;
				} else {
					//级联选择
					if($scope.options.cascadeChecked) {
						innerMethod.checkedChildrenNodes(node, node.id, node.isChecked);
						innerMethod.checkedParentNode(node);
					}
				}

			}

			//节点单击
			$scope.onNodeClicked = function(node, $event) {
				if($scope.options.onNodeClicked) {
					$scope.options.onNodeClicked(node, $event);
				}

				//如果是异步树
				if($scope.options.asyncTree) {
					innerMethod.getAsyncDataFromServer(node);
				}

			}

			//实例方法
			$scope.instance = {
				getCheckedData: function() { //获得选中的数据
					var ckList = new Array();
					for(var i = 0; i < $scope.treeData.length; i++) {
						if($scope.treeData[i].isChecked) {
							ckList.push($scope.treeData[i]);
						}
						innerMethod.getCheckedData($scope.treeData[i], ckList);
					}
					return ckList;
				},
				getAllData: function() { //获得所有数据
					return $scope.treeData;
				},
				setCheckedNodeById: function(id) { //根据id选中节点
					var nodeList = new Array();
					for(var i = 0; i < $scope.treeData.length; i++) {
						innerMethod.searchNode($scope.treeData[i], id, nodeList);
					}

					if(nodeList.length > 0) {
						//如果是单选
						if($scope.options.singleChecked) {
							innerMethod.checkedAllByState($scope.treeData, false);
							nodeList[0].isChecked = true;
						}
					}
				},
				setCheckedNodeByIds: function(ids) { //根据ids选中节点
					for(var i = 0; i < $scope.treeData.length; i++) {
						innerMethod.checkedNodesByState($scope.treeData[i], ids, true);
					}
				},
				checkedAllByState: function(state) { //根据状态选中节点
					innerMethod.checkedAllByState($scope.treeData, state);
				}

			}

			innerMethod.initTree();
		}
	};
}]);

/**
 * 下拉树
 */
cjhmeUI.directive('cjhmeSelectTree', ['$http', 'cjhmeConstant', function($http, cjhmeConstant) {
	return {
		restrict: 'E',
		templateUrl: cjhmeConstant.baseCfg.path + 'tree/selectTree.html',
		require: 'ngModel',
		scope: {
			treeData: '=',
			options: '=',
			placeholder: '@',
			boxWidth: '=',
			boxHeight: '=',
			instance: '='
		},
		link: function($scope, $element, $attrs, ngModelCtr) {
			$scope.treeInstance;
			var opts = {
				direction: true,
				onOk: function(data) { //确认事件
				},
				onClose: function() { //关闭事件
				}
			};

			//内部方法
			var innerMethod = {
				initSelectTreee: function() { //初始化树
					angular.extend(opts, $scope.options);
					$scope.options = opts;
				},
				closeSelect: function() { //关闭下拉
					$element.find('.select-tree').removeClass('open');
				},
				setSelectVal: function() {//设置值
					var names = new Array();
					var ids = new Array();
					if($scope.treeInstance.getCheckedData()) {
						for(var i = 0; i < $scope.treeInstance.getCheckedData().length; i++) {
							var checkedNode = $scope.treeInstance.getCheckedData()[i];
							names.push(checkedNode.name);
							ids.push(checkedNode.id);
						}
					}

					$scope.treeNames = names.join('、');

					var treeIds = ids.join(',');
					ngModelCtr.$setViewValue(treeIds);
					return treeIds;
				}
			}

			//下拉切换
			$scope.selectToggle = function() {
				$scope.options.selectBoxCss = {};

				if($scope.boxWidth) {
					$scope.options.selectBoxCss.width = $scope.boxWidth;
				}else{
					$scope.options.selectBoxCss.width = 300;
				}

				if($scope.boxHeight) {
					$scope.options.selectBoxCss.height = $scope.boxHeight;
				}else{
					$scope.options.selectBoxCss.height = 300;
				}

				//如果ngModel存在数据时
				if(ngModelCtr.$viewValue && ngModelCtr.$viewValue.length > 0) {
					var ids = ngModelCtr.$viewValue.split(",");
					$scope.treeInstance.setCheckedNodeByIds(ids);
				} else {
					$scope.treeInstance.checkedAllByState(false);
				}
			}

			//确定
			$scope.ok = function() {
				var treeIds = innerMethod.setSelectVal();
				//确认回调
				$scope.options.onOk(treeIds);
				//关闭下拉
				innerMethod.closeSelect();
			}

			//关闭
			$scope.close = function() {
				//关闭回调
				$scope.options.onClose();
				//关闭下拉
				innerMethod.closeSelect();
			}

			//下拉框
			$scope.selectBox = function($event) {
				//阻止事件冒泡
				$event.stopPropagation();
			}

            //实例方法
			$scope.instance = {
				setVal: function(ids) {
					if(ids && ids.length > 0) {
						var initIds = ids.split(",");
						$scope.treeInstance.setCheckedNodeByIds(initIds);

						innerMethod.setSelectVal();
					}
				}
			}

			innerMethod.initSelectTreee();
		}
	}
}]);