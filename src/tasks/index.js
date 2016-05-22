var injections = require('../injections');

/**
 * Tasks module.
 * See module Injections to add/get tasks
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
 * @param {string} name - task name
 * @param {object} env - environment
 */
Tasks.prototype.execute = function(name, env) {
    var task = this.get(name);
    return Promise.resolve().then(function applyServices() {
        if (!task.services) { return; }
        return this._jinn.services.applyServices(task.services, env);
    }.bind(this)).then(function runTask() {
        return task(env);
    }.bind(this));
};