'use strict';

class Environment {
    constructor(jinn) {
        Object.defineProperties(this, {
            'jinn': { value: jinn, enumerable : true }
        });
    }
}

module.exports = Environment;