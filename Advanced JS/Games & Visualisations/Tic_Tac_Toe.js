// ## STEP 1 

// For this challenge you are going to create the game of Tic-Tac-Toe. 
// For this step, you will need to create and assign values to the following variables:
// - NUM_ROWS and NUM_COLS for the number of rows and columns of tiles required to represent the grid of squares.
// - SYMBOLS for the symbols assigned to each player. For this challenge, the first symbol in the array should be the symbol for the player who moves first.
// - playerTurn to keep track of whose turn it is. It should hold the index for the symbol in the SYMBOLS array for whose turn it is.

var playerTurn = 0;
var NUM_COLS = 3;
var NUM_ROWS= 3;
var SYMBOLS = ["X", "O"];

var tiles = [];

var checkWin = function() {
    
};

var Tile = function(x, y) {
    this.x = x;
    this.y = y;
    this.size = width/NUM_COLS;
    this.label = "";
};

Tile.prototype.draw = function() {
    fill(214, 247, 202);
    strokeWeight(2);
    rect(this.x, this.y, this.size, this.size, 10);
    textSize(100);
    textAlign(CENTER, CENTER);
    fill(0, 0, 0);
    text(this.label, this.x+this.size/2, this.y+this.size/2);
};

Tile.prototype.empty = function() {
    return this.label === "";
};

// ## STEP 3 (scroll to 65 for STEP 2)

// For this step of the challenge you will complete Tile's onClick method which will implement a major part of the logic for the game.
// For empty tiles the onClick method should perform the following:
// - Change the tile's label to match the symbol of the player who currently has the turn.
// - Make it the next player's turn.
// For tiles that are not empty the onClick method shouldn't do anything (It should just ignore the invalid move).

Tile.prototype.onClick = function() {
    // If the tile is not empty, exit the function
    if (!this.empty()) {
        return;  
    }
    // Put the player's symbol on the tile
    this.label = SYMBOLS[playerTurn]; 
    
    // Change the turn
    playerTurn++; 
    if( 2*playerTurn >= SYMBOLS.length) {
        playerTurn = 0; 
    }
    
};

// ## STEP 2 

// For this step of the challenge you will complete Tile's handleMouseClick method.
// The handleMouseClick method has two parameters: x and y which represent the coordinates of where the user clicked the mouse. When a user clicks inside a tile, that tile's handleMouseClick method should call that tile's onClick method.
// To check if the mouse click is inside of the tile, you will need an if statement that checks if:
// - the mouse click is on, or right of, the left edge of the tile
// - the mouse click is on, or left of, the right edge of the tile
// - the mouse click is on, or below, the upper edge of the tile
// - the mouse click is on, or above, the lower edge of the tile

Tile.prototype.handleMouseClick = function(x, y) {
    // Check for mouse clicks inside the tile
    if ( x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size ) {
        this.onClick(); 
    }
};

for (var i = 0; i < NUM_COLS; i++) {
    for (var j = 0; j < NUM_ROWS; j++) {
        tiles.push(new Tile(i * (width/NUM_COLS-1), j * (height/NUM_ROWS-1)));
    }
}

var drawTiles = function() {
    for (var i in tiles) {
        tiles[i].draw();
    }
};

mouseReleased = function() {
    for (var i in tiles) {
        tiles[i].handleMouseClick(mouseX, mouseY);
    }
};

draw = function() {
    background(143, 143, 143);
    drawTiles();
};
