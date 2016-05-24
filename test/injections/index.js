'use strict';

var assert = require('chai').assert;
var sinon = require('sinon');

var Injections = require('injections');

class Child extends Injections {}

describe('Injections', ()=> {
    it('Constructor', ()=> {
        var obj = new Child();

        assert.deepEqual(obj._injections, {}, '_injections');
    });

    it('add invalid call', ()=> {
        var obj = new Child();

        assert.throw(()=> { obj.add('asdas'); }, 'Invalid call Injections.add');
    });

    it('add arguments={ 0 : function }', ()=> {
        var injection = ()=> {};
        injection.injectionName = 'i2-name';
        var obj = new Child();
        sinon.stub(obj, 'addOne').returns(obj);
        sinon.stub(obj, 'addAll').returns(obj);

        var result = obj.add(injection);

        assert.ok(obj.addOne.calledOnce, 'addOne was called');
        assert.ok(obj.addOne.calledWith('i2-name', injection), 'addOne was called with valid arguments');
        assert.ok(obj.addAll.notCalled, 'addAll was not called');
        assert.equal(result, obj, 'Valid result');
    });

    it('add arguments={ 0 : object }', ()=> {
        var injectionsObj = {};
        var obj = new Child();
        sinon.stub(obj, 'addOne').returns(obj);
        sinon.stub(obj, 'addAll').returns(obj);

        var result = obj.add(injectionsObj);

        assert.ok(obj.addOne.notCalled, 'addOne was not called');
        assert.ok(obj.addAll.calledOnce, 'addAll was called');
        assert.ok(obj.addAll.calledWith(injectionsObj), 'addAll was called with valid arguments');
        assert.equal(result, obj, 'Valid result');
    });

    it('add arguments={ 0 : string, 1 : function }', ()=> {
        var injection = ()=> {};
        var obj = new Child();
        sinon.stub(obj, 'addOne').returns(obj);
        sinon.stub(obj, 'addAll').returns(obj);

        var result = obj.add('injection-name', injection);

        assert.ok(obj.addOne.calledOnce, 'addOne was called');
        assert.ok(obj.addAll.notCalled, 'addAll was not called');
        assert.ok(obj.addOne.calledWith('injection-name', injection), 'addOne was called with valid arguments');
        assert.equal(result, obj, 'Valid result');
    });

    it('addOne', ()=> {
        var injection = ()=> {};
        var obj = new Child();

        obj.addOne('test-injection', injection);

        assert.deepEqual(obj._injections, { 'test-injection' : injection }, 'obj._injections');
        assert.throw(()=> { obj.add('test-injection', injection); }, 'Injection with name "test-injection" already exists');
        assert.throw(()=> { obj.add(null, injection); }, 'Name is not string');
        assert.throw(()=> { obj.add(undefined, injection); }, 'Name is not string');
        assert.throw(()=> { obj.add('', injection); }, 'Name is not defined');
        assert.throw(()=> { obj.add('myInjection', ''); }, 'Injection is not function');
    });

    it('addAll', ()=> {
        var injection = {
            t1 : ()=> {},
            t2 : ()=> {},
            model : {
                method : ()=> {}
            }
        };
        var obj = new Child();
        sinon.stub(obj, 'add');

        obj.addAll(injection);

        assert.ok(obj.add.calledThrice, 'add was called');
        assert.ok(obj.add.calledWith('t1', injection.t1), 'add was called with valid arguments');
        assert.ok(obj.add.calledWith('t2', injection.t2), 'add was called with valid arguments');
        assert.ok(obj.add.calledWith('model:method', injection.model.method), 'add was called with valid arguments');
    });

    it('prefix', ()=> {
        var injection = ()=> {};
        var obj = new Child();
        sinon.stub(obj, 'add');

        assert.throw(()=> { obj.prefix({}, injection); }, 'Prefix is not string');
        assert.throw(()=> { obj.prefix('', injection); }, 'Prefix is not defined');
        assert.throw(()=> { obj.prefix('module', {}); }, 'Prefix-add is not function');

        var result = obj.prefix('prf:', ()=> { obj.add('tn', injection); });
        obj.prefix('cmp:', ()=> { obj.prefix('mdl:', ()=> { obj.add('ts', injection); }); });

        assert.ok(obj.add.calledTwice, 'add was called');
        assert.ok(obj.add.calledWith('prf:tn', injection), 'add was called with valid arguments');
        assert.ok(obj.add.calledWith('cmp:mdl:ts', injection), 'add was called with valid arguments');
        assert.equal(result, obj, 'Valid result');
    });

    it('get', ()=> {
        var injection = ()=> {};
        var obj = new Child();
        obj._injections.bad = {};
        obj.addOne('test-injection', injection);

        var result = obj.get('test-injection');

        assert.equal(result, injection, 'obj._injections');
        assert.throw(()=> { obj.get(); }, 'Name is not string');
        assert.throw(()=> { obj.get(''); }, 'Name is not defined');
        assert.throw(()=> { obj.get('sdsdk-32'); }, 'Injection "sdsdk-32" not found');
        assert.throw(()=> { obj.get('bad'); }, 'Injection "bad" is not function');
    });

    it('get with getInternal', ()=> {
        var injection = ()=> {};
        var obj = new Child();
        obj.getInternal = ()=> { return 'internal'; };
        obj._injections.bad = {};
        obj.addOne('test-injection', injection);

        var result = obj.get('test-injection22');

        assert.equal(result, 'internal', 'getInternal');
    });

    it('require', ()=> {
        var createFunction= (funcRequire)=> {
            var result = ()=> {};
            result.require = funcRequire;

            return result;
        };
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

        var obj = new Child();

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
        assert.throws(()=> { obj.require('task3', 'require'); }, 'Dependency ring found');
    });
});