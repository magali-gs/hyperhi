const cursor = document.querySelector('.cursor');
const canvasTag = document.querySelector('canvas.in');
let isMouseDown = false;

const growCursor = () => {
  cursor.classList.add('is-down');
};

const shrinkCursor = () => {
  cursor.classList.remove('is-down');
};

const moveCursor = (x, y) => {
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';
};

const setupCanvas = (canvas) => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const dpi = window.devicePixelRatio;
  const context = canvas.getContext('2d');

  canvas.width = w * dpi;
  canvas.height = h * dpi;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';

  context.scale(dpi, dpi);
  context.fillStyle = '#000000';
  context.strokeStyle = '#ffffff';
  context.lineWidth = 80;
  context.lineCap = 'round';
  context.lineJoin = 'round';

  context.rect(0, 0, w, h);
  context.fill()
}

const startToDraw = (canvas, x, y) => {
  const context = canvas.getContext('2d');

  context.moveTo(x, y); 
  context.beginPath();
}

const moveDraw = (canvas, x, y) => {
  const context = canvas.getContext('2d');
  if (isMouseDown) {
    context.lineTo(x, y);
    context.stroke();
  }
}

setupCanvas(canvasTag);

document.addEventListener('mousedown', (e) => { 
  isMouseDown = true;
  
  growCursor();
  startToDraw(canvasTag, e.pageX, e.pageY);
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
  shrinkCursor()
});

document.addEventListener('mousemove', (e) => {
  moveCursor(e.pageX, e.pageY);
  moveDraw(canvasTag, e.pageX, e.pageY);
});
