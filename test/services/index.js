var assert = require('chai').assert;
var sinon = require('sinon');

var Services = require('services');

describe('Services', ()=> {
    it('constructor', ()=> {
        var jinn = {};
        var services = new Services(jinn);

        assert.equal(services._jinn, jinn, 'services._jinn');
        assert.isDefined(services._injections, 'Injections');
    });

    it('applyServices', (done)=> {
        var jinn = {};
        var env = {};
        var injections = {
            model : createInjection(),
            model2 : createInjection('model'),
            model3 : createInjection('model2')
        };
        var services = new Services(jinn);
        services.add(injections);

        Promise.resolve().then(()=> {
            return services.applyServices('model2,model3', env);
        }).then(()=> {
            return services.applyServices('model2', env);
        }).then(()=> {
            assert.ok(injections.model.calledOnce, 'injection was called');
            assert.ok(injections.model.calledWith(env), 'injection was called with valid arguments');
            assert.ok(injections.model2.calledOnce, 'injection was called');
            assert.ok(injections.model2.calledWith(env), 'injection was called with valid arguments');
            assert.ok(injections.model3.calledOnce, 'injection was called');
            assert.ok(injections.model3.calledWith(env), 'injection was called with valid arguments');

            done();
        }).catch((e)=> {
            done(e);
        });
    });

    it('getInternal', ()=> {
        var env = {};
        var services = new Services({});

        services.get('fs')(env);

        assert.equal(env.fs, require('fs'), 'Valid require');
        assert.throws(()=> { services.get('sndh38dj32')(env); }, 'Injection "sndh38dj32" not found');
    });

    var createInjection = (services)=> {
        var result = sinon.stub();
        result.services = services;

        return result;
    };
});