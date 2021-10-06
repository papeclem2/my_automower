/**
 * Utils class & const | list static const var such as orientation, coords, cardinals, etc.
 * @author clem
 */

export const WHITE_SPACE = " ";

// Minimum file nbr lines = 3 (first line = grid sizing, second = automower 1, third = moves)
export const MINIMUM_FILE_LINES = 3;

// Acceptable file types
export const FILE_TYPES = ['txt'];

export const CARDINALS = {
    NORTH: "N",
    EAST: "E",
    SOUTH: "S",
    WEST: "W"
};

export const CARDINALS_HTML = {
  N: "&uarr;",
  E: "&rarr;",
  S: "&darr;",
  W: "&larr;"
};

export const ORIENTATIONS = {
    LEFT: "L",
    EAST: "R",
    FORWARD: "F"
};

// Errors thrown
export const NOK_FORMAT = "Bad format my lord!";
export const NOK_NBR_LINE = "Not enough lines my lord!";
export const NOK_ORIENTATION = "Orientation nok my lord!";
export const NOK_ACTION = "Action nok my lord!";
export const NOK_POSITION = "Position nok my lord!";

export const CONFIRM_ALERT = '"OK" -> move step by step\n"Cancel" -> go to the result';

// Sleep duration
export const SLEEP_DURATION = 200;

// Sleep duration
export const GRID_SIZE_PX = 960;

/**
 * Function that allows to display li result (x, y, position)
 * @param {Automower} autoMower 
 */
export function displayResult(autoMower) {

    let displayResult = `${autoMower.position.x} ${autoMower.position.y} ${autoMower.position.orientation}`

    displayResult += (autoMower.outOfLawn) ? ' (Out of lawn) ' : ''; 

    return displayResult;
}

export default class Utils {

    /**
     * Empty constructor for the moment...
     */
    constructor() {
    }
}