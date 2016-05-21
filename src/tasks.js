module.exports = Tasks;

/**
 * Tasks.
 * @param {JinnJS} jinn - JinnJS
 * @constructor
 */
function Tasks(jinn) {
    this._jinn = jinn;
    
    this._tasks = {};
}

/**
 * Tasks registration
 * @param {(string|function|object)} name - name of task or taskFn (with taskName) or object like { taskName : taskFn }
 * @param {function} taskFn - taskFn
 * @example
 * function taskFn() {}
 * Jinn.tasks.registration('myTask', taskFn);
 * @example
 * function taskFn() {}
 * taskFn.taskName = 'myTask';
 * Jinn.tasks.registration(taskFn);
 * @example
 * var obj = { myTask : function taskFn() {} };
 * Jinn.tasks.registration(obj);
 * @returns {Tasks}
 */
Tasks.prototype.registration = function() {
    if (arguments.length === 1 && arguments[0] instanceof Function) {
        this.registrationTask(arguments[0].taskName, arguments[0]);
        return this;
    }
    if (arguments.length === 1 && arguments[0] instanceof Object) {
        this.registrationTasks(arguments[0]);
        return this;
    }
    if (arguments.length === 2) {
        this.registrationTask(arguments[0], arguments[1]);
        return this;
    }
    throw new Error('Invalid call JinnJS.tasks.registration');
};

/**
 * Task registration
 * @param {string} name - name
 * @param {function} task - task
 * @returns {Tasks}
 */
Tasks.prototype.registrationTask = function(name, task) {
    if ((typeof name) !== 'string') { throw new Error('Name is not string'); }
    if (name === '') { throw new Error('Name is not defined'); }
    if ((typeof task) !== 'function') { throw new Error('Task is not function'); }
    if (this._tasks[name]) { throw new Error('Task with name "' + name + '" already exists'); }
    
    this._tasks[name] = task;
    return this;
};

/**
 * Tasks registration
 * @param {object} obj - object like { name : taskFn, ... }
 * @returns {Tasks}
 */
Tasks.prototype.registrationTasks = function(obj) {
    Object.keys(obj || (obj = {})).forEach(function(key) { this.registrationTask(key, obj[key]); }.bind(this));
};

/**
 * Set tasks prefix
 * @param {string} prefix - prefix of task name
 * @param {function} prefix-add - prefix-add function
 * @example
 * tasks.prefix('component:', function() {
 *   tasks.registrationTask('task1', task);
 *   tasks.registrationTask('task2', task);
 * });
 * // these 2 pieces of code are equal
 * tasks.registrationTask('component:task1', task);
 * tasks.registrationTask('component:task2', task);
 * @returns {Tasks}
 */
Tasks.prototype.prefix = function(prefix, prefixAdd) {
    if ((typeof prefix) !== 'string') { throw new Error('Prefix is not string'); }
    if (prefix === '') { throw new Error('Prefix is not defined'); }
    if ((typeof prefixAdd) !== 'function') { throw new Error('Prefix-add is not function'); }

    var registrationTask = this.registrationTask;
    this.registrationTask = function(name, task) { registrationTask.call(this, prefix + name, task); }.bind(this);
    try {
        prefixAdd();
    } finally {
        this.registrationTask = registrationTask;
    }
    return this;
};

/**
 * Set tasks prefix
 * @param {string} prefix - prefix of task name
 * @param {function} prefix-add - prefix-add function
 */
Tasks.prototype.execute = function(name, env) {
    if ((typeof name) !== 'string') { throw new Error('Name is not string'); }
    if (name === '') { throw new Error('Name is not defined'); }

    var task = this._tasks[name];
    if (task == null) { throw new Error('Task "' + name + '" is not found'); }
    if ((typeof task) !== 'function') { throw new Error('Task "'+ name +'" is not function'); }

    task(env);
};