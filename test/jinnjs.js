var assert = require('chai').assert;
var sinon = require('sinon');

var JinnJS = require('jinnjs');

describe('JinnJS', function () {
    it('constructor', function() {
        var jinn = new JinnJS();

        assert.deepEqual(jinn._tasks, {}, 'jinn.tasks');
    });

    it('task', function() {
        var jinn = new JinnJS();
        var task = function() {};

        jinn.task('test-task', task);

        assert.equal(jinn._tasks['test-task'], task, 'jinn.tasks');
        assert.throw(function () { jinn.task('test-task', task); }, 'Task with name "test-task" already exists.');
    });

    it('tasks', function() {
        var jinn = new JinnJS();
        var tasks = { 'test' : function() {}, 'test2' : function() {} };
        sinon.stub(jinn, 'task');

        jinn.tasks(tasks);

        assert.ok(jinn.task.calledTwice, 'jinn.task was called');
        assert.ok(jinn.task.calledWith('test', tasks.test), 'jinn.task was called with valid arguments');
        assert.ok(jinn.task.calledWith('test2', tasks.test2), 'jinn.task was called with valid arguments');
    });
});