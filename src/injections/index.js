'use strict';

/**
 * Methods: "add", "addOne", "addAll", "prefix", "get", "require"
 * @module Injections
 * @example
 * var Injections = require('injections');
 * Injections(obj);
 * obj.add('component:method', method);
 */
class Injections {
    constructor() {
        this._injections = {};
    }

    /**
     * Add injection
     * @func add
     * @alias Injections/add
     * @param {(string|function|object)} name - name of injection or injectionFn (with name) or object like { name : injectionFn }
     * @param {function} injectionFn - injectionFn
     * @returns {Object} this
     * @example
     * obj.add('model:mth', model.mth);
     * @example
     * function injection() {}
     * injection.name = 'model:mth';
     * obj.add(injection);
     * @example
     * var injections = { 'model:mth' : model.mth };
     * obj.add(injections);
     */
    add() {
        // { 0 : function }
        if (arguments.length === 1 && arguments[0] instanceof Function) { return this.addOne(arguments[0].injectionName, arguments[0]); }
        // { 0 : object }
        if (arguments.length === 1 && arguments[0] instanceof Object) { return this.addAll(arguments[0]); }
        // { 0 : string, 1 : function }
        if (arguments.length === 2) { return this.addOne(arguments[0], arguments[1]); }

        throw new Error('Invalid call Injections.add');
    }

    /**
     * Add one injection
     * @func addOne
     * @alias Injections/addOne
     * @param {string} name - name
     * @param {function} injectionFn - injectionFn
     * @returns {Object} this
     * @example
     * obj.addOne('model:method1', method1);
     */
    addOne(name, injection) {
        if ((typeof name) !== 'string') { throw new Error('Name is not string'); }
        if (name === '') { throw new Error('Name is not defined'); }
        if ((typeof injection) !== 'function') { throw new Error('Injection is not function'); }
        if (this._injections[name]) { throw new Error('Injection with name "' + name + '" already exists'); }

        this._injections[name] = injection;
        return this;
    }

    /**
     * Injection all
     * @func addAll
     * @alias Injections/addAll
     * @param {object} obj - object like { name : injectionFn, model : { method : methodFn } }
     * @returns {Object} this
     * @example
     * obj.addAll({ name : injectionFn, model : { method : methodFn } });
     * // these 2 pieces of code are equal
     * obj.add('name', injectionFn);
     * obj.prefix('model:', function() { obj.add('method', methodFn); });
     */
    addAll(injections) {
        Object.keys(injections || (injections = {})).forEach((key)=> {
            if ((typeof injections[key]) === 'object') {
                return this.prefix(key + ':', ()=> { this.addAll(injections[key]); });
            }
            this.add(key, injections[key]);
        });
        return this;
    }

    /**
     * Prefix
     * @func prefix
     * @alias Injections/prefix
     * @param {string} prefix - prefix of injection name
     * @param {function} prefix-add - prefix-add function
     * @returns {Object} this
     * @example
     * obj.prefix('model:', function() {
     *   obj.addOne('method1', method1);
     *   obj.addOne('method2', method2);
     * });
     * // these 2 pieces of code are equal
     * obj.addOne('model:method1', method1);
     * obj.addOne('model:method2', method2);
     */
    prefix(prefix, prefixAdd) {
        if ((typeof prefix) !== 'string') { throw new Error('Prefix is not string'); }
        if (prefix === '') { throw new Error('Prefix is not defined'); }
        if ((typeof prefixAdd) !== 'function') { throw new Error('Prefix-add is not function'); }

        var add = this.add;
        this.add = (name, injection)=> { add.call(this, prefix + name, injection); };
        try {
            prefixAdd();
        } finally {
            this.add = add;
        }
        return this;
    }

    /**
     * Get injection
     * @func get
     * @alias Injections/get
     * @param {string} name - injection name
     * @returns {Function} injection
     * @example
     * obj.addOne('model:method1', method1);
     * var inj = obj.get('model:method1');
     */
    get(name) {
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

    /**
     * Require
     * @func require
     * @alias Injections/require
     * @param {string} name - injection name
     * @param {string} requireKey - injection require key
     * @returns {array} injections array
     */
    require(requireInjection, requireKey) {
        var dependencies = getDependencies(this, requireInjection, requireKey);
        var result = [];
        fillResult(dependencies, result);

        return result;
    }
}

const fillResult = (dependencies, result)=> {
    var applyDependency = (k)=> {
        if (!dependencies[k]) { return; }
        dependencies[k] = dependencies[k].filter((s)=> { return s !== key; });
    };
    var keys = Object.keys(dependencies);

    for (var i = 0; i < keys.length; i++) {
        if (dependencies[keys[i]] && dependencies[keys[i]].length === 0) {
            var key = keys[i];
            result.push(key);
            keys.forEach(applyDependency);
            dependencies[key] = null;
            fillResult(dependencies, result);
            return;
        }
    }
    var error = false;
    Object.keys(dependencies).forEach((key)=> { error = error || dependencies[key]; });

    if (error) { throw new Error('Dependency ring found'); }
};

const getDependencies = (obj, requireInjection, requireKey, result)=> {
    result = result || {};
    (requireInjection || '').split(SEPARATOR).filter((name)=> {
        return name != null && name !== '';
    }).forEach((name)=> {
        var injection = obj.get(name)[requireKey];
        if (result[name]) { return; }

        result[name] = (injection || '').split(SEPARATOR).filter((value)=> { return value != null && value !== ''; });
        getDependencies(obj, injection, requireKey, result);
    });
    return result;
};

const SEPARATOR = ',';

module.exports = Injections;