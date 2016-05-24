'use strict';

var TaskResult = require('./task-result');

class TaskResults {
    constructor(env) {
        this.env = env;

        this._items = [];
        this.last = null;
    }

    push(name, args, result) {
        var taskResult = new TaskResult(name, this.env, args, result);
        this._items.push(taskResult);

        this.last = taskResult;
    }
}

module.exports = TaskResults;