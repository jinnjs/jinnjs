'use strict';

var Injections = require('../injections');

/**
 * Services module.
 * @module Services
 * @extends Injections
 */
class Services extends Injections {
    /**
     * Services.
     * @param {Jinn} jinn - Jinn
     * @constructor Services
     */
    constructor(jinn) {
        super();

        this._jinn = jinn;
    }

    /**
     * Apply service
     * @func applyServices
     * @param {string} requires - requires
     * @param {object} env - environment
     */
    applyServices(requires, env) {
        requires = this.require(requires || '', 'services');
        if (!requires || !requires.length) { return; }

        return this.__applyAllServices(requires, env);
    }

    /**
     * For Injections (require - get service, or require module)
     * @func getInternal
     * @param {string} requires - requires
     * @param {object} env - environment
     */
    getInternal(name) {
        return (env)=> {
            try {
                env[name] = require(name);
            } catch(e) {
                throw new Error('Injection "' + name + '" not found');
            }
        };
    }

    /* Private function
     * @param {array} services - services to require
     * @param {object} env - environment
     * ! After execute array services equal []
     */
    __applyAllServices(services, env) {
        env._services = env._services || {};

        if (services.length === 0) { return; }
        var serviceName = services.shift();
        var service = this.get(serviceName);
        return Promise.resolve().then(()=> {
            if (env._services[serviceName]) { return; }
            return service(env);
        }).then(()=> {
            env._services[serviceName] = true;
            return this.__applyAllServices(services, env);
        });
    }
}

module.exports = Services;