var Tasks = require('./tasks');

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
    this.tasks = new Tasks();
}