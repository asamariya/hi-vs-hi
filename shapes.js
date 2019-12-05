// Two things matter needs
// First is an engine - computation and math behind this
// Second is a renderer - this draws the engine

const {
  Engine,
  Render,
  Bodies,
  World,
  MouseConstraint,
  Composites,
  Query
} = Matter;

Matter.use('matter-wrap');

// Where is matter being deployed
const sectionTag = document.querySelector('section.shapes');

//what is the width and height of the page
const w = window.innerWidth;
const h = window.innerHeight;

const engine = Engine.create();
const renderer = Render.create({
  element: sectionTag,
  engine: engine,
  options: {
    height: h,
    width: w,
    background: '#000',
    wireframes: false,
    pixelRatio: window.devicePixelRatio
  }
});

// Have the ability to create a brand new shape
const createShape = (x, y) => {
  return Bodies.rectangle(x, y, 50, 50, {
    frictionAir: 0.01,
    render: {
      sprite: {
        texture: './assets/outline-2x.png',
        xScale: 0.5,
        yScale: 0.5
      }
    }
    // plugin: {
    //   wrap: {
    //     min: { x: 0, y: 0 },
    //     max: { x: 1024, y: 1024 }
    //   }
    // }
  });
};

const bigBall = Bodies.circle(w / 2, h / 2, Math.min(w / 4, h / 4), {
  isStatic: true,
  render: {
    fillStyle: 'white'
  }
});

const wallOptions = {
  isStatic: true,
  render: {
    visible: false
  }
};

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions);
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wallOptions);
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions);
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions);

const mouseControl = MouseConstraint.create(engine, {
  element: sectionTag,
  constraint: {
    render: {
      visible: false
    }
  }
});

const initialShapes = Composites.pyramid(-50, 50, 20, 5, 40, 40, (x, y) => {
  return createShape(x, y);
});

World.add(engine.world, [
  bigBall,
  ground,
  ceiling,
  leftWall,
  rightWall,
  mouseControl,
  initialShapes
]);

// When we click the page, add a new shape
document.addEventListener('click', e => {
  const shape = createShape(e.pageX, e.pageY);

  World.add(engine.world, shape);
});

// When we move our mouse, check matter for any collisions
// document.addEventListener('mouseover', e => {
//   const vector = { x: e.pageX, y: e.pageY };
//   const hoveredShapes = Query.point(initialShapes.bodies, vector);

//   hoveredShapes.forEach(shape => {
//     shape.render.sprite = null;
//     shape.render.fillStyle = 'red';
//   });
// });

// Run both the engine and the renderer
Engine.run(engine);
Render.run(renderer);

// let time = 0;
// const changeGravity = function() {
//   time = time + 0.01;

//   engine.world.gravity.x = Math.sin(time);
//   engine.world.gravity.y = Math.cos(time);

//   requestAnimationFrame(changeGravity);
// };

// changeGravity();

window.addEventListener('deviceorientation', e => {
  engine.world.gravity.x = e.gamma / 30;
  engine.world.gravity.y = e.beta / 30;
});

// window.addEventListener('resize', function() {
//   renderer.canvas.width = window.innerWidth;
//   renderer.canvas.height = window.innerHeight;
// });
