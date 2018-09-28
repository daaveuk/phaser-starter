export default class extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    const { scene, x, y, key } = config;

    this.config = {
      bounce: 0.2,
      gravity: 800,
      jump: 480,
      speed: 160
    };

    this.scene = scene;
    this.key = key;
    this.cursors = scene.input.keyboard.createCursorKeys();
    scene.add.existing(this);
    this.registerPhysics();
    this.registerAnimations(scene);
  }

  registerPhysics() {
    const { bounce, gravity } = this.config;
    this.scene.physics.world.enable(this);
    this.setBounce(bounce);
    this.body.setGravityY(gravity);
    this.setCollideWorldBounds(true);
  }

  registerAnimations(scene) {
    var frameNames = scene.anims.generateFrameNames('bomb', {
      start: 1,
      end: 8,
      zeroPad: 4,
      prefix: 'capguy/walk/',
      suffix: '.png'
    });
    console.log(frameNames);
    this.scene.anims.create({
      key: `walk_left`,
      frames: [ 'walk_left1, walk_left2' ],
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: `walk_right`,
      frames: this.scene.anims.generateFrameNumbers('walk_right', {
        start: 1,
        end: 4
      }),
      frameRate: 10,
      repeat: -1
    });

    console.log(this);
  }

  movePlayer() {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-160);
      this.anims.play(`walk_left`, true);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(160);
      this.anims.play(`walk_right`, true);
    } else {
      this.setVelocityX(0);
      //this.anims.play('stood_still');
    }
    if (this.cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-480);
    }
  }
}
