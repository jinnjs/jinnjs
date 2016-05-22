module.exports = prefix;

function prefix(prefix, prefixAdd) {
    if ((typeof prefix) !== 'string') { throw new Error('Prefix is not string'); }
    if (prefix === '') { throw new Error('Prefix is not defined'); }
    if ((typeof prefixAdd) !== 'function') { throw new Error('Prefix-add is not function'); }

    var add = this.add;
    this.add = function(name, injection) { add.call(this, prefix + name, injection); }.bind(this);
    try {
        prefixAdd();
    } finally {
        this.add = add;
    }
    return this;
}