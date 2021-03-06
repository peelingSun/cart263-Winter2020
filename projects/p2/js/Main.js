"use strict";

/********************************************************************

Project 2: Something is wrong on the Internet
Sylvain Tran

World of Youtube

references:
https://stackoverflow.com/questions/4852017/how-to-initialize-an-arrays-length-in-javascript
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/
https://phaser.io/phaser3/devlog/119

attributions:
CC0 free assets from itch.io (exact attributions soon)
tilemapping from phaser
Music by Matthew Pablo
http://www.matthewpablo.com
*********************************************************************/
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0
      }
    }
  },
  plugins: {
    global: [{
      key: 'YoutubeDirtPile',
      plugin: YoutubeDirtPilePlugin,
      start: true
    }]
  },
  scene: [
    BootScene, Preloader, YoutubeLounge, UI, YoutubeStudio, YoutubeChannelA
  ]
};

// Player states - TODO Move into its class
let playerStates = {
  idle: new PlayerIdleState(),
  moving: new MovingState()
}

// Automata states - TODO Move into its class
let automataStates = {
  idle: new IdleState(),
  moving: new AutomataMovingState(),
  laboring: new LaboringState(),
  exhausted: new ExhaustedState()
}

let game = new Phaser.Game(config);

const intervalToCallNewDialog = 1000;
let workCommandIssued = false; // if the player has issued a voice command to work -- currently global, to be refactored
const irishLand = document.createElement("AUDIO");

$(document).ready(setup);
$(document).one("click", startMusic);

function setup() {
  // jquery ui quest log, in development
  // setTimeout(handleMessageDialog, intervalToCallNewDialog);
  $('.side__left-menu__top').fadeIn(3000);

  // Accordions
  $('#side__left-menu__item--accordion-about').accordion({
    collapsible: true
  });

  // Music
  if (irishLand.canPlayType("audio/mpeg")) {
    irishLand.setAttribute("src","./assets/sounds/IrelandCoast - Matthew Pablo.mp3");
  } else {
    irishLand.setAttribute("src","./assets/sounds/IrelandCoast - Matthew Pablo.ogg");
  }

  irishLand.setAttribute("controls", "controls");
  document.body.appendChild(irishLand);
}

function startMusic() {
  irishLand.play();
  irishLand.loop = true;
}