var cjhme = angular.module('cjhme');

/**
 * 路由
 */
cjhme.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('roleList', {
				url: '/roleList',
				views: {
					'main': {
						templateUrl: 'module/role/roleList.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/role/js/role.js',
							'module/role/js/roleService.js'
						]);
					}]
				}
			})
			.state('roleAdd', {
				url: '/roleAdd',
				params: {
					'type': 'add'
				},
				views: {
					'main': {
						templateUrl: 'module/role/roleAdd.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/role/js/role.js',
							'module/role/js/roleService.js'
						]);
					}]
				}
			})
			.state('roleView', {
				url: '/roleView',
				views: {
					'main': {
						templateUrl: 'module/role/roleView.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/role/js/role.js',
							'module/role/js/roleService.js'
						]);
					}]
				}
			})
			.state('roleEdit', {
				url: '/roleEdit',
				params: {
					'type': 'edit'
				},
				views: {
					'main': {
						templateUrl: 'module/role/roleAdd.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/role/js/role.js',
							'module/role/js/roleService.js'
						]);
					}]
				}
			})

	}

]);