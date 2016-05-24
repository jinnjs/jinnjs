'use strict';

class TaskResult {
    constructor(name, env, args, result) {
        Object.defineProperties(this, {
            name: { value: name, enumerable : true },
            env: { value: env, enumerable : true },
            args: { value: args, enumerable : true },
            result: { value: result, enumerable : true }
        });
    }
}

module.exports = TaskResult;