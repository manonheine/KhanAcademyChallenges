// added bad sticks, if more than 3 grabbed, then game over. 

var Beaver = function(x, y) {
    this.x = x;
    this.y = y;
    this.img = getImage("creatures/Hopper-Happy");
    this.sticks = 0;
    this.badSticks = 0; 
};

Beaver.prototype.draw = function() {
    fill(255, 0, 0);
    this.y = constrain(this.y, 0, height-50);
    image(this.img, this.x, this.y, 40, 40);
};

Beaver.prototype.hop = function() {
    this.img = getImage("creatures/Hopper-Jumping");
    this.y -= 5;
};

Beaver.prototype.fall = function() {
    this.img = getImage("creatures/Hopper-Happy");
    this.y += 5;
};

Beaver.prototype.checkForStickGrab = function(stick) {
    if ((stick.x >= this.x && stick.x <= (this.x + 40)) &&
        (stick.y >= this.y && stick.y <= (this.y + 40))) {
        stick.y = -400;
        this.sticks++;
    }
}; 

// create ouch function
var ouch = function() {
    background(255, 0, 0, 200);
    fill(252, 245, 45); 
    textSize(38); 
    text("Ouch", 150, 200); 
}; 

// add check for bad stick grabs
Beaver.prototype.checkForBadStickGrab = function(badstick) {
    if ((badstick.x >= this.x && badstick.x <= (this.x + 40)) &&
        (badstick.y >= this.y && badstick.y <= (this.y + 40))) {
        ouch();
        badstick.y = -400; 
        this.badSticks++; 
    }
};

var Stick = function(x, y) {
    this.x = x;
    this.y = y;
};

Stick.prototype.draw = function() {
    fill(89, 71, 0);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};

// create BadStick function
var BadStick = function(x, y) {
    this.x = x;
    this.y = y;
};

// draw BadStick
BadStick.prototype.draw = function() {
    fill(255, 0, 9);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};

var beaver = new Beaver(200, 300);

var sticks = [];
for (var i = 0; i < 40; i++) {  
    sticks.push(new Stick(i * 40 + 300, random(20, 260)));
}

// create bad sticks array
var badSticks = [];
for (var i = 0; i < 5; i++) {  
    badSticks.push(new BadStick(i * 300 + 300, random(20, 260)));
}

var grassXs = [];
for (var i = 0; i < 25; i++) { 
    grassXs.push(i*20);
}

// create game over function 
var gameOver = function () { 
    for (var i = 0; i < sticks.length; i++) {
        sticks[i].draw();
        sticks[i].y += 4;
        //sticks[i].x++;
    }
    
    for (var i = 0; i < badSticks.length; i++) {
        badSticks[i].draw(); 
        badSticks[i].y -= 4; 
        badSticks[i].x++;
    }
    
    for (var i = 0; i < grassXs.length; i++) {
        image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
        grassXs[i]++;
    }
}; 

draw = function() {
    
    // static
    background(227, 254, 255);
    fill(130, 79, 43);
    rectMode(CORNER);
    rect(0, height*0.90, width, height*0.10);
    
    for (var i = 0; i < grassXs.length; i++) {
        image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
        grassXs[i] -= 1;
        if (grassXs[i] <= -20) {
            grassXs[i] = width;
        }
    }
    
    for (var i = 0; i < sticks.length; i++) {
        sticks[i].draw();
        beaver.checkForStickGrab(sticks[i]);
        sticks[i].x -= 1;
    }
    
    // draw the bad sticks and move them across the screen
    for (var i = 0; i < badSticks.length; i++) {
        badSticks[i].draw(); 
        beaver.checkForBadStickGrab(badSticks[i]);
        badSticks[i].x -= 1; 
    }
    
    textSize(18);
    text("Score: " + beaver.sticks, 20, 30);
    // bad sticks score
    fill(0, 0, 0); 
    text("Bad Sticks: " + beaver.badSticks, 20, 50); 
    fill(255, 0, 0);
    
    // check game over or win state
    if (beaver.badSticks/badSticks.length >= 0.6) {
        textSize(36);
        text("YOU LOSE!!!!", 100, 200);
        gameOver(); 
    }  else if (beaver.sticks/sticks.length >= 0.95) {
        textSize(36);
        text("YOU WIN!!!!", 100, 200);
    } 
    
    if (keyIsPressed && keyCode === 0) {
        beaver.hop();
    } else {
        beaver.fall();
    }
    beaver.draw();
};

