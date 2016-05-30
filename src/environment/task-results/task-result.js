'use strict';

/** Class representing a TaskResult. */
class TaskResult {
    /**
     * Tasks.
     * @param {string} name - task name
     * @param {string} resultName - result name
     * @param {Environment} environment - environment
     * @param {Object} args - arguments
     * @param {Object} result - task result
     * @constructor TaskResult
     */
    constructor(name, resultName, environment, args, result) {
        Object.defineProperties(this, {
            name: { value: name, enumerable : true },
            resultName: { value: resultName, enumerable : true },
            environment: { value: environment, enumerable : true },
            args: { value: args, enumerable : true },
            result: { value: result, enumerable : true }
        });
    }
}

module.exports = TaskResult;