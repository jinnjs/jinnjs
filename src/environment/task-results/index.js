'use strict';

var TaskResult = require('./task-result');

/** Class representing a TaskResults. */
class TaskResults {
    /**
     * TaskResults.
     * @param {Environment} environment - environment
     * @constructor TaskResults
     */
    constructor(environment) {
        this.environment = environment;

        this._items = [];
        this.last = null;
    }

    /**
     * Add task result
     * @func push
     * @alias TaskResults/push
     * @param {string} taskName - task name
     * @param {string} taskResultName - task result name
     * @param {Object} args - arguments
     * @param {Object} result - result
     * @returns {Object} taskResult - task result
     */
    push(taskName, taskResultName, args, taskResult) {
        var result = new TaskResult(taskName, taskResultName, this.environment, args, taskResult);
        this._items.push(result);

        if (taskResultName) { this[taskResultName] = result; }
        this.last = result;

        return result;
    }
}

module.exports = TaskResults;