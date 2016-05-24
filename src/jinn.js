'use strict';

var Tasks = require('./tasks');
var Services = require('./services');

/**
 * Jinn
 * @module Jinn
 */
class Jinn {
    /**
     * Jinn.
     * @constructor Jinn
     */
    constructor() {
        this.tasks = new Tasks(this);
        this.services = new Services(this);
    }
}

module.exports = Jinn;