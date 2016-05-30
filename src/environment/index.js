'use strict';

var TaskResults = require('./task-results');

/** Class representing a Environment. */
class Environment {
    /**
     * Tasks.
     * @param {Jinn} jinn - Jinn
     * @constructor Environment
     */
    constructor(jinn) {
        Object.defineProperties(this, {
            jinn: { value: jinn, enumerable : true },
            process: { value: process, enumerable : true },
            results: {  value: new TaskResults(this), enumerable : true  }
        });
    }

    /**
     * Execute task
     * @func push
     * @alias Environment/execute
     * @param {string} name - task name
     * @param {string} resultName - result name
     * @param {Object} args - arguments
     * @returns {Promise} promise - promise (resolve - taskResult)
     */
    execute(name, resultName, args) {
        return this.jinn.tasks.execute(name, this, args).then((result)=>{ return this.results.push(name, resultName, args, result); });
    }
}

module.exports = Environment;