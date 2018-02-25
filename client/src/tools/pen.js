import Tool from './tool';

export default class Pen extends Tool {
  constructor(canvas) {
    super(canvas);
    this.color = '#000000';
    this.thickness = 10;
    this.drag = false;
    let select = this.select.bind(this);
    document.querySelector('.tool-item.pen').addEventListener('click', select, false);
  }

  select() {
    this.canvas.classList.add('pen');
    document.querySelector('.tool-item.pen').classList.add('active');

    this.addClickEvents();
  }

  deselect() {
    this.canvas.classList.remove('pen');
    document.querySelector('.tool-item.pen').classList.remove('active');
    this.removeEvents();
  }

  move(e) {
    let x, y;
    if(this.drag) {
      if(e.touches) {
        x = e.touches[0].clientX - this.canvas.offsetLeft;
        y = e.touches[0].clientY - this.canvas.offsetTop;
      } else {
        x = e.clientX - this.canvas.offsetLeft;
        y = e.clientY - this.canvas.offsetTop;
      }
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }

  start(e) {
    let x, y;
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.thickness;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.globalCompositeOperation = "source-over";
    this.drag = true;
    if(e.touches) {
      x = e.touches[0].clientX - canvas.offsetLeft;
      y = e.touches[0].clientY - canvas.offsetTop;
    } else {
      x = e.clientX - this.canvas.offsetLeft;
      y = e.clientY - this.canvas.offsetTop;
    }
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  stop() {
    this.drag = false;
  }
}
