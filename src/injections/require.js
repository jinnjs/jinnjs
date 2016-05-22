module.exports = injectionsRequire;

function injectionsRequire(requireInjection, requireKey) {
    var dependencies = getDependencies(this, requireInjection, requireKey);
    var result = [];
    fillResult(dependencies, result);

    return result;
}

function fillResult(dependencies, result) {
    var keys = Object.keys(dependencies);
    for (var i = 0; i < keys.length; i++) {
        if (dependencies[keys[i]] && dependencies[keys[i]].length === 0) {
            var key = keys[i];
            result.push(key);
            keys.forEach(applyDependency);
            dependencies[key] = null;
            fillResult(dependencies, result);
            return;
        }
    }
    var error = false;
    Object.keys(dependencies).forEach(function(key) { error = error || dependencies[key]; });
    if (error) {
        throw new Error('Dependency ring found');
    }

    function applyDependency(k) {
        if (!dependencies[k]) { return; }
        dependencies[k] = dependencies[k].filter(function(s) { return s !== key; });
    }
}

function getDependencies(obj, requireInjection, requireKey, result) {
    result = result || {};
    (requireInjection || '').split(SEPARATOR).filter(function (name) {
        return name != null && name !== '';
    }).forEach(function(name) {
        var injection = obj.get(name)[requireKey];
        if (result[name]) { return; }

        result[name] = (injection || '').split(SEPARATOR).filter(function (value) { return value != null && value !== ''; });
        getDependencies(obj, injection, requireKey, result);
    });
    return result;
}

var SEPARATOR = ',';