// Two things matter needs
// First is an engine - computation and math behind this
// Second is a renderer - this draws the engine

const { Engine, Render, Bodies, World } = Matter;

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

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, {
  isStatic: true,
  render: {
    visible: false
  }
});

World.add(engine.world, [bigBall, ground]);

// When we click the page, add a new shape
document.addEventListener('click', e => {
  const shape = createShape(e.pageX, e.pageY);
  World.add(engine.world, shape);
});

// Run both the engine and the renderer
Engine.run(engine);
Render.run(renderer);
