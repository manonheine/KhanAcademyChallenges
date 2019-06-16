noStroke(); 

var bodyX = 200;
var bodyY = bodyX*1.2;
var bodyWH = 140;
var faceWH = bodyWH/2; 
var eyeSize = bodyWH/13; 
var footW = bodyWH/3; 
var footH = bodyWH/5; 


draw = function() {
    background(125, 250, 200);
    fill(255, 228, 92);
    ellipse(bodyX, bodyY, bodyWH, bodyWH); // body?
    
    fill(255, 213, 0);
    ellipse(bodyX, (bodyY-bodyWH/2)+(bodyWH/50), faceWH, faceWH); // face shadow
    // ellipse(bodyX-70, bodyY, footW, footH); // left foot
    // ellipse(bodyX, bodyY, footW, footH); // right foot
    
    fill(255, 228, 92);
    ellipse(bodyX, bodyY-bodyWH/2, faceWH, faceWH); // face? 
    
    fill(0, 0, 0);
    ellipse(bodyX-10, bodyY-70, eyeSize, eyeSize); // left eye
    ellipse(bodyX+10, bodyY-70, eyeSize, eyeSize); // right eye
};
