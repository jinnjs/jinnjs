var assert = require('chai').assert;

var TaskResult = require('environment/task-results/task-result');

describe('TaskResult', ()=> {
    it('constructor', ()=> {
        var result = new TaskResult('t-name', 'r-name', 't-env', 't-args', 't-result');

        result.name = null;
        result.resultName = null;
        result.environment = null;
        result.args = null;
        result.result = null;

        assert.equal(result.name, 't-name', 'environment.name');
        assert.equal(result.resultName, 'r-name', 'environment.resultName');
        assert.equal(result.environment, 't-env', 'environment.env');
        assert.equal(result.args, 't-args', 'environment.args');
        assert.equal(result.result, 't-result', 'environment.result');
    });
});