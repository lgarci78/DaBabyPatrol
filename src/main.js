// Luis Garcia
// My game is called DaBaby Patrol
// 4/20/2021
//Overall working on this project took me roughly 15 hours, learning how to use asperite and working on illustrator as well

//POINT BREAKDOWN
// I went with Shrek Tier, Redesign the game's art work, I made "DaBaby Car", "DaBaby Hat", and the animation through asperite. Also the main
// menu I did it with adove illustrator where I used my pixel art to make it look fitting for a main menu and quit screen
//I also implemented the 2 player mode for this game, I basically made a new rocket file that would control player 2 and just made sure to update it along the way
// I also made a timer at the top right of the screen with the help of my friend Dylan Soungpanya.
// So in total it should be 60 + 30 + 10 = 100

// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 2.5;

// reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT, keyA, keyD, keySPACE;