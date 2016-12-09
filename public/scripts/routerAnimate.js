(function() {
    'use strict';

    var module = angular.module('routerAnimate', ['ngAnimate']);

    module.animation('.router-animate', ['$rootScope', '$timeout', '$window',
        function($rootScope, $timeout, $window) {
            return {
                enter: function(element, done) {
                    var speed = angular.element(element).attr('data-anim-speed') !== undefined ? $rootScope.$eval(angular.element(element).attr('data-anim-speed')) : 1000,
                        inSpeed = angular.element(element).attr('data-anim-in-speed') !== undefined ? $rootScope.$eval(angular.element(element).attr('data-anim-in-speed')) : speed,
                        outSpeed = angular.element(element).attr('data-anim-out-speed') !== undefined ? $rootScope.$eval(angular.element(element).attr('data-anim-out-speed')) : speed;

                    $(element).css('transition-duration', inSpeed + 'ms');
                    console.log(inSpeed)
                    try {
                        var observer = new MutationObserver(function(mutations) {
                            observer.disconnect();

                            $window.requestAnimationFrame(function() {
                                $timeout(done, 0);
                            });
                        });

                        observer.observe(element[0], {
                            attributes: true,
                            childList: false,
                            characterData: false
                        });
                    } catch (e) {
                        $timeout(done,  Math.max(100,0));
                    }

                    angular.element(element).addClass($rootScope.animationDirection + '-anim-in-setup');

                    return function(cancelled) {
                        angular.element(element).removeClass($rootScope.animationDirection +'-anim-in-setup');
                        angular.element(element).addClass($rootScope.animationDirection +'-anim-in');

                        if (!cancelled) {
                            $timeout(function() {
                                $rootScope.$broadcast('animEnd', element, inSpeed);

                                angular.element(element).removeClass($rootScope.animationDirection + '-anim-in');
                            }, inSpeed);
                        }
                    };
                },
                leave: function(element, done) {
                    var speed = angular.element(element).attr('data-anim-speed') !== undefined ? $rootScope.$eval(angular.element(element).attr('data-anim-speed')) : 1000,
                        outSpeed = angular.element(element).attr('data-anim-out-speed') !== undefined ? $rootScope.$eval(angular.element(element).attr('data-anim-out-speed')) : speed;

                    $rootScope.$broadcast('animStart', element, outSpeed);

                    $(element).css('transition-duration', outSpeed + 'ms')

                    try {
                        var observer = new MutationObserver(function(mutations) {
                            observer.disconnect();

                            $window.requestAnimationFrame(function() {
                                angular.element(element).removeClass($rootScope.animationDirection + '-anim-out-setup');
                                angular.element(element).addClass($rootScope.animationDirection + '-anim-out');

                                $timeout(done, outSpeed);
                            });
                        });

                        observer.observe(element[0], {
                            attributes: true,
                            childList: false,
                            characterData: false
                        });

                    } catch (e) {
                        angular.element(element).removeClass($rootScope.animationDirection + '-anim-out-setup');
                        angular.element(element).addClass($rootScope.animationDirection + '-anim-out');

                        $timeout(done, Math.max(100, outSpeed));
                    }

                    angular.element(element).addClass($rootScope.animationDirection + '-anim-out-setup');
                }
            };
        }
    ]);

})();
