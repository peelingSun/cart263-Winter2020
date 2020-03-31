class World extends Moment {

  constructor() {
    super({
      key: 'World'
    });
  }

  init(data) {

  }

  preload() {
    this.valueBarTrack = this.load.image("valueBarTrack", "./assets/images/ui/valueBarTrack.psd");
    this.valueBarImg = this.load.image("valueBarImg", "./assets/images/ui/valueBar.psd");
  }

  create() {
    console.log("Creating World");
    // Physics bounds
    this.physics.world.setBounds(0, 0, window.innerWidth, window.innerHeight);
    this.cameras.main.setSize(window.innerWidth, window.innerHeight);
    // Link line linking each moment/scenes
    let thisText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Welcome to the Curating Room. Connect two life moments to curate story pairs.').setOrigin(0.5);
    // Deal with resizing event
    this.scale.on('resize', this.resize, this);
  }

  resize(newGameSize) {
    let width = newGameSize.width;
    let height = newGameSize.height;
    this.cameras.resize(width, height);
  }

  update(time, delta) {

  }
}