
(function() {

	'use strict';

	angular
		.module('App', ['ui.router', 'satellizer', 'ngTable', 'ui-notification', 'timer','ngAnimate', 'anim-in-out'])
		.run(setTitle)
		.config(notification);

		setTitle.$inject = ['$rootScope']

		function setTitle($rootScope) {
			$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
				$rootScope.title = toState.data.title;
			})
		}

		function notification(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 2000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'center',
            positionY: 'top'
        });
    }
		
})();