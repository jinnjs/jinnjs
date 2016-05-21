module.exports = JinnJS;

function JinnJS() {
    this._tasks = {};
}

JinnJS.prototype.task = function(name, task) {
    if (this._tasks[name]) { throw new Error('Task with name "' + name + '" already exists.'); }
    this._tasks[name] = task;
};

JinnJS.prototype.tasks = function(obj) {
    Object.keys(obj = obj || {}).forEach(function(key) { this.task(key, obj[key]); }.bind(this));
};