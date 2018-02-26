export default class Tool {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  addTouchEvents() {
    let start = this.start.bind(this);
    let stop = this.stop.bind(this);
    let move = this.move.bind(this);
    this.canvas.addEventListener('touchstart', start, false);
    this.canvas.addEventListener('touchmove', move, false);
    this.canvas.addEventListener('touchend', stop, false);
  }

  addClickEvents() {
    let start = this.start.bind(this);
    let stop = this.stop.bind(this);
    let move = this.move.bind(this);
    this.canvas.addEventListener('mousedown', start, false);
    this.canvas.addEventListener('mousemove', move, false);
    this.canvas.addEventListener('mouseup', stop, false);
    this.canvas.addEventListener('mouseout', stop, false);
  }

  removeEvents() {
    let start = this.start.bind(this);
    let stop = this.stop.bind(this);
    let move = this.move.bind(this);

    // Touch Events
    this.canvas.removeEventListener('touchstart', start, false);
    this.canvas.removeEventListener('touchmove', move, false);
    this.canvas.removeEventListener('touchend', stop, false);

    // Mouse Events
    this.canvas.removeEventListener('mousedown', start, false);
    this.canvas.removeEventListener('mousemove', move, false);
    this.canvas.removeEventListener('mouseup', stop, false);
    this.canvas.removeEventListener('mouseout', stop, false); 
  }
}
