var Tasks = require('./tasks');

module.exports = JinnJS;

/**
 * JinnJS.
 * @constructor
 */
function JinnJS() {
    this.tasks = new Tasks();
}