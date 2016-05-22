module.exports = add;

function add() {
    // { 0 : function }
    if (arguments.length === 1 && arguments[0] instanceof Function) { return this.addOne(arguments[0].injectionName, arguments[0]); }
    // { 0 : object }
    if (arguments.length === 1 && arguments[0] instanceof Object) { return this.addAll(arguments[0]); }
    // { 0 : string, 1 : function }
    if (arguments.length === 2) { return this.addOne(arguments[0], arguments[1]); }

    throw new Error('Invalid call Injections.add');
}