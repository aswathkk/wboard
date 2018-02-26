import './style.css';

import Pen from './tools/pen';
import Eraser from './tools/eraser';
import Pan from './tools/pan';

const canvas = document.getElementById('canv');

let pen = new Pen(canvas);
let eraser = new Eraser(canvas);
let pan = new Pan(canvas);

let deselectAll = () => {
  pen.deselect();
  eraser.deselect();
  pan.deselect();
};

pen.onDeselect(deselectAll);
eraser.onDeselect(deselectAll);
pan.onDeselect(deselectAll);

pen.select();
