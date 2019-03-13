/**
 *  API for grid/ants
 *  by Evan Raskob, Copyright 2019
 *  All rights reserved
 */

/**
 * Create an Ant object on a given Grid, update grid accordingly.  Returns null if no more spaces are empty. 
 * @param {Grid} grid Grid object to place new Ant into.
 * @returns {Ant} Ant object in a random empty space on the grid.
 */
const createAnt = (grid) => {
    let openCells = [], randomCell = [], ant = null;
    openCells = grid.getCellsList(Grid.EMPTY);
    if (openCells.length > 0) {
        randomCell = openCells[Math.round(Math.random() * (openCells.length - 1))];
        ant = new Ant(randomCell[0], randomCell[1]);
        grid.set(randomCell[0], randomCell[1], Grid.FULL);
    }
    return ant;
};

/**
 * Move and ant on a grid, return the last and current points (x0,y0 => x1,y1) if so, otherwise null
 * @param {Ant} ant walker ant object
 * @param {Grid} grid grid to walk on
 * @returns {Array} return the last and current points [[x0,y0], [x1,y1]] if moved, otherwise null 
 */
const move = (ant, grid) => {
    let moved = null; // if we've moved, to return

    if (ant.currentLife < ant.maxLife) {

        // only reason we check dir+2 is when just-reborn
        //  and thus just assigned a new random direction
        // otherwise we know it's blocked by our own trail
        const checkOrder = [
            (ant.dir + ant.handedness) % 4, ant.dir, (ant.dir + ant.handedness * 3) % 4, (ant.dir + 2) % 4
        ];

        let newx = ant.x, newy = ant.y, newd = ant.dir;
        for (let newd of checkOrder) {
            newx = ant.x + Ant.dxs[newd] * ant.skip;
            newy = ant.y + Ant.dys[newd] * ant.skip;
            if (grid.get(newx, newy))
                break;
        }
        // move or die
        if (grid.get(newx, newy) === Grid.EMPTY) {
            if ((ant.x !== newx) || (ant.y !== newy)) {
                moved = Array(2);
                moved[0] = [ant.x, ant.y];
                moved[1] = [newx, newy];

                ant.x = newx;
                ant.y = newy;
                ant.dir = newd;

                // ant IS MOVING
                // update grid
                grid.set(newx, newy, Grid.FULL);
                // update path
                ant.currentLife++;
                
                ant.path[ant.currentLife] = [ant.x, ant.y];
            }
        } else {
            ant.alive = false;
        }

    }
    else {
        ant.alive = false;
    }
    return moved;
}; // end move