/**
 * General QUnit tests to check Automower brain & utils
 * @author clem
 */
QUnit.module('General Automower Tests', function() {

  QUnit.test('SleepTimer - Utils Brain', assert => {
    
    let sleepTimerExpected = 200;
    assert.equal(200, sleepTimerExpected, `Result ${200}, expected: ${sleepTimerExpected}`);
  });

  QUnit.test('FileExtension Accepted - Utils Brain', assert => {
    
    const FILE_TYPES = ['txt'];
    assert.equal(FILE_TYPES[0], 'txt', `Result ${FILE_TYPES[0]}, expected: ${'txt'}`);
    assert.equal(FILE_TYPES.length, 1, `Result ${FILE_TYPES.length}, expected: ${1}`);
  });

  QUnit.test('FileExtension Cardinals check - Utils Brain', assert => {
    
    let cardToCheck = 'W';
    let CARDINALS = {
        NORTH: "N", EAST: "E", SOUTH: "S", WEST: "W"
    };
    assert.ok(Object.values(CARDINALS).includes(cardToCheck), `Includes 'West' cardinal ok`);
    assert.equal(Object.values(CARDINALS).length, 4, `Result cardinals length ${CARDINALS.length}, expected: ${4}`);
  });

  QUnit.test('FileExtension Cardinals check - Utils Brain', assert => {
    
    let orientToCheck = 'R';
    let ORIENTATIONS = {
        LEFT: "L",
        EAST: "R",
        FORWARD: "F"
    };
    assert.ok(Object.values(ORIENTATIONS).includes(orientToCheck), `Includes '${orientToCheck}' cardinal ok`);
    assert.equal(Object.values(ORIENTATIONS).length, 3, `Result orientations length ${ORIENTATIONS.length}, expected: ${3}`);
  });

});

// TODO : other tests with entities, functions, methods, throws exceptions, etc.