var assert = require('chai').assert;
var sinon = require('sinon');

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
        var jinn = new Jinn();
        var parsed = { task : 'task', args : { a : 12 }, postprocessors: { 'result-name': 't-name' } };
        sinon.stub(jinn, 'parse').returns(parsed);
        sinon.stub(jinn.environment, 'execute').returns('rresult');

        var result = jinn.execute('task -a 12 --task-name t-name');

        assert.equal(result, 'rresult', 'result');
        assert.ok(
            jinn.parse.calledOnce,
            'jinn.parse was called');
        assert.ok(
            jinn.parse.calledWith('task -a 12 --task-name t-name'),
            'jinn.parse was called with valid arguments');
        assert.ok(
            jinn.environment.execute.calledOnce,
            'jinn.environment.execute was called');
        assert.ok(
            jinn.environment.execute.calledWith('task', 't-name', parsed.args),
            'jinn.environment.execute was called with valid arguments');
    });

    it('parse', ()=> {
        var jinn = new Jinn();

        assert.deepEqual(
            jinn.parse([ 't:task' ]),
            { task : 't:task', args: { }, postprocessors : { } },
            'Parse result');
        assert.deepEqual(
            jinn.parse([ 't:task', '-a1', 'file', '-a22s', 'sdd', '--name', 'ResultName' ]),
            { task : 't:task', args: { a1: 'file', a22s : 'sdd' }, postprocessors : { name : 'ResultName' } },
            'Parse result without "');
        assert.deepEqual(
            jinn.parse([ 't:task', '-a1 a', 'file', '-a22s', 'sdd  ehwqeb qw k kqw', '--name', 'ResultName' ]),
            { task : 't:task', args: { 'a1 a': 'file', a22s : 'sdd  ehwqeb qw k kqw' }, postprocessors : { name : 'ResultName' } },
            'Parse result with "');
        assert.throws(()=>{
            jinn.parse([ 't:task', 'file' ]);
        }, 'Input ("file") is not postprocessor (--), or argument (-)');
    });
});