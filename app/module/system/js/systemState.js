var myApp = angular.module('cjhme');

/**
 * 路由
 */
myApp.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('systemLog', {
				url: '/systemLog',
				views: {
					'main': {
						templateUrl: 'module/system/systemLog.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/system/js/system.js',
							'module/system/js/systemService.js'
						]);
					}]
				}
			})
			

	}

]);