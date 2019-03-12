/**
 *  Ant walker class
 *  by Evan Raskob, Copyright 2019
 *  All rights reserved
 */

function Ant(_x=0,_y=0,_maxLife=100) {
    // max number of PVectors in the path
    this.ox = this.x = _x;
    this.oy = this.y = _y;
    this.skip = 1;
    this.alive = true;
    this.maxLife = _maxLife; // max number of ticks this 'lives' for
    this.path = [];
    this.dir = Math.round(Math.random()*3);
    this.handedness = Math.random(1.0) > 0.5 ? 1 : 3;
    this.currentLife = 0; // current 'tick'
}

// constant properties
Object.defineProperties(Ant, {
    dxs: { value: [1, 0, - 1, 0], writable: false },
    dys: { value: [0, - 1, 0, 1], writable: false }
});

