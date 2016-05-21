var assert = require('chai').assert;
var sinon = require('sinon');

var Tasks = require('tasks');

describe('Tasks', function () {
    it('constructor', function() {
        var jinn = {};
        var tasks = new Tasks(jinn);

        assert.equal(tasks._jinn, jinn, 'tasks._jinn');
        assert.deepEqual(tasks._tasks, {}, 'tasks._tasks');
    });

    it('registration invalid call', function() {
        var tasks = new Tasks();

        assert.throw(function () { tasks.registration('asdas'); }, 'Invalid call JinnJS.tasks.registration');        
    });

    it('registration arguments={ 0 : function }', function() {
        var task = function() {};
        task.taskName = 't2-name';
        var tasks = new Tasks();
        sinon.stub(tasks, 'registrationTask');
        sinon.stub(tasks, 'registrationTasks');

        var result = tasks.registration(task);

        assert.ok(tasks.registrationTask.calledOnce, 'registrationTask was called');
        assert.ok(tasks.registrationTasks.notCalled, 'registrationTasks was not called');
        assert.ok(tasks.registrationTask.calledWith('t2-name', task), 'registrationTask was called with valid arguments');
        assert.equal(result, tasks, 'Valid result');
    });

    it('registration arguments={ 0 : object }', function() {
        var obj = {};
        var tasks = new Tasks();
        sinon.stub(tasks, 'registrationTask');
        sinon.stub(tasks, 'registrationTasks');

        var result = tasks.registration(obj);

        assert.ok(tasks.registrationTask.notCalled, 'registrationTask was not called');
        assert.ok(tasks.registrationTasks.calledOnce, 'registrationTasks was called');
        assert.ok(tasks.registrationTasks.calledWith(obj), 'registrationTasks was called with valid arguments');
        assert.equal(result, tasks, 'Valid result');
    });

    it('registration arguments={ 0 : string, 1 : function }', function() {
        var task = function() {};
        var tasks = new Tasks();
        sinon.stub(tasks, 'registrationTask');
        sinon.stub(tasks, 'registrationTasks');

        var result = tasks.registration('task-name', task);

        assert.ok(tasks.registrationTask.calledOnce, 'registrationTask was called');
        assert.ok(tasks.registrationTasks.notCalled, 'registrationTasks was not called');
        assert.ok(tasks.registrationTask.calledWith('task-name', task), 'registrationTask was called with valid arguments');
        assert.equal(result, tasks, 'Valid result');
    });

    it('registrationTask', function() {
        var task = function() {};
        var tasks = new Tasks();

        tasks.registrationTask('test-task', task);

        assert.deepEqual(tasks._tasks, { 'test-task' : task }, 'tasks._tasks');
        assert.throw(function () { tasks.registration('test-task', task); }, 'Task with name "test-task" already exists');
        assert.throw(function () { tasks.registration(null, task); }, 'Name is not string');
        assert.throw(function () { tasks.registration(undefined, task); }, 'Name is not string');
        assert.throw(function () { tasks.registration('', task); }, 'Name is not defined');
        assert.throw(function () { tasks.registration('myTask', ''); }, 'Task is not function');
    });

    it('registrationTasks', function() {
        var obj = { t1 : function() {}, t2 : function() {} };
        var tasks = new Tasks();
        sinon.stub(tasks, 'registrationTask');

        tasks.registrationTasks(obj);

        assert.ok(tasks.registrationTask.calledTwice, 'registrationTask was called');
        assert.ok(tasks.registrationTask.calledWith('t1', obj.t1), 'registrationTask was called with valid arguments');
        assert.ok(tasks.registrationTask.calledWith('t2', obj.t2), 'registrationTask was called with valid arguments');
    });

    it('prefix', function() {
        var task = function() {};
        var tasks = new Tasks();
        sinon.stub(tasks, 'registrationTask');

        assert.throw(function () { tasks.prefix({}, task); }, 'Prefix is not string');
        assert.throw(function () { tasks.prefix('', task); }, 'Prefix is not defined');
        assert.throw(function () { tasks.prefix('comp', {}); }, 'Prefix-add is not function');

        var registrationTask = tasks.registrationTask;
        var result = tasks.prefix('prf:', function() { tasks.registrationTask('tn', task); });
        tasks.prefix('cmp:', function() { tasks.prefix('mdl:', function() { tasks.registrationTask('ts', task); }); });

        assert.ok(registrationTask.calledTwice, 'registrationTask was called');
        assert.ok(registrationTask.calledWith('prf:tn', task), 'registrationTask was called with valid arguments');
        assert.ok(registrationTask.calledWith('cmp:mdl:ts', task), 'registrationTask was called with valid arguments');
        assert.equal(result, tasks, 'Valid result');
    });

    it('execute', function() {
        var task = sinon.spy();
        var env = {};
        var tasks = new Tasks();
        tasks._tasks.inv = {};
        tasks.registration('myTask', task);

        tasks.execute('myTask', env);

        assert.ok(task.calledOnce, 'task was called');
        assert.ok(task.calledWith(env), 'task was called with valid arguments');
        
        assert.throw(function () { tasks.execute({}, env); }, 'Name is not string');
        assert.throw(function () { tasks.execute('', env); }, 'Name is not defined');
        assert.throw(function () { tasks.execute('invalid', env); }, 'Task "invalid" is not found');
        assert.throw(function () { tasks.execute('inv', env); }, 'Task "inv" is not function');
    });
});