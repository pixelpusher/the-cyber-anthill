/**
 * 2D binary grid
 * @param {Number} w width of grid
 * @param {Number} h height of grid
 */
function Grid(w=100,h=100) {
    this.cells = Array(w).fill().map(e=>Array(h).fill(true));
    this.width = w;
    this.height = h;
    this.cellcount = w*h;
    this.solidcount = 0;

    this.isValidCoords = (x, y) => (x > -1) && (y > -1) && (x < this.width) && (y < this.height);
    this.isFullySolid = () => this.solidcount == this.cellcount;
    this.set = (x, y, state = true) => {
        let success = false;
        if (this.isValidCoords(x, y)) {
            if ((this.cells[x][y] === Grid.SOLID) && (state === Grid.CLEAR)) this.solidcount--;
            if ((this.cells[x][y] === Grid.CLEAR) && (state === Grid.SOLID)) this.solidcount++;
            this.cells[x][y] = state;
            success = true;
        }
        return success;
    };
    this.get = (x, y) => {
        if (this.isValidCoords(x, y))
            return this.cells[x][y];
        else
            return Grid.SOLID;
    };

}

// constant properties
Object.defineProperties(Grid, {
    CLEAR: { value: true, writable: false },
    SOLID: { value: false, writable: false }
});

/**
 * Check if coordinate is inside grid
 * @param {Number} x horizontal coord
 * @param {Number} y vertical coord
 * @return {Boolean} true if inside grid 
 */
//Grid.prototype.isValidCoords = (x, y) => (x > -1) && (y > -1) && (x < this.width) && (y < this.height);

//Grid.prototype.isFullySolid = () => this.solidcount == this.cellcount;
/**
 * Set grid cell
 * @param {Number} x horizontal coord
 * @param {Number} y vertical coord
 * @param {Number} state if it should be Grid.SOLID (default, false) or Grid.CLEAR (true)
 * @return {Boolean} true if inside grid (successful)
 */
//Grid.prototype.set = (x, y, state = true) => {
//        let success = false;
//        if (this.isValidCoords(x, y)) {
//            if ((this.cells[x][y] === Grid.SOLID) && (state === Grid.CLEAR)) this.solidcount--;
//            if ((this.cells[x][y] === Grid.CLEAR) && (state === Grid.SOLID)) this.solidcount++;
//            this.cells[x][y] = state;
//            success = true;
//        }
//    return success;
//};

/**
 * 
 * @param {any} x horizontal coord
 * @param {any} y vertical coord 
 * @return {Boolean} value of grid cell
 */
//Grid.prototype.get = (x, y) => {
//    if (this.isValidCoords(x, y))
//        return this.cells[x][y];
//    else
//        return Grid.SOLID;
//};