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
}

module.exports = Jinn;