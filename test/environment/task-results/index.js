var assert = require('chai').assert;

var TaskResult = require('environment/task-results/task-result');
var TaskResults = require('environment/task-results');

describe('TaskResults', ()=> {
    it('constructor', ()=> {
        var env = {};

        var results = new TaskResults(env);

        assert.equal(results.environment, env, 'results.env');
        assert.deepEqual(results._items, [], 'results._items');
        assert.isNull(results.last, 't-args', 'results.last');
    });

    it('push', ()=> {
        var env = {};
        var args = {};
        var result = {};
        var results = new TaskResults(env);

        var tResult = results.push('tn', 'tr', args, result);

        var taskResult = new TaskResult('tn', 'tr', env, args, result);
        assert.deepEqual(tResult, taskResult, 'result');
        assert.deepEqual(results.tr, taskResult, 'result.taskName');
        assert.deepEqual(results._items, [ taskResult ], 'results._items');
        assert.equal(results.last, results._items[0], 'results.last');
    });
});