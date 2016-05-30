'use strict';

var Tasks = require('./tasks');
var Services = require('./services');
var Environment = require('./environment');

/**
 * Jinn
 * @module Jinn
 */
/** Class representing a Jinn. */
class Jinn {
    /**
     * Jinn.
     * @constructor Jinn
     */
    constructor() {
        this.tasks = new Tasks(this);
        this.services = new Services(this);
        this.environment = new Environment(this);
    }

    /**
     * Execute task
     * @func execute
     * @param {string} description -  task description
     * @return {Promise} promise - promise
     */
    execute() {

    }

    /**
     * Execute task
     * @func parse
     * @param {string} description -  task description
     * @return {Object} - return description { task : String, args : Object, postprocessors : Object }
     */
    parse(description) {
        var result = { args : {}, postprocessors : {} };
        var state = { type : 'task' };
        description.split(SEPARATOR).forEach((key)=> {
            switch(state.type) {
                case 'task':
                    result.task = key;
                    state.type = 'none';
                    return;

                case 'none':
                    if (key.substr(0, 2) === '--') {
                        state.type = 'postprocessors';
                        state.key = key.substr(2);
                        return;
                    }
                    if (key.substr(0, 1) === '-') {
                        state.type = 'args';
                        state.key = key.substr(1);
                        return;
                    }
                    break;

                case 'args':
                case 'postprocessors':
                    result[state.type][state.key] = key;
                    state.type = 'none';
                    return;
            }
        });
        return result;
    }
}

const SEPARATOR = ' ';

module.exports = Jinn;