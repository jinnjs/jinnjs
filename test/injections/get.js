var assert = require('chai').assert;

var injections = require('injections');

module.exports = function(it) {
    it('get', function() {
        var injection = function() {};
        var obj = injections({});
        obj._injections.bad = {};
        obj.addOne('test-injection', injection);

        var result = obj.get('test-injection');

        assert.equal(result, injection, 'obj._injections');
        assert.throw(function () { obj.get(); }, 'Name is not string');
        assert.throw(function () { obj.get(''); }, 'Name is not defined');
        assert.throw(function () { obj.get('sdsdk-32'); }, 'Injection "sdsdk-32" not found');
        assert.throw(function () { obj.get('bad'); }, 'Injection "bad" is not function');
    });

    it('get with getInternal', function() {
        var injection = function() {};
        var obj = injections({});
        obj.getInternal = function() { return 'internal'; };
        obj._injections.bad = {};
        obj.addOne('test-injection', injection);

        var result = obj.get('test-injection22');

        assert.equal(result, 'internal', 'getInternal');
    });
};