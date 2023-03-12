export function preload() {
  const url = process.env.NODE_ENV === "development" ? 'http://localhost:3000/easteregg' : 'https://www.notsoerudite.com/easteregg';
  this.load.setBaseURL(url);

  this.load.image('adam', 'adam.png');
  this.load.image('logo', 'erufighter-logo.png');
  this.load.image('ryan', 'ryan.png');
}

let ryan;
export function create() {
  window.ERUFIGHTER = {
    move: null
  };

  // const particles = this.add.particles('red');

  // const emitter = particles.createEmitter({
  //     speed: 100,
  //     scale: { start: 1, end: 0 },
  //     blendMode: 'ADD'
  // });
  // emitter.startFollow(logo);

  ryan = this.physics.add.image(225, window.innerHeight - 390, 'ryan');
  console.log(ryan);
  ryan.setCollideWorldBounds(true);
  
  const logo = this.physics.add.image(400, 100, 'logo');

  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);
}


export const onEngineLoad = (movement, setMovement) => {
  const config = {
    type: Phaser.CANVAS,
    width: window.innerWidth,
    height: window.innerHeight,

    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    canvas: document.getElementById('game'),
    controls: {
      stick: document.getElementById('stick'),
    },
    scene: {
      preload,
      create,
      update: () => {
        // console.log('Updating');
        // console.log(ryan);

        // console.log(movement);
        // ryan.setPosition(movement.x, movement.y);

        console.log(window.ERUFIGHTER.move);

        // console.log(movement);
        // ryan.x = movement.x;
        // ryan.y = movement.y;

        // ryan.left = movement.x;
      }
    }
  };

  const game = new Phaser.Game(config);

  console.log('Updating');
  console.log(ryan);

  console.log('Phaser has loaded');
  console.log(Phaser);
  console.log(game);

  const moveUI = document.querySelector('#movement');
  moveUI.addEventListener('mousemove', ev => {
    const cursorPosition = { x: ev.x, y: ev.y };
    const stick = config.controls.stick;
    const holder = config.controls.stick.parentElement.getBoundingClientRect();

    const center = {
      x: holder.left - holder.width / 2,
      y: holder.top - holder.height / 2,
    };
    
    const move = {
      x: Math.round(center.x + cursorPosition.x),
      y: Math.round((holder.top - cursorPosition.y) + (holder.height) - stick.offsetHeight)
    };

    const difference = {
      x: Math.abs((move.x - center.x) - stick.offsetWidth),
      y: Math.abs(move.y + center.y - holder.height) 
    };

    const distance = Math.sqrt((difference.x * difference.x) + (difference.y * difference.y));

    const direction = new Phaser.Math.Vector2(move.x, move.y).normalize();

    window.ERUFIGHTER.move = move;
    window.ERUFIGHTER.direction = direction;
    window.ERUFIGHTER.velocity = difference;

    if (distance < 200)
      setMovement({ x: move.x, y: -move.y });

    // console.log(stick.offsetHeight);
    // console.log(holder.height);

    // console.log(difference);

    // console.log(distance);
    // console.log(difference);
    // console.log(direction);
  });
};