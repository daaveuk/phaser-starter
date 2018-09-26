import 'phaser';
import BootScene from './scenes/BootScene';
const config = {
  type: Phaser.Auto,
  pixelArt: true,
  parent: 'content',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [ BootScene ]
};

const game = new Phaser.Game(config);
