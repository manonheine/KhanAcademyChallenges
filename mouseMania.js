
draw = function() {
    
    stroke(mouseY, mouseX, 0);
    fill(mouseX, mouseY, 104);
    ellipse(mouseX, mouseY, 30, 10);
    
    mouseX += 1; 
    mouseY++; 
 
};
