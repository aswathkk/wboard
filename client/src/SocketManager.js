import { socket, room, canvas } from './shared';

const ctx = canvas.getContext('2d');

export default class SocketManager {
  constructor() {
    socket.emit('connection', {room: room});
    socket.on('draw', this.draw);
    socket.on('draw start', this.startDraw);
    socket.on('erase', this.erase);
    socket.on('erase start', this.startErase);
    socket.on('text', this.text);
  }

  startDraw(data) {
    ctx.strokeStyle = data.strokeStyle;
    ctx.lineWidth = data.lineWidth;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.moveTo(data.x, data.y);
  }

  draw(data) {
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
  }

  startErase(data) {
    ctx.lineWidth = data.lineWidth;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.beginPath();
    ctx.moveTo(data.x, data.y);
  }

  erase(data) {
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
  }

  text(data) {
    ctx.fillStyle = data.fillStyle;
    ctx.font = '14px sans-serif';
    ctx.fillText(data.text, data.x, data.y);
  }
}