var add = require('./add');
var addOne = require('./addOne');
var addAll = require('./addAll');
var prefix = require('./prefix');
var getInjection = require('./get');
var injectionsRequire = require('./require');

module.exports = Injections;

/**
 * Add "add", "addOne", "addAll", "prefix", "get" functions to object
 * @module Injections
 * @example
 * var Injections = require('injections');
 * Injections(obj);
 * obj.add('component:method', method);
 */
function Injections(obj) {
    obj._injections = {};

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
    obj.add = add.bind(obj);
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
    obj.addOne = addOne.bind(obj);
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
    obj.addAll = addAll.bind(obj);
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
    obj.prefix = prefix.bind(obj);

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
    obj.get = getInjection.bind(obj);

    /**
     * Require
     * @func require
     * @alias Injections/require
     * @param {string} name - injection name
     * @param {string} requireKey - injection require key
     * @returns {array} injections array
     */
    obj.require = injectionsRequire.bind(obj);

    return obj;
}