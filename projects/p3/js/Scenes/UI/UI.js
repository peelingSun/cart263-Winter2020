/**
 * UI
 * 
 * Displays the UI - Dialogue, menus, etc.
 */
class UI extends Phaser.Scene {
    constructor() {
        super('UI');
        this.openProgressTabKey = null; // The keyboard input to open the progress tab DOM object (Enter for now)
        this.uiClickSound = null; // UI click sound on dialogue boxes
    }

    init() {

    }

    preload() {
        // Dialogue plugin
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    }

    create() {
        // Register keyboard inputs
        this.openProgressTabKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // this.startChapterDialogue();
        // Creates the DOM progression tab menu game object
        this.progressTabMenu = this.add.dom().createFromCache('progressTabMenu');
        this.progressTabMenu.setVisible(false);
        // this.progressTabMenu.setScale(0.25);
        this.progressTabMenu.setPosition(this.scale.width/2, this.scale.height/2);
        // Update the current progression from local storage
        // Set or get the progression game object in localStorage
        let currentGameProgression = JSON.parse(localStorage.getItem("gameProgression"));
        if(!currentGameProgression) {
        localStorage.setItem("gameProgression", JSON.stringify(gameProgression));
        } else {
        // Update the current progression from local storage
        updateProgressUI(currentGameProgression);
        }
        $(".game__progressTabMenu").draggable();
        this.uiClickSound = this.sound.add('ui-poing');
    }

    update() {
        // Listen for keyboard inputs (menu UI)
        if(Phaser.Input.Keyboard.JustDown(this.openProgressTabKey)) {
            this.handleProgressTab();
        }
    }

    // handleProgressTab
    //
    // opens up or closes the progression tab DOM menu by setting the gameobject's visibility 
    handleProgressTab() {
        if(this.progressTabMenu.visible) {
            this.progressTabMenu.setVisible(false);
        } else {
            this.progressTabMenu.setVisible(true);
        }
    }
}