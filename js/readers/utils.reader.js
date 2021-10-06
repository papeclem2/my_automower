import Automower from '../entities/automower.js';
import Position from '../entities/position.js';
import * as Utils from '../scripts/utils.brain.js';

/**
 * Function wich allows u to read an automower position & orientation line from the file
 * @param {String} autoMowersLine, {Integer} NumeroAM
 * @returns {Automower} new AM with position
 */
export function getAMPositionFromLine(autoMowerLine, numeroAM) {

    if(autoMowerLine && 
        typeof(autoMowerLine) === 'string' && 
        autoMowerLine.length > 0) {

        let positionArray = autoMowerLine.split(Utils.WHITE_SPACE);

        if(positionArray.length == 3) { // Check position and orientation

            // Check if orientation exists in CARDINALS utils
            let orientation = '';
            if(Object.values(Utils.CARDINALS).includes(positionArray[2])) {
                orientation = positionArray[2];
            }

            let myAMPosition = new Position(parseInt(positionArray[0]), parseInt(positionArray[1]), orientation);
            let myAM = new Automower(numeroAM, myAMPosition, new Array(), false);

            return myAM;
        }
        else {
            
            throw new Error(`${Utils.NOK_FORMAT} - Automower position & orientation wrong format : ${positionArray.length} - ${positionArray}`);
        }
    }
    else {

        throw new Error(`${Utils.NOK_FORMAT} - Automower position & orientation wrong format ${autoMowerLine}`);
    }

    return null;
 }

 /**
 * Function wich allows u to read an automower actions line from the file
 * @param {String} autoMowersActionsLine, {Object} MyAutoMower
 * @returns {void} nothing
 */
export function getAMActionsFromLine(autoMowerActionsLine, myNewAM) {

    if(autoMowerActionsLine && 
        typeof(autoMowerActionsLine) === 'string' && 
        autoMowerActionsLine.length > 0 &&
        myNewAM !== null) {

        let amActions = autoMowerActionsLine.split('');
        
        if(amActions && amActions.length > 0) {

            return amActions;
        }
        else {

            throw new Error(`${Utils.NOK_FORMAT} - Automower actions wrong format ${amActions}`);
        }
    }
    else {

        throw new Error(`${Utils.NOK_FORMAT} - Automower actions wrong format ${autoMowerLine}`);
    }

    return null;
}