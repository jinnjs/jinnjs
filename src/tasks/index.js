'use strict';

var Injections = require('../injections');

/**
 * Tasks module.
 * @module Tasks
 * @extends Injections
 */
class Tasks extends Injections {
    /**
     * Tasks.
     * @param {Jinn} jinn - Jinn
     * @constructor Tasks
     */
    constructor(jinn) {
        super();

        this._jinn = jinn;
    }

    /**
     * Execute task
     * @func execute
     * @param {string} name - task name
     * @param {object} env - environment
     * @return {TaskResult} result - result
     */
    execute(name, env, args) {
        var task = this.get(name);

        var applyServices = ()=> {
            if (!task.services) { return; }
            return this._jinn.services.applyServices(task.services, env);
        };

        var runTask = ()=> {
            return task.call(env, args);
        };

        return Promise.resolve()
            .then(applyServices)
            .then(runTask);
    }
}

module.exports = Tasks;