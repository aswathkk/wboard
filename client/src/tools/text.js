import Tool from './tool';
import { room, socket } from '../shared';

export default class Text extends Tool {
  constructor(canvas) {
    super(canvas);
    this.typing = false;
    let select = this.select.bind(this);
    document.querySelector('.tool-item.text').addEventListener('click', select, false);
  }

  select() {
    this.deselectAll();
    this.canvas.classList.add('text');
    document.querySelector('.tool-item.text').classList.add('active');

    this.addClickEvents();
  }

  deselect() {
    this.canvas.classList.remove('text');
    document.querySelector('.tool-item.text').classList.remove('active');
    this.removeEvents();
    this.rasterize();
  }

  start(e) {
    if(this.typing) {
      this.rasterize();
    } else {
      let x, y;
      if(e.touches) {
        x = e.touches[0].clientX - this.canvas.offsetLeft;
        y = e.touches[0].clientY - this.canvas.offsetTop;
      } else {
        x = e.clientX - this.canvas.offsetLeft;
        y = e.clientY - this.canvas.offsetTop;
      }

      // Creating element for user input
      let textPsuedo = document.createElement('input');
      textPsuedo.type = 'text';
      textPsuedo.classList.add('text-tool-accept');
      document.body.appendChild(textPsuedo);
      textPsuedo.style.left = x + 'px';
      textPsuedo.style.top = y - 18.5 + 'px';
      textPsuedo.style.color = '#000000';
      textPsuedo.addEventListener('keydown', e => {
        if(e.keyCode == 13)
          this.rasterize();
      });
      setTimeout(() => textPsuedo.focus(), 100);
      this.typing = true;
      this.x = x;
      this.y = y;
    }
  }

  rasterize() {
    let textPseudo = document.querySelector('.text-tool-accept');
    if(textPseudo) {
      this.ctx.fillStyle = '#000000';
      this.ctx.font = '14px sans-serif';
      this.ctx.fillText(textPseudo.value, this.x + 11, this.y + 6);
      document.body.removeChild(textPseudo);
      this.typing = false;

      socket.emit('text', {
        text: textPseudo.value,
        x: this.x + 11,
        y: this.y + 6,
        fillStyle: this.ctx.fillStyle,
        room: room
      });
    }
  }
}
