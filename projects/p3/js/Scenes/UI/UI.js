/**
 *  UI
 * 
 * Displays the dialogue UI.
 */
class UI extends Phaser.Scene {
    constructor() {
        super({key: 'UI'});
        // Dialogue Factory and Displayer objects
        this.dialogueFactory = new DialogueFactory();
        this.dialogueDisplayer = new DialogueDisplayer();
    }

    init() {

    }

    preload() {
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.json('chapters', 'assets/data/dialogues.json');
    }

    create() {
        // Display the dialogue; the introduction is the first node (index) of the JSON object
        const chapters = this.cache.json.get('chapters');
        const introduction = 0;
        this.dialogueDisplayer.displayDialogue(introduction, "chapterOne", chapters, this.dialogueFactory, this);
        // Launch the HUD
        this.scene.launch('Hud');
    }

    // Adds the built in text (as per the Phaser Text object) with config parameters
    getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight) {
        return scene.add.text(0, 0, '', {
                fontSize: '20px',
                wordWrap: {
                    width: wrapWidth
                },
                maxLines: 3
            })
            .setFixedSize(fixedWidth, fixedHeight);
    }
    // Adds the BBCode as per the Phaser BBCodeText object with config parameters
    getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight) {
        return scene.rexUI.add.BBCodeText(0, 0, '', {
            fixedWidth: fixedWidth,
            fixedHeight: fixedHeight,

            fontSize: '20px',
            wrap: {
                mode: 'word',
                width: wrapWidth
            },
            maxLines: 3
        })
    }
}