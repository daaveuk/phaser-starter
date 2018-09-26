import introImage from '../img/study.png';
import Sky from '../img/sky.png';
import Platform from '../img/platform.png';
import Star from '../img/star.png';
import Bomb from '../img/bomb.png';
import Dude from '../img/dude.png';
import Player from '../objects/Player';

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene'
    });
    this.player;
    this.platforms;
  }

  preload() {
    this.load.image('study', introImage);
    this.load.image('sky', Sky);
    this.load.image('ground', Platform);
    this.load.image('star', Star);
    this.load.image('bomb', Bomb);
    this.load.spritesheet('dude', Dude, { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    const { config } = this.game;

    const centerX = config.width / 2;
    const centerY = config.height / 2;
    this.cameras.main.setSize(config.width, config.height);
    this.cameras.main.setZoom(4);

    this.add.image(centerX, centerY, 'sky');
    this.add.image(centerX, centerY, 'star');

    this.createPlatforms();

    this.player = new Player({
      scene: this,
      key: 'dude',
      x: centerX,
      y: centerY
    });

    this.cameras.main.startFollow(this.player);
    this.physics.add.collider(this.player, this.platforms);
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
  }

  update() {
    this.player.movePlayer();
  }

  render() {}
}

export default BootScene;
