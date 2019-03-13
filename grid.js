/**
 * 2D binary grid
 * @param {Number} w width of grid
 * @param {Number} h height of grid
 */
function Grid(w = 100, h = 100) {
    this.cells = Array(w).fill().map(e => Array(h).fill(true));
    this.width = w;
    this.height = h;
    this.cellcount = w * h;
    this.solidcount = 0;

    /**
     * Check if coordinate is inside grid
     * @param {Number} x horizontal coord
     * @param {Number} y vertical coord
     * @return {Boolean} true if inside grid 
     */
    this.isValidCoords = (x, y) => ((x > -1) && (y > -1) && (x < this.width) && (y < this.height));

    this.isFullySolid = () => this.solidcount == this.cellcount;

    /**
     * Set grid cell
     * @param {Number} x horizontal coord
     * @param {Number} y vertical coord
     * @param {Number} state if it should be Grid.FULL (default, false) or Grid.FULL (true)
     * @return {Boolean} true if inside grid (successful)
     */
    this.set = (x, y, state = true) => {
        let success = false;
        x = Math.floor(x);
        y = Math.floor(y);
        if (this.isValidCoords(x, y)) {
            if ((this.cells[x][y] === Grid.FULL) && (state === Grid.EMPTY)) this.solidcount--;
            if ((this.cells[x][y] === Grid.EMPTY) && (state === Grid.FULL)) this.solidcount++;
            this.cells[x][y] = state;
            success = true;
        }
        return success;
    };

    /**
     * 
     * @param {any} x horizontal coord
     * @param {any} y vertical coord 
     * @return {Boolean} value of grid cell
     */
    this.get = (x, y) => {
        x = Math.floor(x);
        y = Math.floor(y);
        if (this.isValidCoords(x, y))
            return this.cells[x][y];
        else
            return Grid.FULL;
    };

    /**
     * Return a list of all grid cells with a certain type (Grid.FULL or Grid.FULL). Useful for finding all empty cells.
     * @param {any} type Either Grid.FULL or Grid.FULL
     * @returns {Array} list of all cells with requested type
     */
    this.getCellsList = (type) => {
        const cellsList = [];
  
        for (let row = 0; row < this.cells.length; row++) {
            for (let col = 0; col < this.cells[row].length; col++) {
                const cell = this.cells[row][col];
                if (cell === type) cellsList.push([row, col]);
            }
        }
        return cellsList;
    };
}

// constant properties
Object.defineProperties(Grid, {
    EMPTY: { value: true, writable: false },
    FULL: { value: false, writable: false }
});