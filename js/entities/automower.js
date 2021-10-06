/**
 * Automower class | describe attributes, getters & setters
 * @author clem
 */
export default class Automower {

    constructor(numero, position, actions, outOfLawn) {

        this.numero = numero;
        this.position = position;
        this.actions = actions;
        this.outOfLawn = outOfLawn;
    }
}