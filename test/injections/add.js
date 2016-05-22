var assert = require('chai').assert;
var sinon = require('sinon');

var injections = require('injections');

module.exports = function(it) {
    it('add invalid call', function() {
        var obj = injections({});

        assert.throw(function () { obj.add('asdas'); }, 'Invalid call Injections.add');
    });

    it('add arguments={ 0 : function }', function() {
        var injection = function() {};
        injection.injectionName = 'i2-name';
        var obj = injections({});
        sinon.stub(obj, 'addOne').returns(obj);
        sinon.stub(obj, 'addAll').returns(obj);

        var result = obj.add(injection);

        assert.ok(obj.addOne.calledOnce, 'addOne was called');
        assert.ok(obj.addOne.calledWith('i2-name', injection), 'addOne was called with valid arguments');
        assert.ok(obj.addAll.notCalled, 'addAll was not called');
        assert.equal(result, obj, 'Valid result');
    });

    it('add arguments={ 0 : object }', function() {
        var injectionsObj = {};
        var obj = injections({});
        sinon.stub(obj, 'addOne').returns(obj);
        sinon.stub(obj, 'addAll').returns(obj);

        var result = obj.add(injectionsObj);

        assert.ok(obj.addOne.notCalled, 'addOne was not called');
        assert.ok(obj.addAll.calledOnce, 'addAll was called');
        assert.ok(obj.addAll.calledWith(injectionsObj), 'addAll was called with valid arguments');
        assert.equal(result, obj, 'Valid result');
    });

    it('add arguments={ 0 : string, 1 : function }', function() {
        var injection = function() {};
        var obj = injections({});
        sinon.stub(obj, 'addOne').returns(obj);
        sinon.stub(obj, 'addAll').returns(obj);

        var result = obj.add('injection-name', injection);

        assert.ok(obj.addOne.calledOnce, 'addOne was called');
        assert.ok(obj.addAll.notCalled, 'addAll was not called');
        assert.ok(obj.addOne.calledWith('injection-name', injection), 'addOne was called with valid arguments');
        assert.equal(result, obj, 'Valid result');
    });
};