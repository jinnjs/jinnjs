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
     * @param {JinnJS} jinn - JinnJS
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
     */
    execute(name, env, args) {
        var task = this.get(name);

        var applyServices = ()=> {
            if (!task.services) { return; }
            return this._jinn.services.applyServices(task.services, env);
        };

        var runTask = ()=> {
            return task(env, args);
        };

        return Promise.resolve()
            .then(applyServices.bind(this))
            .then(runTask.bind(this));
    }
}

module.exports = Tasks;