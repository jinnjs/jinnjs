var assert = require('chai').assert;
var sinon = require('sinon');

var injections = require('injections');

var files = [ 'add', 'addAll', 'addOne', 'prefix', 'get', 'require' ];

var methods = {};
var tests = [];

files.forEach(function(key) {
    methods[key] = require('injections/' + key);
    tests.push(require('./' + key));
});

describe('Injections', function () {
    it('Module', function() {
        var obj = {};

        Object.keys(methods).forEach(function(key) { sinon.stub(methods[key], 'bind').returns(key); });

        try {
            var result = injections(obj);

            Object.keys(methods).forEach(function(key) { methods[key].bind.calledWith(obj); });
            assert.equal(obj.add, 'add', 'add function');
            assert.equal(obj.addAll, 'addAll', 'addAll function');
            assert.equal(obj.addOne, 'addOne', 'addOne function');
            assert.equal(obj.prefix, 'prefix', 'prefix function');
            assert.equal(result, obj, 'result');
        } finally {
            Object.keys(methods).forEach(function(key) { methods[key].bind.restore(); });
        }
    });

    tests.forEach(function(test) { test(it); });
});