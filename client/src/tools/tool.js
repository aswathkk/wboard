export default class Tool {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  addClickEvents() {
    if(this.start)
      this.startListener = this.start.bind(this);
    if(this.stop)
      this.stopListener = this.stop.bind(this);
    if(this.move)
      this.moveListener = this.move.bind(this);

    let start = this.startListener;
    let stop = this.stopListener;
    let move = this.moveListener;

    // Mouse events
    this.canvas.addEventListener('mousedown', start, false);
    this.canvas.addEventListener('mousemove', move, false);
    this.canvas.addEventListener('mouseup', stop, false);
    this.canvas.addEventListener('mouseout', stop, false);

    // Touch events
    this.canvas.addEventListener('touchstart', start, false);
    this.canvas.addEventListener('touchmove', move, false);
    this.canvas.addEventListener('touchend', stop, false);
  }

  removeEvents() {
    let start = this.startListener;
    let stop = this.stopListener;
    let move = this.moveListener;

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

  onDeselect(deselectAll) {
    this.deselectAll = deselectAll;
  }
}
