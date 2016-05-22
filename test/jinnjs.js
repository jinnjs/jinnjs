var assert = require('chai').assert;

var JinnJS = require('jinnjs');
var Tasks = require('tasks');
var Services = require('services');

describe('JinnJS', function () {
    it('constructor', function() {
        var jinn = new JinnJS();

        assert.ok(jinn.tasks instanceof Tasks, 'jinn.tasks');
        assert.ok(jinn.services instanceof Services, 'jinn.services');

        assert.equal(jinn.tasks._jinn, jinn, 'jinn.tasks._jinn');
        assert.equal(jinn.services._jinn, jinn, 'jinn.services._jinn');
    });
});