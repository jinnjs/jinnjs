var assert = require('chai').assert;

var injections = require('injections');

module.exports = function(it) {
    it('require', function() {
        var obj = injections({});

        obj.add(INJECTIONS);

        assert.deepEqual(
            obj.require('model', 'require'),
            [ 'model' ],
            'Valid result');
        assert.deepEqual(
            obj.require('model3', 'require'),
            [ 'model', 'model2', 'model3' ],
            'Valid result');
        assert.deepEqual(
            obj.require('model4', 'require'),
            [ 'model', 'model2', 'model3', 'model4' ],
            'Valid result');
        assert.deepEqual(
            obj.require('method2,method3', 'require'),
            [ 'method', 'method2', 'method3' ],
            'Valid result');
        assert.deepEqual(
            obj.require('bigComponent', 'require'),
            [ 'component', 'anotherComponent', 'bigComponent' ],
            'Valid result');
        assert.deepEqual(
            obj.require('bigComponent,model', 'require'),
            [ 'component', 'anotherComponent', 'bigComponent', 'model' ],
            'Valid result');
        assert.throws(function () { obj.require('task3', 'require'); }, 'Dependency ring found');
    });

    var INJECTIONS = {
        model : createFunction(),
        model2 : createFunction('model'),
        model3 : createFunction('model2'),
        model4 : createFunction('model3,model,model2'),

        component : createFunction(),
        anotherComponent : createFunction(),
        bigComponent : createFunction('component,anotherComponent'),

        task : createFunction('task2'),
        task2 : createFunction('task3'),
        task3 : createFunction('task'),

        method : createFunction(),
        method2 : createFunction('method'),
        method3 : createFunction('method2')
    };

    function createFunction(funcRequire) {
        function result() { }
        result.require = funcRequire;

        return result;
    }
};