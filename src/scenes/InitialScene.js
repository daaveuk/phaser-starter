import Player from '../objects/Player';
import State from '../global/state';

class InitialScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'InitialScene'
    });
    this.player;
    this.stars;
    this.platforms;
    this.state;
  }

  preload() {}

  create() {
    const { config } = this.game;
    this.state = new State(config.key, this);
    const centerX = config.width / 2;
    const centerY = config.height / 2;
    this.add.image(centerX, centerY, 'sky');
    this.createPlatforms();

    this.player = new Player({
      scene: this,
      key: 'dude',
      x: centerX,
      y: centerY,
      state: this.state
    });

    this.stars = this.physics.add.group({
      key: 'star'
    });

    this.physics.add.collider(this.player, this.platforms);
    this.input.keyboard.on('keydown_S', (event) => {
      console.log('saved');
      this.state.save();
    });
    this.input.keyboard.on('keydown_L', (event) => {
      console.log('loaded');
      this.state.load();
    });
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'platform');
    this.platforms.create(50, 250, 'platform');
    this.platforms.create(750, 220, 'platform');
  }

  update() {
    //this.player.movePlayer();
    //this.add.text(16, 16, this.game.loop.actualFps, { fontSize: '16px', fill: '#fff' });
  }

  render() {
    //game.debug.text(game.time.fps, 2, 14, '#00ff00');
  }
}

export default InitialScene;
