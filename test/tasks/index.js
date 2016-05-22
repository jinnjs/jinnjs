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
        var jinn = { services : { applyServices : sinon.spy() } };
        var env = {};
        var args = {};
        var tasks = new Tasks(jinn);
        var injection = sinon.stub().returns('task result');
        injection.services = 's1,s2';
        tasks.add('injection', injection);

        tasks.execute('injection', env, args).then(function(result) {
            assert.equal(result, 'task result', 'Valid result');
            assert.ok(injection.calledOnce, 'injection was called');
            assert.ok(injection.calledWith(env, args), 'injection was called with valid arguments');
            assert.ok(jinn.services.applyServices.calledOnce, 'jinn.services.applyServices was called');
            assert.ok(jinn.services.applyServices.calledWith('s1,s2'), 'jinn.services.applyServices was called with valid arguments');

            done();
        }).catch(function(e) {
            done(e);
        });
    });
});