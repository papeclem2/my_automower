/**
 * General QUnit tests to check Actions functions and utils
 * @author clem
 */

/**
 * Function that checks if next position is out of lawn or not
 * @param {Integer} x 
 * @param {Integer} y
 * @param {Grid} grid 
 * @returns {Boolean} true if position is inside the lawn
 */
 function isOutOfLawn(x, y, maxX, maxY) {

    return x >= 0 
            && y >= 0
            && x <= maxX
            && y <= maxY;
}

QUnit.module('Actions Tests', function() {

    QUnit.test('Check - Automower is out of lawn', assert => {
        
        //Test if inside the lawn
        let maxX = 5, maxY = 5;
        let x = 1, y = 3;
        assert.equal(isOutOfLawn(x, y, maxX, maxY), true, `Result ok expected: ${true}`);

        //Test if outside the lawn
        x = 6, y = 2;
        assert.equal(isOutOfLawn(x, y, maxX, maxY), false, `Result ok expected: ${false}`);
    });
    
    // TODO : other tests with entities, functions, methods, throws exceptions, etc.
});