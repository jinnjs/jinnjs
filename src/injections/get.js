module.exports = getInjection; 

function getInjection(name) {
    if ((typeof name) !== 'string') { throw new Error('Name is not string'); }
    if (name === '') { throw new Error('Name is not defined'); }

    var injection = this._injections[name];
    if (injection == null) {
        if (this.getInternal) { return this.getInternal(name); }
        throw new Error('Injection "' + name + '" not found');
    }
    if ((typeof injection) !== 'function') { throw new Error('Injection "' + name + '" is not function'); }

    return injection;
}