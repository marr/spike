describe('Scope', function() {
    it('should default to this of calling object', function() {

        var object = {};
        object.bound = function () {
            assert.strictEqual(this, object, 'object is the this value');
        };
        
        object.bound();

    });

    it('should be bound to the scope in which bind() was called', function() {

        var scope;
        
        function fun() {
            scope = this;
        }

        var object = {};
        object.bound = function () {
            fun.bind(object)();
        };
        
        object.bound();

        assert.strictEqual(scope, object, 'scope is the bound value');

    });
    it('should have access to scope above itself in the chain', function() {

        var scope;

        var root = {
            a: function(scoped) {

                b();
                function b () {
                    scope = scoped;
                }

            }
        };

        root.a(42);
        
        expect(scope).to.equal(42);

    });
});
