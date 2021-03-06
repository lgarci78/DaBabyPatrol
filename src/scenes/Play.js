
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        //this.load.image('rocket', './assets/rocket.png');
        this.load.image('rocket', './assets/DaBabyCar.png');
        this.load.image('rocket2', './assets/DaBabyCar2.png');
        this.load.image('spaceship', './assets/DaBabyHat.png');
        this.load.image('starfield', './assets/DaBabyStarfield.png');
        this.load.audio('GameAudio', './assets/DaBabyMusic.wav');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/DaBabyHatBlownoff.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });

        // load quit screen
        this.load.image('QuitScreen','./assets/DaBabyQuit.png');
    }

    create() {

        // choosing time
        let time;
        if(game.settings.gameTimer == 60000){

            time = 60;
        }
        if(game.settings.gameTimer == 45000){

            time = 45;
        }


        //inserting music
        this.sound.play('GameAudio', {volume: 0.2});

        //place starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // blue UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x0d00ff).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000).setOrigin(0,0);

        // add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add rocket2 (player 2)
        this.p2Rocket = new Rocket2(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket2').setOrigin(-0.5, 0);

        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0, 0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //player 2
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });


        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Comic',
            fontSize: '30px',
            backgroundColor: '#0d00ff',
            color: '#000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedwidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding * 8, borderUISize + borderPadding, 'DaBaby Points: ' + this.p1Score, scoreConfig);
        
        // display time
        let timeDisplay;
         
        let timeConfig = {
           fontFamily: 'Courier',
           fontSize: '18px',
           backgroundColor: '#0d00ff',
           color: '#000',
           align: 'right',
           padding:{
               top: 5,
               bottom: 5,
           },
           fixedWidth: 150
       }
       
       timeDisplay = this.add.text(borderUISize + borderPadding * 32.5, borderUISize + borderPadding*2, "Time Left: " + time + "s", timeConfig);   

       let minusTime = setInterval(updateTime, 1000);

       function updateTime(){
           //console.log("In here");
           if(time > 0){
               time--;
           }
           timeDisplay.text = "Time Left: " + time + "s";
       }

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.QuitScreen = this.add.tileSprite(0, 0, 640, 480, 'QuitScreen').setOrigin(0, 0);
            //this.add.text(game.config.width/2, game.config.height/2, 'Game OVER', scoreConfig).setOrigin(0.5);
            //this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.game.sound.stopAll();
            this.gameOver = true;

        }, null, this);
    }

    update() {

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= starSpeed;

        if (!this.gameOver) {
            // update rocket
            this.p1Rocket.update();
            this.p2Rocket.update();
            // update Spaceships (x3)
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        

        // check collisions p1
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }



        // check collisions p2
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = 'DaBaby Points: ' + this.p1Score;
        this.sound.play('sfx_explosion');
    }
}