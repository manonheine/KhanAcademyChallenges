noStroke(); 

var bodyX = 200;
var bodyY = bodyX*1.2;
var bodyWH = 140;
var faceWH = bodyWH/2; 
var eyeSize = bodyWH/13; 
var footW = bodyWH/3; 
var footH = bodyWH/5; 
var tongue = bodyWH/14; 


draw = function() {
    background(125, 250, 200);
    fill(255, 228, 92);
    ellipse(bodyX, bodyY, bodyWH, bodyWH); // body?
    
    fill(255, 213, 0);
    ellipse(bodyX, (bodyY-bodyWH/2)+(bodyWH/50), faceWH, faceWH); // face shadow
    ellipse(bodyX-faceWH/2, bodyY+faceWH, footW, footH); // left foot
    ellipse(bodyX+faceWH/2, bodyY+faceWH, footW, footH); // right foot
    
    fill(255, 228, 92);
    ellipse(bodyX, bodyY-bodyWH/2, faceWH, faceWH); // face? 
    
    fill(0, 0, 0);
    ellipse(bodyX-(bodyWH/14), bodyY-faceWH, eyeSize, eyeSize); // left eye
    ellipse(bodyX+(bodyWH/14), bodyY-faceWH, eyeSize, eyeSize); // right eye
    
    fill(199, 166, 0); 
    ellipse(bodyX, bodyY-(bodyWH/2.8), bodyWH/4, bodyWH/10); // mouth
    
    fill(255, 105, 5);
    rect(bodyX-tongue/2, bodyY-tongue*5, tongue, tongue2*5); // tongue
    ellipse(bodyX, tongueTip, tongue, tongue);
    
    tongue2 = tongue2 + 0.5; 
    tongueTip = tongueTip + 2.5;  
};
