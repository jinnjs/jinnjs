var assert = require('chai').assert;
var sinon = require('sinon');

var injections = require('injections');

module.exports = function(it) {
    it('prefix', function() {
        var injection = function() {};
        var obj = injections({});
        sinon.stub(obj, 'add');

        assert.throw(function () { obj.prefix({}, injection); }, 'Prefix is not string');
        assert.throw(function () { obj.prefix('', injection); }, 'Prefix is not defined');
        assert.throw(function () { obj.prefix('module', {}); }, 'Prefix-add is not function');

        var result = obj.prefix('prf:', function() { obj.add('tn', injection); });
        obj.prefix('cmp:', function() { obj.prefix('mdl:', function() { obj.add('ts', injection); }); });

        assert.ok(obj.add.calledTwice, 'add was called');
        assert.ok(obj.add.calledWith('prf:tn', injection), 'add was called with valid arguments');
        assert.ok(obj.add.calledWith('cmp:mdl:ts', injection), 'add was called with valid arguments');
        assert.equal(result, obj, 'Valid result');
    });
};