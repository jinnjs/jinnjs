var assert = require('chai').assert;

var Jinn = require('jinn');
var Environment = require('environment');

describe('Environment', ()=> {
    it('constructor', ()=> {
        var jinn = new Jinn();
        var env = new Environment(jinn);

        env.jinn = null;

        assert.equal(env.jinn, jinn, 'environment.jinn');
    });
});