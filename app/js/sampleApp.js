/**********************************************
 * sampleApp.js
 *
 * Copyright (c) 2013-2014 Ansible, Inc.
 *
 */

'use strict';

angular.module('sampleApp', ['ngRoute', 'ngSanitize', 'AngularScheduler'])
        
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html',
            controller: 'sampleController'
        })
        .otherwise({
            redirectTo: '/'
        });
    }])

    .controller('sampleController', ['$scope', '$filter', 'SchedulerInit', function($scope, $filter, SchedulerInit) {
    
        var scheduler = SchedulerInit({ scope: $scope }),
            expected = new Date(1970, 1, 1),
            actual = $filter('tzAlign')(expected, {});

        console.log(actual);

        scheduler.inject('form-container', true);
        
        $scope.resetForm = function() { scheduler.clear(); };

        $scope.saveForm = function() {
            if (scheduler.isValid()) {
                var schedule = scheduler.getValue(),
                    html =
                    "<form>\n" +
                    "<div class=\"form-group\">\n" +
                    "<label>RRule</label>\n" +
                    "<textarea readonly class=\"form-control\" rows=\"8\">" + schedule.rrule + "</textarea>\n" +
                    "</div>\n" +
                    "</form>\n",
                    wheight = $(window).height(),
                    wwidth = $(window).width(),
                    w, h;
                
                w = (600 > wwidth) ? wwidth : 600;
                h = (400 > wheight) ? wheight : 400;

                $('#message').html(html)
                    .dialog({
                        title: schedule.name,
                        modal: true,
                        width: w,
                        height: h,
                        position: 'center',
                        buttons: { OK: function() { $(this).dialog('close');} },
                        open: function () {
                            // fix the close button
                            $('.ui-dialog[aria-describedby="message"]').find('.ui-dialog-titlebar button')
                                .empty().attr({ 'class': 'close' }).text('x');
                            // fix the OK button
                            $('.ui-dialog[aria-describedby="message"]').find('.ui-dialog-buttonset button:first')
                                .attr({ 'class': 'btn btn-primary' });
                        }
                    });
            }
        };

    }]);