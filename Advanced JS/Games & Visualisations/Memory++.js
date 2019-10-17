// Added hover state to tiles (1)
// Added start button that restarts the game (2)
// Added timer (you get 60 seconds to complete the game, but no game over state (3)
// Created levels (5) and combined time and tries to create score (4)

var numTries = 0;
var numMatches = 0;
var flippedTiles = [];
var delayStartFC = null;

// button constructor (2)
var Button = function(x, y, width) {
    this.x = x; 
    this.y = y; 
    this.width = width; 
}; 

// timer constructor (3)
var Timer = function(x, y, width) {
    this.x = x; 
    this.y = y; 
    this.width = width; 
};

// create button (2)
Button.prototype.draw = function() {
    fill(10, 138, 10);
    color(5, 59, 19); 
    strokeWeight(2); 
    rect(this.x, this.y, this.width, this.width/2, 10); 
    fill(255, 255, 255); 
    textSize(20);
    text("Start", this.x + this.width/5, this.y + this.width/3 ); 
};

// create global variables (3)
var startTime = 0; 
var currentTime = 0; 
var endTime = 0; 
var triesSeconds = 0; 

// create calc time function (3)
var calcTime = function() {
    if (flippedTiles.length === 0 && numTries === 0) {
        return 60; 
    } else if (flippedTiles.length > 0 && numTries === 0) {
        startTime = Date.now(); 
        startTime = startTime/1000; 
        return startTime;
    } else if (numTries !== 0) {
        currentTime = Date.now(); 
        currentTime = currentTime / 1000; 
        triesSeconds = Math.floor(currentTime - startTime);
        endTime = 60 - triesSeconds;
        if (endTime <= 0) {
            endTime = 0; 
        }
        return endTime; 
    }
};

//create timer with time elapsed since start (3)
Timer.prototype.draw = function() {
    fill(255, 255, 255);
    color(5, 59, 19); 
    strokeWeight(2); 
    rect(this.x, this.y, this.width, this.width/2, 10); 
    fill(5, 59, 19);
    textSize(14); 
    text(calcTime() , this.x + this.width/4, this.y + this.width/3 );
};


// insert variables in timer (3) 
var timerButton = new Timer (322, 0, 70); 

// insert variables in button (2)
var startButton = new Button (325, 355, 70); 

// button under mouse function (2)
Button.prototype.isUnderMouse = function(x, y) {
    return x >= this.x && x <= this.x + this.width  &&
        y >= this.y && y <= this.y + this.width/2;
};

var Tile = function(x, y, face) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.face = face;
    this.isFaceUp = false;
    this.isMatch = false;
};

// add mouseHover function (1)
Tile.prototype.mouseHover = function(x, y) {
    return x >= this.x && x <= this.x + this.width  &&
        y >= this.y && y <= this.y + this.width;
};

Tile.prototype.draw = function() {
    fill(214, 247, 202);
    strokeWeight(2);
    // change background color and stroke when hover (1)
    if (this.mouseHover(mouseX, mouseY) && !this.isFaceUp) {
        fill(176, 204, 166);
        strokeWeight(3);
    }
    rect(this.x, this.y, this.width, this.width, 10);
    if (this.isFaceUp) {
        image(this.face, this.x, this.y, this.width, this.width);
    } else {
        image(getImage("avatars/leaf-green"), this.x, this.y, this.width, this.width);
    }
};

Tile.prototype.isUnderMouse = function(x, y) {
    return x >= this.x && x <= this.x + this.width  &&
        y >= this.y && y <= this.y + this.width;
};

// Global config
var NUM_COLS = 5;
var NUM_ROWS = 4;

// Declare an array of all possible faces
var faces = [
    getImage("avatars/leafers-seed"),
    getImage("avatars/leafers-seedling"),
    getImage("avatars/leafers-sapling"),
    getImage("avatars/leafers-tree"),
    getImage("avatars/leafers-ultimate"),
    getImage("avatars/marcimus"),
    getImage("avatars/mr-pants"),
    getImage("avatars/mr-pink"),
    getImage("avatars/old-spice-man"),
    getImage("avatars/robot_female_1")
];

// Make an array which has 2 of each, then randomize it
var possibleFaces = faces.slice(0);
var selected = [];
for (var i = 0; i < (NUM_COLS * NUM_ROWS) / 2; i++) {
    // Randomly pick one from the array of remaining faces
    var randomInd = floor(random(possibleFaces.length));
    var face = possibleFaces[randomInd];
    // Push twice onto array
    selected.push(face);
    selected.push(face);
    // Remove from array
    possibleFaces.splice(randomInd, 1);
}

// Now shuffle the elements of that array
var shuffleArray = function(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var ind = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[ind];
        array[ind] = temp;
    }
};
shuffleArray(selected);

// Create the tiles
var tiles = [];
for (var i = 0; i < NUM_COLS; i++) {
    for (var j = 0; j < NUM_ROWS; j++) {
        var tileX = i * 78 + 10;
        var tileY = j * 78 + 40;
        var tileFace = selected.pop();
        tiles.push(new Tile(tileX, tileY, tileFace));
    }
}

background(255, 255, 255);




mouseClicked = function() {
    for (var i = 0; i < tiles.length; i++) {
        var tile = tiles[i];
        if (tile.isUnderMouse(mouseX, mouseY)) {
            if (flippedTiles.length < 2 && !tile.isFaceUp) {
                tile.isFaceUp = true;
                flippedTiles.push(tile);
                if (flippedTiles.length === 2) {
                    numTries++;
                    if (flippedTiles[0].face === flippedTiles[1].face) {
                        flippedTiles[0].isMatch = true;
                        flippedTiles[1].isMatch = true;
                        flippedTiles.length = 0;
                        numMatches++;
                    }
                    delayStartFC = frameCount;
                }
            } 
            loop();
        }
    }
    // add start button click functionality (2) 
    if (startButton.isUnderMouse(mouseX, mouseY)) {
        Program.restart(); 
    }
};

// create variables for scores (4)
var triesScore = 0; 
var timeScore = 0; 

draw = function() {
    background(255, 255, 255);
    if (delayStartFC && (frameCount - delayStartFC) > 30) {
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            if (!tile.isMatch) {
                tile.isFaceUp = false;
            }
        }
        flippedTiles = [];
        delayStartFC = null;
        noLoop();
    }
    
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].draw();
    }
    
    if (numMatches === tiles.length/2) {
        fill(0, 0, 0);
        textSize(13);
        
        // assign values to triesScore (4)
        if (numTries < 15) {
            triesScore = 50; 
        } else if (numTries >= 15 && numTries <= 19) {
            triesScore = 40; 
        } else if (numTries >= 19 && numTries <= 23) {
            triesScore = 30; 
        } else if (numTries >= 23 && numTries <= 27) {
            triesScore = 20; 
        } else if (numTries >= 27) {
            triesScore = 10; 
        }
        
        // assign values to timeScore (4)
        if (endTime > 30) {
            timeScore = 50; 
        } else if (endTime <= 30 && endTime > 23) {
            timeScore = 40; 
        } else if (endTime <= 23 && endTime > 16) {
            timeScore = 30; 
        } else if (endTime <= 16 && endTime > 9) {
            timeScore = 20; 
        } else if (numTries <= 9) {
            timeScore = 10; 
        }
        
        // create new variable for score (4)
        var score = triesScore + timeScore; 
        
        // add levels (4)
        if (score > 80) {
            text("You are a master! Score: " + numTries + " tries in " + triesSeconds + " seconds", 20, 375);
        } else if (score <= 80 && score > 60) {
            text("You are an expert! Score: " + numTries + " tries in " + triesSeconds + " seconds", 20, 375);
        } else if (score <= 60 && score > 40) {
            text("You are an intermediate! Score: " + numTries + " tries in " + triesSeconds + " seconds", 20, 375);
        } else if (score <= 40 && score > 20) {
            text("You are a beginner! Score: " + numTries + " tries in " + triesSeconds + " seconds", 20, 375);
        } else if (score <= 20) {
            text("You are a noob! Score: " + numTries + " tries in " + triesSeconds + " seconds", 20, 375);
        }
    }

    // draw the timer button (3)
    timerButton.draw();
    
    // draw the start button (2)
    startButton.draw(); 
};

noLoop(); 

 
