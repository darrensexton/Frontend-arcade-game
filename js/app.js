

var score = 0;
var lives = 4;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    var direction = "";
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // Determines the direction of sprite
    if ((y == 152) || (y == 304)) {
        this.sprite = 'images/enemy-bug2.png';
    } else {
        this.sprite = 'images/enemy-bug.png';
    }; 
    this.direction = direction;
    this.x = x;
    this.y = y;
    this.speed = speed;
    
};

// Update the enemy's position, required method for game

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if ((this.y == 152) || (this.y == 304)) {
        this.x = this.x - (dt * this.speed);
        this.direction = "left";
    } else {
        this.x = this.x + (dt * this.speed);
        this.direction = "right";
    };
    if (this.direction == "left" && this.x <= -100) {
        this.x = 500;
    };
    if (this.direction == "right" && this.x >=500) {
        this.x = -100;
    };   
 };
 
 // Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};    
 // Score board
var Score = function() {  
};

Score.prototype.render = function() {
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = '15pt comic sans MS';
    ctx.fillRect(420, 550, 70, 30);
    ctx.fillRect(115, 550 ,70, 30);
    ctx.fillStyle = 'black';
    ctx.fillText(score, 450, 572);
    ctx.fillText('SCORE', 350, 572);
    ctx.fillText(lives, 145, 572);
    ctx.fillText('LIVES', 45, 572);
};

var scor = new Score;





var Gem = function() {
    this.sprite = 'images/Gem Blue.png';
    var gx = (Math.floor((Math.random() * 5)) * 101);
    var gy = (Math.floor((Math.random() * 4) + 1) * 80 - 15);
    this.x = gx;
    this.y = gy;
    console.log(gx , gy);
};

Gem.prototype.render  = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.update = function() {
    var gx = this.x;
    var gy = this.y;
};

var gem = new Gem;

var Player = function() {
    
    this.sprite = 'images/char-boy.png';
    playerhome();
    this.x = playerx;
    this.y = playery;
};

Player.prototype.update = function() {
    this.x = playerx;
    this.y = playery;
    console.log(playerx, playery);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
};
// Check for gem collection
function checkPrizecollect() {
    for(var i=0; i< 16; i++) {
    if ((playerx == gem.x ) && ((playery - gem.y) == i)) {
        score = score + 50;
        gem.x = (Math.floor((Math.random() * 5)) * 101);
        gem.y = (Math.floor((Math.random() * 4) + 1) * 80 - 15);
    }};
};
// Check for collision with bugs and water
function checkCollisions() {
  var px = playerx;
  var py = playery;
   
   for (var i=0; i < allEnemies.length; i++) {
        if ((px + 67) >= (allEnemies[i].x) && //67
            (px) <= (allEnemies[i].x + 70) && //101
            (py + 50) >= (allEnemies[i].y) &&
            (py) <= (allEnemies[i].y + 28))   
            {playerhome();
            lives = lives-1;}
       };
       if (lives == 0 ) {
        alert('Game Over.  You scored ' + score + ' points.')
        lives = 4;
        score = 0;
        playerhome();
       };
       if (py == -5 ) {
        playerhome();
        score = score + 100
       };
       
  };
// Start position
function playerhome() {
    playerx = 202;
    playery = 400;
}


// Player Movement
Player.handleInput = function(key) {
    switch (key) {
        case 'left': playerx = playerx - 101;
        break;
        case 'right' : playerx = playerx + 101;
        break;
        case 'up' : playery = playery - 81;
        break;
        case 'down' : playery = playery + 81;
        break;
    }
    // boundaries
    if (playerx >= 404) {
        playerx = 404;
    }
    
    if (playerx <=0) {
       playerx = 0;
    }
    
    if (playery >= 400) {
        playery = 400;
    }
    if (playery <= -5) {
       playery = -5;
    console.log(playerx, playery);    
    }
  
};

var player = new Player;




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(-100, 76, 300), new Enemy(500, 152, 170),  new Enemy(500, 304, 250), new Enemy(-100, 228, 275), new Enemy(-450, 228, 275)];
// Place the player object in a variable called player


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    Player.handleInput(allowedKeys[e.keyCode]);
});
