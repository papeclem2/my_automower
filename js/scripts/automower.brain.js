/**
 * General brain js of the project | script with jQuery
 * @author clem
 */
import * as Utils from './utils.brain.js'
import * as Grid from './grid.brain.js'
import Reader from '../readers/general.reader.js'
import Action from '../actions/general.action.js';

/**
 * Function wich allows u to display sidebar, grid and list of results
 */
function showAllComponents() {

    $('#grid-lawn').show();
    $('#sidebar').show();
    $('#list-results').empty();
}

/**
 * Function wich allows u to display sidebar, grid and list of results
 * @param {Automower} autoMower
 */
function addAMResultToList(autoMower) {

    $('#list-results').append(`<li id="${autoMower.numero}_li_result">${Utils.displayResult(autoMower)}</li>`);
}

// First load of file reader, browser component and custom reader class
$("form").on("change", ".file-upload-field", function() {

    $(this).parent(".file-upload-wrapper").attr("data-text", $(this).val().replace(/.*(\/|\\)/, ''));
            
    var extension = this.files[0].name.split('.').pop().toLowerCase(),  // File extension from input file
        isSuccess = Utils.FILE_TYPES.indexOf(extension) > -1;  // Is extension in acceptable types

    if (isSuccess) { // Yes filetype ok

        var fr = new FileReader();

        fr.addEventListener('error', () => {

            console.error(`Error occurred reading file: ${selectedFile.name}`);
        });

        // After txt file uploaded
        fr.onload = function() {

            var myReader = new Reader(fr);
            let readerOk = myReader.readFile();

            // If reader loading succed, load grid with automowers and laucnh actions!
            if(readerOk) {

                // Display elements in view and empty histo
                showAllComponents();

                // Create grid
                Grid.createGrid(myReader.myGrid.x, myReader.myGrid.y);

                let passConfirm = false;

                // Put automowers on lawn
                myReader.myAutoMowers.forEach(function(autoMower) {

                    if(autoMower.position !== undefined) {

                        try {

                            //Add automower to results list ol
                            addAMResultToList(autoMower);

                            // Set new style for automower positioning
                            Grid.displayAutomower(autoMower);

                            // Launch automower actions
                            if(autoMower.actions !== undefined &&
                                Array.isArray(autoMower.actions)) {
                                
                                    let actionAutomower = new Action();

                                    autoMower.actions.forEach(function(action) {
                                        
                                        if(typeof(action) === 'string' && Object.values(Utils.ORIENTATIONS).includes(action)) {

                                            // Do action with short timer sleep
                                            setTimeout(function() {
                                                
                                                Grid.eraseAutomower(autoMower);
                                                autoMower = actionAutomower.runAction(autoMower, action, myReader.myGrid);
                                                Grid.displayAutomower(autoMower);
                                                
                                                $(`#${autoMower.numero}_li_result`).html(Utils.displayResult(autoMower));

                                                if(!passConfirm) {
                                                    passConfirm = !confirm(Utils.CONFIRM_ALERT);
                                                }

                                            }, Utils.SLEEP_DURATION);
                                            
                                        }
                                    });
                            }
                        }
                        catch(e) { // Catch an error during loading actions

                            console.error("Error occurred while execute action:", e.message);
                        }
                    }
                });
            }
        }

        // Read txt file
        fr.readAsText(this.files[0]);
    }
    else { // nok filetype

        console.error(`Error occurred reading file: Wrong file format, please try again!`);
        // Todo -> display errors inside index.html ?
    }
})