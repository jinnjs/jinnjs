var injections = require('../injections');

/**
 * Tasks module.
 * See module Injections to add/get services
 * @module Services
 */
module.exports = Services;

/**
 * Services.
 * @param {JinnJS} jinn - JinnJS
 * @constructor
 */
function Services(jinn) {
    this._jinn = jinn;

    injections(this);
}

/**
 * Apply service
 * @param {string} requires - requires
 * @param {object} env - environment
 */
Services.prototype.applyServices = function(requires, env) {
    requires = this.require(requires || '', 'services');
    if (!requires || !requires.length) { return; }

    return this.__applyAllServices(requires, env);
};

Services.prototype.getInternal = function(name) {
    return function(env) {
        try {
            env[name] = require(name);
        } catch(e) {
            throw new Error('Injection "' + name + '" not found');
        }
    };
};

Services.prototype.__applyAllServices = function(services, env) {
    env._services = env._services || {};

    if (services.length === 0) { return; }
    var serviceName = services.shift();
    var service = this.get(serviceName);
    return Promise.resolve().then(function() {
        if (env._services[serviceName]) { return; }
        return service(env);
    }.bind(this)).then(function() {
        env._services[serviceName] = true;
        return this.__applyAllServices(services, env);
    }.bind(this));
};