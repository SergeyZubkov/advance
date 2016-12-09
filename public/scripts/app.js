
(function() {

	'use strict';

	angular
		.module('App', ['ui.router', 'satellizer', 'ngTable', 'ui-notification', 'timer','ngAnimate', 'routerAnimate'])
		.run(setTitle)
		.run(handlerStateChange)
		.config(notification);

		setTitle.$inject = ['$rootScope'];
		handlerStateChange.$inject = ['$rootScope'];


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
		
		function handlerStateChange($rootScope) {
			$rootScope.$on('$stateChangeStart', function(event,  toState, toParams, fromState, forParams) {
				if(toState.step&&fromState.step) {
					var animationDirection = toState.step > fromState.step ? 'forward' : 'backward';
					
					console.log(animationDirection)
					$rootScope.animationDirection = animationDirection;
				}
			})
		}
})();