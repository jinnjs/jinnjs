var assert = require('chai').assert;

var injections = require('injections');

module.exports = function(it) {
    it('addOne', function() {
        var injection = function() {};
        var obj = injections({});

        obj.addOne('test-injection', injection);

        assert.deepEqual(obj._injections, { 'test-injection' : injection }, 'obj._injections');
        assert.throw(function () { obj.add('test-injection', injection); }, 'Injection with name "test-injection" already exists');
        assert.throw(function () { obj.add(null, injection); }, 'Name is not string');
        assert.throw(function () { obj.add(undefined, injection); }, 'Name is not string');
        assert.throw(function () { obj.add('', injection); }, 'Name is not defined');
        assert.throw(function () { obj.add('myInjection', ''); }, 'Injection is not function');
    });
};