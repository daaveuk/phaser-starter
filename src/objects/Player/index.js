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
    this.registerAnimations();
  }

  registerPhysics() {
    const { bounce, gravity } = this.config;
    this.scene.physics.world.enable(this);
    this.setBounce(bounce);
    this.body.setGravityY(gravity);
    this.setCollideWorldBounds(true);
  }

  registerAnimations() {
    let { scene } = this;
    let walk_left = scene.anims.generateFrameNames('dude', {
      prefix: 'walk_left',
      start: 1,
      end: 4
    });

    let walk_right = scene.anims.generateFrameNames('dude', {
      prefix: 'walk_right',
      start: 1,
      end: 4
    });

    let stood_still = scene.anims.generateFrameNames('dude', {
      prefix: 'stood_still',
      start: 1,
      end: 1
    });

    scene.anims.create({
      key: `walk_left`,
      frames: walk_left,
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: `stood_still`,
      frames: stood_still,
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: `walk_right`,
      frames: walk_right,
      frameRate: 10,
      repeat: -1
    });
  }

  movePlayer() {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-160);
      this.anims.play('walk_left', true);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(160);
      this.anims.play('walk_right', true);
    } else {
      this.setVelocityX(0);
      this.anims.play('stood_still');
    }
    if (this.cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-480);
    }
  }
}
