/**
 * Dialogue
 * 
 * Handles the dialogue boxes.
 */
class DialogueDisplayer extends Phaser.Scene {
    constructor() {
        super({key:'DialogueDisplayer'});
    }

    // Calls the dialogueFactory for a certain dialogue to return and display
    displayDialogue(threadNode, dialogueKey, dialogueArray, dialogueFactory, context) {
        // Dialogue type 0 is a standard story level dialogue
        let d = dialogueArray[dialogueKey][threadNode];
        dialogueFactory.createTextBox(context, 50, 50, {
            wrapWidth: 300,
            fixedWidth: 320,
            fixedHeight: 75,
        }).start(d, 50);
        return d;  
    }
}