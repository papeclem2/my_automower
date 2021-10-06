/**
 * Action class | allow u to execute actions (rotation and move)
 * @author clem
 */

import * as Utils from "../scripts/utils.brain";

export default class Action {

    constructor() {
        // Empty constructor for the moment
    }

    /**
     * Method that execute rotation 90 Right
     * @param {Automower} autoMower 
     * @param {String} direction 
     * @returns {String} newOrientation
     */
     rotateLeftAutoMower(autoMower, direction) {

        let nextOrientation = '';

        switch(autoMower.position.orientation) {
            
            case Utils.CARDINALS.NORTH:
                
                nextOrientation = Utils.CARDINALS.WEST;
                break;
            case Utils.CARDINALS.EAST:
                
                nextOrientation = Utils.CARDINALS.NORTH;
                break;
            case Utils.CARDINALS.WEST:
                
                nextOrientation = Utils.CARDINALS.SOUTH;
                break;
            case Utils.CARDINALS.SOUTH:
            
                nextOrientation = Utils.CARDINALS.EAST;
                break;
            default:
                throw new Error(`${Utils.NOK_ACTION} - Wrong rotate left : ${autoMower.position.orientation} - ${direction}`);
        }

        console.log(`Automower n° ${autoMower.numero} - New rotation left ${direction} -> ${nextOrientation}`);

        return nextOrientation;
    }

    /**
     * Method that execute rotation 90 Right
     * @param {Automower} autoMower 
     * @param {String} direction 
     * @returns {String} newOrientation
     */
    rotateRightAutoMower(autoMower, direction) {

        let nextOrientation = '';

        switch(autoMower.position.orientation) {
            
            case Utils.CARDINALS.NORTH:
                
                nextOrientation = Utils.CARDINALS.EAST;
                break;
            case Utils.CARDINALS.EAST:
                
                nextOrientation = Utils.CARDINALS.SOUTH;
                break;
            case Utils.CARDINALS.WEST:
                
                nextOrientation = Utils.CARDINALS.NORTH;
                break;
            case Utils.CARDINALS.SOUTH:
            
                nextOrientation = Utils.CARDINALS.WEST;
                break;
            default:
                throw new Error(`${Utils.NOK_ACTION} - Wrong rotate right : ${autoMower.position.orientation} - ${direction}`);
        }

        console.log(`Automower n° ${autoMower.numero} - New rotation right ${direction} -> ${nextOrientation}`);

        return nextOrientation;
    }

    /**
     * Method that execute move forward 1 step and check before limits of the lawn
     * @param {Automower} autoMower 
     * @param {AutoMower} autoMower 
     */
     moveAutoMower(autoMower, direction, grid) {

        // Deep clone var position
        let nextPosition = JSON.parse(JSON.stringify(autoMower.position));

        switch(autoMower.position.orientation) {
            
            case Utils.CARDINALS.NORTH:
                
                nextPosition.y += 1
                break;
            case Utils.CARDINALS.EAST:
                
                nextPosition.x += 1
                break;
            case Utils.CARDINALS.WEST:
                
                nextPosition.x -= 1
                break;
            case Utils.CARDINALS.SOUTH:
            
                nextPosition.y -= 1
                break;
            default:
                throw new Error(`${Utils.NOK_ACTION} - Wrong move forward : ${autoMower.position.orientation} - ${direction} -> ${nextPosition.x} x ${nextPosition.y}`);
        }

        // Check if new position is inside lawn
        if(!this.isOutOfLawn(nextPosition, grid)) {

            console.log(`Automower n° ${autoMower.numero} - New move forward ${direction} -> ${nextPosition.x} x ${nextPosition.y} | OUT OF LAWN, DON'T MOVE!`);
            autoMower.outOfLawn = true;

            return autoMower;
        }
        else {

            console.log(`Automower n° ${autoMower.numero} - New move forward ${direction} -> ${nextPosition.x} x ${nextPosition.y}`);
            autoMower.outOfLawn = false;
            autoMower.position = nextPosition

            return autoMower;
        }
    }

    /**
     * Method that checks if next position is out of lawn or not
     * @param {Position} position 
     * @param {Grid} grid 
     * @returns {Boolean} true if position is inside the lawn
     */
    isOutOfLawn(position, grid) {

        return position.x >= 0 
				&& position.y >= 0
				&& position.x <= grid.x
				&& position.y <= grid.y;
    }

    /**
     * Method that executes action (rotation L,R or move forward F)
     * @param {Automower} autoMower 
     * @param {String} action
     * @param {Grid} grid 
     */
    runAction(autoMower, action, grid) {

        switch(action) {
            
            case 'L':
                autoMower.position.orientation = this.rotateLeftAutoMower(autoMower, action);
                break;
            case 'R':
                autoMower.position.orientation = this.rotateRightAutoMower(autoMower, action);
                break;
            case 'F':
                autoMower = this.moveAutoMower(autoMower, action, grid);
                break;
            default:
                throw new Error(`${Utils.NOK_ACTION} - Wrong action format : ${action}`);
        }

        return autoMower;
    }
 }