var assert = require('chai').assert;
var sinon = require('sinon');

var Jinn = require('jinn');
var Environment = require('environment');
var Tasks = require('tasks');

describe('Tasks', ()=> {
    it('constructor', ()=> {
        var jinn = {};
        var tasks = new Tasks(jinn);

        assert.equal(tasks._jinn, jinn, 'tasks._jinn');
        assert.isDefined(tasks._injections, 'Injections');
    });

    it('execute', (done)=> {
        var jinn = new Jinn();
        sinon.stub(jinn.services, 'applyServices');        
        var env = new Environment(jinn);
        var args = {};
        var tasks = new Tasks(jinn);
        var injection = sinon.stub().returns('task result');
        injection.services = 's1,s2';
        tasks.add('injection', injection);

        tasks.execute('injection', env, args).then((result)=> {
            assert.equal(result, 'task result', 'Valid result');
            assert.ok(injection.calledOnce, 'injection was called');
            assert.ok(injection.calledWith(args), 'injection was called with valid arguments');
            assert.ok(injection.calledOn(env), 'injection was called with valid this');
            assert.ok(jinn.services.applyServices.calledOnce, 'jinn.services.applyServices was called');
            assert.ok(jinn.services.applyServices.calledWith('s1,s2'), 'jinn.services.applyServices was called with valid arguments');

            done();
        }).catch((e)=> {
            done(e);
        });
    });
});