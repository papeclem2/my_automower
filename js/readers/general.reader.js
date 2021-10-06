/**
 * Reader class | allow u to read the content of txt file, verify format and thriw exceptions in case of error
 * @author clem
 */
import Grid from '../entities/grid.js';
import * as Utils from '../scripts/utils.brain.js'
import * as UtilsReader from './utils.reader.js'

export default class Reader {

    myGrid;
    myAutoMowers;
    myFileReader;

    /**
     * Init the input file selector and bind event to check txt content
     */
    constructor(fr) {

        this.myFileReader = fr;
        this.myAutoMowers = new Array();
    }

    /**
     * Method wich allows u to read complete file and lauch grid sizing & automowers positioning
     */
    readFile() {

        let isSuccess = false;

        try {

            //check file errors just here
            let lines = this.myFileReader.result.split(/\r?\n/);

            if(lines && 
                lines.length >= Utils.MINIMUM_FILE_LINES) { // nbr file lines ok

                let gridRead = this.readFirstLine(lines.shift());

                if(gridRead) { // read grid sizing ok

                    //update list of automowers
                    this.myAutoMowers = this.readAutoMowers(lines);

                    if(this.myAutoMowers && this.myAutoMowers.length > 0) {
                        
                        isSuccess = true;
                    }
                    else {

                        throw new Error(`${Utils.NOK_FORMAT} ${this.myAutoMowers.length}`);
                    }
                }
            }
            else { // nbr file lines nok -> x < MINIMUM_FILE_LINES

                throw new Error(`${Utils.NOK_NBR_LINE} ${lines.length} < ${Utils.MINIMUM_FILE_LINES}`);
            }
        }
        catch(e) {

            console.error("Error occurred reading file:", e.message);
        }

        return isSuccess;
    }

    /**
     * Method wich allows u to read first line of txt file (grid sizing)
     * @param {String} gridSize 
     * @returns {Boolean} success state
     */
    readFirstLine(gridSize) {

        let isSuccess = false;
        //prevent null and length checks
        if(gridSize && 
            typeof(gridSize) === 'string' && 
            gridSize.length > 0) {

            let sizeXYArray = gridSize.split(Utils.WHITE_SPACE);

            if(sizeXYArray.length == 2) {

                this.myGrid = new Grid(parseInt(sizeXYArray[0]), parseInt(sizeXYArray[1]));
                isSuccess = true;

                console.log(`Grid size: ${this.myGrid.x} x ${this.myGrid.y}`);
            }
            else {

                throw new Error(`${Utils.NOK_FORMAT} - Lawn sizing wrong format : ${sizeXYArray.length}`);
            }
        }
        else {

            throw new Error(`${Utils.NOK_FORMAT} - Grid size wrong format ${gridSize}`);
        }
        
        return isSuccess;
    }

    /**
     * Method wich allows u to read all the automowers from the txt file
     * @param {Array} autoMowers 
     * @returns {Boolean} success state
     */
    readAutoMowers(autoMowers) {

        var listOfAutoMowers = new Array();

        if(autoMowers && 
            Array.isArray(autoMowers) && 
            autoMowers.length > 0) {

                let index = 0, numeroAM = 1;
                var myNewAM = null;             

                if (autoMowers.length % 2 === 0) {

                    //read each line of txt file (automower position and actions to do)
                    autoMowers.forEach(function(autoMowerLine) {

                        if (index % 2 === 0) { //even element = get automower position
                            
                            myNewAM = UtilsReader.getAMPositionFromLine(autoMowerLine, numeroAM);

                            console.log(`New automower n°${numeroAM} | Position ${myNewAM.position.x} x ${myNewAM.position.y} | Orientation ${myNewAM.position.orientation}`);
                        } 
                        else if(myNewAM !== null) { //odd element = get automower actions
                            
                            myNewAM.actions = UtilsReader.getAMActionsFromLine(autoMowerLine, myNewAM);

                            listOfAutoMowers.push(myNewAM);
                            console.log(`Automower n°${numeroAM} | Actions to do : ${myNewAM.actions}`);

                            numeroAM++;
                        }
                        
                        index++;
                    });
                }
                else {

                    throw new Error(`${Utils.NOK_FORMAT} - Nbr of lines must be even, not odd ${autoMowers.length}`);
                }
        }

        return listOfAutoMowers;
    } 
}