var assert = require('chai').assert;

var Jinn = require('jinn');
var Services = require('services');
var Environment = require('environment');
var Tasks = require('tasks');

describe('Jinn', ()=> {
    it('constructor', ()=> {
        var jinn = new Jinn();

        assert.ok(jinn.tasks instanceof Tasks, 'jinn.tasks');
        assert.ok(jinn.services instanceof Services, 'jinn.services');
        assert.ok(jinn.environment instanceof Environment, 'jinn.environment');

        assert.equal(jinn.tasks._jinn, jinn, 'jinn.tasks._jinn');
        assert.equal(jinn.services._jinn, jinn, 'jinn.services._jinn');
    });

    it('execute', ()=> {

    });

    it('parse', ()=> {
        var jinn = new Jinn();

        assert.deepEqual(
            jinn.parse('t:task -a1 file -a22s sdd --name ResultName'),
            { task : 't:task', args: { a1: 'file', a22s : 'sdd' }, postprocessors : { name : 'ResultName' } },
            'Parse result without "');  
    });
});