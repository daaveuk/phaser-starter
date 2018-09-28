import WebpackLoader from 'phaser-webpack-loader';
import AssetManifest from '../manifest';

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene'
    });
  }

  preload() {
    this.load.scenePlugin('WebpackLoader', WebpackLoader, 'loader', 'loader');
  }

  create() {
    this.loader.start(AssetManifest);
    this.loader.load().then(() => {
      this.scene.start('InitialScene');
    });
    this.loader.systems.events.on('load', (file) => {
      console.log('File loaded!', file);
    });
  }

  update() {}

  render() {}
}

export default BootScene;
