var assert = require('chai').assert;
var sinon = require('sinon');

var Tasks = require('tasks');

describe('Tasks', function () {
    it('constructor', function() {
        var jinn = {};
        var tasks = new Tasks(jinn);

        assert.equal(tasks._jinn, jinn, 'tasks._jinn');
        assert.isDefined(tasks._injections, 'Injections');
    });

    it('execute', function(done) {
        var env = {};
        var tasks = new Tasks({});
        var injection = sinon.stub().returns('task result');
        tasks.add('injection', injection);

        tasks.execute('injection', env).then(function(result) {
            assert.equal(result, 'task result', 'Valid result');
            assert.ok(injection.calledOnce, 'injection was called');
            assert.ok(injection.calledWith(env), 'injection was called with valid arguments');

            done();
        }).catch(function(e) {
            done(e);
        });
    });
});