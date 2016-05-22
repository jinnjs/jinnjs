var Tasks = require('./tasks');
var Services = require('./services');

/**
 * JinnJS
 * @module JinnJS
 */
module.exports = JinnJS;

/**
 * JinnJS.
 * @constructor
 */
function JinnJS() {
    this.tasks = new Tasks(this);
    this.services = new Services(this);
}