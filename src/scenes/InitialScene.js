import Player from '../objects/Player';

class InitialScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'InitialScene'
    });
    this.player;
    this.platforms;
  }

  preload() {
    //this.load.spritesheet('dude', Dude, { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    console.log(this);
    const { config } = this.game;
    const centerX = config.width / 2;
    const centerY = config.height / 2;
    // this.cameras.main.setSize(config.width, config.height);
    // this.cameras.main.setZoom(1.5);
    this.add.image(centerX, centerY, 'sky');
    this.add.image(centerX, centerY, 'star');
    this.createPlatforms();
    this.player = new Player({
      scene: this,
      key: 'dude',
      x: centerX,
      y: centerY
    });
    // this.cameras.main.startFollow(this.player);
    this.physics.add.collider(this.player, this.platforms);
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'platform');
    this.platforms.create(50, 250, 'platform');
    this.platforms.create(750, 220, 'platform');
  }

  update() {
    this.player.movePlayer();
  }

  render() {}
}

export default InitialScene;
