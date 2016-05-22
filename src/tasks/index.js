var injections = require('../injections');

/**
 * Use module 
 * @see module:Injections
 * to add tasks
 * @module Tasks
 */
module.exports = Tasks;

/**
 * Tasks.
 * @param {JinnJS} jinn - JinnJS
 * @constructor
 */
function Tasks(jinn) {
    this._jinn = jinn;

    injections(this);
}

/**
 * Execute task
 * @param {string} prefix - prefix of task name
 * @param {function} prefix-add - prefix-add function
 */
Tasks.prototype.execute = function(name, env) {
    var task = this.get(name);
    return Promise.resolve().then(function() { return task(env); });
};