
'use strict';

describe("Get RRule", function() {
    
    var SchedulerInit,
        $scope;

    beforeEach( function() {
        module('AngularScheduler');
    });

    beforeEach(inject( function($rootScope, $rootElement, _SchedulerInit_) {
        SchedulerInit = _SchedulerInit_;
        $scope = $rootScope.$new();
        $rootElement.append('<div id="form-container"></div>');
    }));

    afterEach(function() {
        $scope.$destroy();
    })

    it('should return an object', function() {
        var scheduler = SchedulerInit({ scope: $scope });
        expect(scheduler.inject).toBeDefined();
    });

    it('should inject a form', function() {
        var scheduler = SchedulerInit({ scope: $scope });
        scheduler.inject('form-container', true);
        expect($('form').length).toEqual(1);
    });

});