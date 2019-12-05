// Two things matter needs
// First is an engine - computation and math behind this
// Second is a renderer - this draws the engine

const { Engine, Render, Bodies, World, MouseConstraint } = Matter;

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
    pixelRation: window.devicePixelRatio
  }
});

// Have the ability to create a brand new shape
const createShape = (x, y) => {
  return Bodies.circle(x, y, 20 + 20 * Math.random(), {
    render: {
      fillStyle: 'red'
    }
  });
};

const bigBall = Bodies.circle(w / 2, h / 2, 250, {
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

World.add(engine.world, [
  bigBall,
  ground,
  ceiling,
  leftWall,
  rightWall,
  mouseControl
]);

// When we click the page, add a new shape
document.addEventListener('click', e => {
  const shape = createShape(e.pageX, e.pageY);
  World.add(engine.world, shape);
});

// Run both the engine and the renderer
Engine.run(engine);
Render.run(renderer);
