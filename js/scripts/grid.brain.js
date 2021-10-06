/**
 * Grid class | script wicha allows u to manage grid layout
 * @author clem
 */

import * as Utils from "./utils.brain.js";

/**
 * Function that builds a grid in the "grid-lawn container"
 * @param x, y
 **/
export function createGrid(x, y) {

    $(".grid").remove();

    for (var columns = x; columns >= 0; columns--) {

        for (var rows = 0; rows <= y; rows++) {

            $("#grid-lawn").append("<div id='" + rows + "_" + columns + "' class='grid'><label>&nbsp;</label></div>");
        };
    };

    $(".grid").width(Utils.GRID_SIZE_PX / (x+1));
    $(".grid").height(Utils.GRID_SIZE_PX / (y+1));
};

/**
 * Function that refresh all the grid and components (not used for the moment)
 * @param x, y
 **/
export function refreshGrid(x, y) {

    $(".grid").remove();
    createGrid(x, y);
};

/**
 * Function that erase an automower on the grid
 * @param autoMower
 **/
export function eraseAutomower(autoMower) {

    $(`#${autoMower.position.x}_${autoMower.position.y}>label`).html(`&nbsp;`);

    $(`#${autoMower.position.x}_${autoMower.position.y}`).removeClass('automower');
    $(`#${autoMower.position.x}_${autoMower.position.y}>label`).removeClass('label-number');
}

/**
 * Function that display automower on the grid
 * @param autoMower
 **/
export function displayAutomower(autoMower) {
    
    $(`#${autoMower.position.x}_${autoMower.position.y}`).addClass('automower');
    $(`#${autoMower.position.x}_${autoMower.position.y}>label`).addClass('label-number');
    $(`#${autoMower.position.x}_${autoMower.position.y}>label`).html(`${autoMower.numero} - ${Utils.CARDINALS_HTML[autoMower.position.orientation]}`);
}