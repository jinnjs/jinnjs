var assert = require('chai').assert;

var TaskResult = require('environment/task-results/task-result');

describe('TaskResult', ()=> {
    it('constructor', ()=> {
        var result = new TaskResult('t-name', 't-env', 't-args', 't-result');

        result.name = null;
        result.env = null;
        result.args = null;
        result.result = null;

        assert.equal(result.name, 't-name', 'environment.name');
        assert.equal(result.env, 't-env', 'environment.env');
        assert.equal(result.args, 't-args', 'environment.args');
        assert.equal(result.result, 't-result', 'environment.result');
    });
});