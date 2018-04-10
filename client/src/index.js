import './style.css';

import Room from './room';
import Pen from './tools/pen';
import Eraser from './tools/eraser';
import Text from './tools/text';
import Pan from './tools/pan';
import SocketManager from './SocketManager';
import { canvas } from './shared';

const room = new Room();
const pen = new Pen(canvas);
const eraser = new Eraser(canvas);
const text = new Text(canvas);
const pan = new Pan(canvas);
const socketMgr = new SocketManager();

let deselectAll = () => {
  pen.deselect();
  eraser.deselect();
  text.deselect();
  pan.deselect();
};

pen.onDeselect(deselectAll);
eraser.onDeselect(deselectAll);
text.onDeselect(deselectAll);
pan.onDeselect(deselectAll);

pen.select();
