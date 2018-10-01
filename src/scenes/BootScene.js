import WebpackLoader from 'phaser-webpack-loader';
import AssetManifest from '../manifest';

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene'
    });

    this.log = [ '' ];
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
      this.log.push(`Loaded ${file.type} - '${file.key}',  ${file.bytesLoaded} bytes total.`);
    });
  }

  drawLog() {
    const { config } = this.game;
    let { log } = this;
    log = log.reverse();
    for (let i = 0; i < log.length; i++) {
      let entry = log[i];
      this.add.text(16, config.height - 16 * i, entry, { fontSize: '16px', fill: '#fff' });
    }
  }

  update() {
    this.drawLog();
  }

  render() {}
}

export default BootScene;
