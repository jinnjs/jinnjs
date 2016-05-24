'use strict';

var Tasks = require('./tasks');
var Services = require('./services');

/**
 * JinnJS
 * @module JinnJS
 */
class JinnJS {
    /**
     * JinnJS.
     * @constructor
     */
    constructor() {
        this.tasks = new Tasks(this);
        this.services = new Services(this);
    }
}

module.exports = JinnJS;