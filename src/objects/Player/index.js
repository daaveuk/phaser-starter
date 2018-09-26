export default class extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    const { scene, x, y, key } = config;

    scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.setBounce(0.2);
    this.body.setGravityY(800);
    this.setCollideWorldBounds(true);
    this.registerAnimations();

    this.scene = scene;
    this.key = key;
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  registerAnimations() {
    this.scene.anims.create({
      key: `left`,
      frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: `turn`,
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });
    this.scene.anims.create({
      key: `right`,
      frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }

  movePlayer() {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-160);
      this.anims.play(`left`, true);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(160);
      this.anims.play(`right`, true);
    } else {
      this.setVelocityX(0);
      this.anims.play(`turn`);
    }
    if (this.cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-480);
    }
  }
}
