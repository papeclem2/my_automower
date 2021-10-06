/**
 * General QUnit tests to check Grid functions and utils
 * @author clem
 */
 QUnit.module('Grid Lawn Tests', function() {

    QUnit.test('Grid size px - Utils Grid', assert => {
    
        let sizeGridPX = 960;
        assert.equal(960, sizeGridPX, `Result ${960}, expected: ${sizeGridPX}`);
      });
    
    // TODO : other tests with entities, functions, methods, throws exceptions, etc.
});