import Tool from './tool';

export default class Pan extends Tool {
  constructor(canvas, panView) {
    super(canvas);
    this.panX = canvas.offsetLeft;
    this.panY = canvas.offsetTop;
    this.canvasLeft = canvas.offsetWidth - window.innerWidth;
    this.canvasTop = canvas.offsetHeight - window.innerHeight;
    this.panBox = document.getElementById('panviewbox');
    this.panView = document.getElementById('pan-view').getContext('2d');
    let select = this.select.bind(this);
    document.querySelector('.tool-item.pan').addEventListener('click', select, false);
  }

  select() {
    this.deselectAll();
    this.canvas.classList.add('pan');
    document.querySelector('.tool-item.pan').classList.add('active');

    this.panView.drawImage(this.canvas, 0, 0, 200, 200);
    this.panBox.style.width = window.innerWidth / 10 + 'px';
    this.panBox.style.height = window.innerHeight / 10 + 'px';

    document.querySelector('.pan-view-container').classList.add('visible');

    this.addClickEvents();
  }

  deselect() {
    this.canvas.classList.remove('pan');
    document.querySelector('.tool-item.pan').classList.remove('active');
    document.querySelector('.pan-view-container').classList.remove('visible');
    this.removeEvents();
  }

  move(e) {
    let x, y;
    if(this.drag) {
      this.canvas.classList.add('grab');
      if(e.touches) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      let left = this.canvas.offsetLeft + (x - this.panX);
      if(left <= 0 && left >= -this.canvasLeft) {
        this.canvas.style.left = left + 'px';
        this.panBox.style.right = left / 10 + 'px';
      }

      let top = this.canvas.offsetTop + (y - this.panY);
      if(top <= 0 && top >= -this.canvasTop) {
        this.canvas.style.top = top + 'px';
        this.panBox.style.bottom = top / 10 + 'px';
      }

      this.panX = x;
      this.panY = y;
    }
  }

  start(e) {
    this.drag = true;
    if(e.touches) {
      this.panX = e.touches[0].clientX;
      this.panY = e.touches[0].clientY;
    } else {
      this.panX = e.clientX;
      this.panY = e.clientY;
    }
  }

  stop() {
    this.drag = false;
    this.canvas.classList.remove('grab');
  }
}
