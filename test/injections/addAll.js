var assert = require('chai').assert;
var sinon = require('sinon');

var injections = require('injections');

module.exports = function(it) {
    it('addAll', function() {
        var injection = {
            t1 : function() {},
            t2 : function() {},
            model : {
                method : function () { }
            }
        };
        var obj = injections({});
        sinon.stub(obj, 'add');

        obj.addAll(injection);

        assert.ok(obj.add.calledThrice, 'add was called');
        assert.ok(obj.add.calledWith('t1', injection.t1), 'add was called with valid arguments');
        assert.ok(obj.add.calledWith('t2', injection.t2), 'add was called with valid arguments');
        assert.ok(obj.add.calledWith('model:method', injection.model.method), 'add was called with valid arguments');
    });
};