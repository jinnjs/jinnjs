var assert = require('chai').assert;

var JinnJS = require('jinnjs');
var Tasks = require('tasks');

describe('JinnJS', function () {
    it('constructor', function() {
        var jinn = new JinnJS();

        assert.ok(jinn.tasks instanceof Tasks, 'jinn.tasks');
        assert.equal(jinn.tasks._jinn, jinn, 'jinn.tasks._jinn');
    });
});