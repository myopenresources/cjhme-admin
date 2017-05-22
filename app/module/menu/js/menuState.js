var myApp = angular.module('cjhme');

/**
 * 路由
 */
myApp.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('menuList', {
				url: '/menuList',
				views: {
					'main': {
						templateUrl: 'module/menu/menuList.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/menu/js/menu.js',
							'module/menu/js/menuService.js'
						]);
					}]
				}
			})
			.state('menuAdd', {
				url: '/menuAdd',
				params: {
					'type': 'add'
				},
				views: {
					'main': {
						templateUrl: 'module/menu/menuAdd.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/menu/js/menu.js',
							'module/menu/js/menuService.js'
						]);
					}]
				}
			})
			

	}

]);