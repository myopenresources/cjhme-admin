var cjhme = angular.module('cjhme');

/**
 * 路由
 */
cjhme.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('userList', {
				url: '/userList',
				views: {
					'main': {
						templateUrl: 'module/user/userList.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/user/js/user.js',
							'module/user/js/userService.js'
						]);
					}]
				}
			})
			.state('userAdd', {
				url: '/userAdd',
				params: {
					'type': 'add'
				},
				views: {
					'main': {
						templateUrl: 'module/user/userAdd.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/user/js/user.js',
							'module/user/js/userService.js'
						]);
					}]
				}
			})
			.state('userView', {
				url: '/userView',
				views: {
					'main': {
						templateUrl: 'module/user/userView.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/user/js/user.js',
							'module/user/js/userService.js'
						]);
					}]
				}
			})
			.state('userEdit', {
				url: '/userEdit',
				params: {
					'type': 'edit'
				},
				views: {
					'main': {
						templateUrl: 'module/user/userAdd.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/user/js/user.js',
							'module/user/js/userService.js'
						]);
					}]
				}
			})
			.state('userInfoView', {
				url: '/userInfoView',
				views: {
					'main': {
						templateUrl: 'module/user/userInfoView.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/user/js/user.js',
							'module/user/js/userService.js'
						]);
					}]
				}
			})
			.state('userPwdEdit', {
				url: '/userPwdEdit',
				views: {
					'main': {
						templateUrl: 'module/user/userPwdEdit.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/user/js/user.js',
							'module/user/js/userService.js'
						]);
					}]
				}
			})

	}

]);