/**
 * General QUnit tests to check Reader functions and utils
 * @author clem
 */

/**
 * Function wich allows u to read an automower position & orientation line from the file
 * @param {String} autoMowersLine, {Integer} NumeroAM
 * @returns {Array} reading ok
 */
function getAMPositionFromLine(autoMowerLine, numeroAM) {

    if(autoMowerLine && 
        typeof(autoMowerLine) === 'string' && 
        autoMowerLine.length > 0) {

        let positionArray = autoMowerLine.split(' ');

        return positionArray;
    }

    return null;
 }

QUnit.module('Reader Tests', function() {

    QUnit.test('FileExtension Accepted - Utils Reader', assert => {
    
        //Check file extension is txt
        const FILE_TYPES = ['txt'];
        assert.equal(FILE_TYPES[0], 'txt', `Result ${FILE_TYPES[0]}, expected: ${'txt'}`);
        assert.equal(FILE_TYPES.length, 1, `Result ${FILE_TYPES.length}, expected: ${1}`);
    });

    QUnit.test('Check - Read line', assert => {
        
        //Test if inside the lawn
        let mowerStartingPos = "1 2 N";
        let resultReadingArr = getAMPositionFromLine(mowerStartingPos, 1);
        
        assert.equal(resultReadingArr.length, 3, `Result length ok expected: ${3}`);
        assert.deepEqual(resultReadingArr, ['1', '2', 'N'], `Array contains ['1', '2', 'N'] for input string ${mowerStartingPos}`); 
    });
});

// TODO : other tests with entities, functions, methods, throws exceptions, etc.