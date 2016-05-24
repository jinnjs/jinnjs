var assert = require('chai').assert;

var TaskResult = require('environment/task-results/task-result');
var TaskResults = require('environment/task-results');

describe('TaskResults', ()=> {
    it('constructor', ()=> {
        var env = {};

        var results = new TaskResults(env);

        assert.equal(results.env, env, 'results.env');
        assert.deepEqual(results._items, [], 'results._items');
        assert.isNull(results.last, 't-args', 'results.last');
    });

    it('push', ()=> {
        var env = {};
        var args = {};
        var result = {};
        var results = new TaskResults(env);

        results.push('tn', args, result);

        assert.deepEqual(results._items, [ new TaskResult('tn', env, args, result) ], 'results._items');
        assert.equal(results.last, results._items[0], 'results.last');
    });
});