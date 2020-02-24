"use strict";

/********************************************************************

Project 2: Something is wrong on the Internet
Sylvain Tran

references:
*********************************************************************/
let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 760,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let player;
let cursors;
let automatons;
const NB_AUTOMATA = 30;
let state;

function preload ()
{
    //state = this.plugins.get('rexfsmplugin').add(config);
    this.load.image("automata", "./assets/images/automata.png");
}
// TODO add spritesheet animations/graphics
function create ()
{
    let camera = this.cameras.add(0, 0, 1280, 760);
    player = this.physics.add.sprite(400, 0, "automata");
    player.setCollideWorldBounds(true);
    automatons = this.physics.add.group();
    automatons.enableBody = true;
    automatons.physicsBodyType = Phaser.Physics.ARCADE;

    for(let i = 0; i < NB_AUTOMATA; i++)
    {
        let a = automatons.create(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 'automata');
        //a.body.immovable = true;
    }
    // Add event listeners    
    this.physics.add.collider(player, automatons);
    this.physics.add.collider(automatons, automatons);
    this.physics.add.collider(player, automatons, rotateMe, null, this);
    cursors = this.input.keyboard.createCursorKeys();
    //camera.startFollow(player);
    // TODO create an object using phaser's gameobject factory and don't mix it up with 
    // the fsm library
    let automataConfig = {
        x: 300,
        y: 400,
        sprite: "automata" 
    };
    let testAutomata = new Automata({scene:this, x: automataConfig.x, y: automataConfig.y});
    testAutomata.speak();

    // Animate each automaton
    setInterval(() => { automatons.getChildren().forEach(automata => {
        automatons.rotate(Math.PI/8); // 2, 25, 50, 200
        //automatons.shiftPosition(250, 250);
        //automata.setDisplaySize(Math.random() * 20, Math.random() * 20);    
    });}, 1000);

    // states
    let automataStates = 
    {
        idle: new IdleState(),
        laboring: new LaboringState(),
        exhausted: new ExhaustedState()
    }
    // fsm
    this.stateMachine = new StateMachine('idle', automataStates, [this, this.player]);
}

function rotateMe() {
    console.log("Rotating - collided");
}

function update ()
{
    this.stateMachine.step();
    checkMovement();
}

function checkMovement()
{
    // Horizontal
    if(cursors.left.isDown)
    {
        player.setVelocityX(-160);
    }
    else if(cursors.right.isDown)
    {
        player.setVelocityX(160);
    }
    else
    {
        player.setVelocityX(0);
    }

    // Vertical
    if(cursors.up.isDown)
    {
        player.setVelocityY(-160);
    }
    else if(cursors.down.isDown)
    {
        player.setVelocityY(160);
    }
    else
    {
        player.setVelocityY(0);
    }
}