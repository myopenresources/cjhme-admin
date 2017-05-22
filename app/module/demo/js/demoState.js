var myApp = angular.module('cjhme');

/**
 * 路由
 */
myApp.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('pagination', {
				url: '/pagination',
				views: {
					'main': {
						templateUrl: 'module/demo/pagination.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/demo/js/demo.js',
							'module/demo/js/demoService.js'
						]);
					}]
				}
			})
			.state('dataTable', {
				url: '/dataTable',
				views: {
					'main': {
						templateUrl: 'module/demo/dataTable.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/demo/js/demo.js',
							'module/demo/js/demoService.js'
						]);
					}]
				}
			})
			.state('dataPager', {
				url: '/dataPager',
				views: {
					'main': {
						templateUrl: 'module/demo/dataPager.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/demo/js/demo.js',
							'module/demo/js/demoService.js'
						]);
					}]
				}
			})
			.state('modal', {
				url: '/modal',
				views: {
					'main': {
						templateUrl: 'module/demo/modal.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/demo/js/demo.js',
							'module/demo/js/demoService.js'
						]);
					}]
				}
			})
			.state('bootstrapCss', {
				url: '/bootstrapCss',
				views: {
					'main': {
						templateUrl: 'module/demo/bootstrapCss.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/demo/js/demo.js',
							'module/demo/js/demoService.js'
						]);
					}]
				}
			})
			.state('list', {
				url: '/list',
				views: {
					'main': {
						templateUrl: 'module/demo/list.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/demo/js/demo.js',
							'module/demo/js/demoService.js'
						]);
					}]
				}
			})
			.state('datepicker', {
				url: '/datepicker',
				views: {
					'main': {
						templateUrl: 'module/demo/datepicker.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/demo/js/demo.js',
							'module/demo/js/demoService.js'
						]);
					}]
				}
			})
			.state('switch', {
				url: '/switch',
				views: {
					'main': {
						templateUrl: 'module/demo/switch.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/demo/js/demo.js',
							'module/demo/js/demoService.js'
						]);
					}]
				}
			})
			.state('chart', {
				url: '/chart',
				views: {
					'main': {
						templateUrl: 'module/demo/chart.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/demo/js/demo.js',
							'module/demo/js/demoService.js'
						]);
					}]
				}
			})
			.state('calendar', {
				url: '/calendar',
				views: {
					'main': {
						templateUrl: 'module/demo/calendar.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/demo/js/demo.js',
							'module/demo/js/demoService.js'
						]);
					}]
				}
			})
			.state('tree', {
				url: '/tree',
				views: {
					'main': {
						templateUrl: 'module/demo/tree.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/demo/js/demo.js',
							'module/demo/js/demoService.js'
						]);
					}]
				}
			})
			.state('fileUpload', {
				url: '/fileUpload',
				views: {
					'main': {
						templateUrl: 'module/demo/fileUpload.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/demo/js/demo.js',
							'module/demo/js/demoService.js'
						]);
					}]
				}
			})
			.state('customCss', {
				url: '/customCss',
				views: {
					'main': {
						templateUrl: 'module/demo/customCss.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/demo/js/demo.js',
							'module/demo/js/demoService.js'
						]);
					}]
				}
			})
			.state('editor', {
				url: '/editor',
				views: {
					'main': {
						templateUrl: 'module/demo/editor.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/demo/js/demo.js',
							'module/demo/js/demoService.js'
						]);
					}]
				}
			})
			.state('select', {
				url: '/select',
				views: {
					'main': {
						templateUrl: 'module/demo/select.html'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load([
							'module/demo/js/demo.js',
							'module/demo/js/demoService.js'
						]);
					}]
				}
			})
	}

]);