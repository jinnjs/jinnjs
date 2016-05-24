var assert = require('chai').assert;

var Jinn = require('jinn');
var Tasks = require('tasks');
var Services = require('services');

describe('Jinn', ()=> {
    it('constructor', ()=> {
        var jinn = new Jinn();

        assert.ok(jinn.tasks instanceof Tasks, 'jinn.tasks');
        assert.ok(jinn.services instanceof Services, 'jinn.services');

        assert.equal(jinn.tasks._jinn, jinn, 'jinn.tasks._jinn');
        assert.equal(jinn.services._jinn, jinn, 'jinn.services._jinn');
    });
});