module.exports = addAll;

function addAll(injections) {
    Object.keys(injections || (injections = {})).forEach(function(key) {
        if ((typeof injections[key]) === 'object') {
            return this.prefix(key + ':', function() { this.addAll(injections[key]); }.bind(this));
        }
        this.add(key, injections[key]);
    }.bind(this));
    return this;
}