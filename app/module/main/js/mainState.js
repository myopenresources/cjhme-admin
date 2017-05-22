var cjhme = angular.module('cjhme');

/**
 * 路由
 */
cjhme.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/main'),
		$stateProvider
			.state('main', {
				url: '/main',
				views: {
					'main': {
						templateUrl: 'module/main/main.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/main/js/main.js',
							'module/main/js/mainService.js'
						]);
					}]
				}
			})

	}

]);