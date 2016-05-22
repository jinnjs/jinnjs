module.exports = addOne;

function addOne(name, injection) {
    if ((typeof name) !== 'string') { throw new Error('Name is not string'); }
    if (name === '') { throw new Error('Name is not defined'); }
    if ((typeof injection) !== 'function') { throw new Error('Injection is not function'); }
    if (this._injections[name]) { throw new Error('Injection with name "' + name + '" already exists'); }

    this._injections[name] = injection;
    return this;
}