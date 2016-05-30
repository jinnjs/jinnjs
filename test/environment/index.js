var assert = require('chai').assert;
var sinon = require('sinon');

var Jinn = require('jinn');
var Environment = require('environment');
var TaskResult = require('environment/task-results/task-result');
var TaskResults = require('environment/task-results');

describe('Environment', ()=> {
    it('constructor', ()=> {
        var jinn = new Jinn();
        var env = new Environment(jinn);

        env.jinn = null;
        env.process = null;
        env.results = null;

        assert.equal(env.jinn, jinn, 'environment.jinn');
        assert.equal(env.process, process, 'environment.process');
        assert.ok(env.results instanceof TaskResults, 'environment.results');
        assert.equal(env.results.environment, env, 'environment.results');
    });

    it('execute', (done)=> {
        var jinn = new Jinn();
        var env = new Environment(jinn);
        var args = {};
        var tResult = {};
        var task = sinon.stub().returns(tResult);
        sinon.stub(jinn.tasks, 'get').returns(task);

        env.execute('t-task', 'r-name', args).then((result)=> {            
            assert.deepEqual(result, new TaskResult('t-task', 'r-name', env, args, tResult), 'result');
            
            done();
        }).catch((e)=> {
            done(e);
        });
    });
});