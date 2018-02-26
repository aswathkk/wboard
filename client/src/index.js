import './style.css';

import Pen from './tools/pen';
import Eraser from './tools/eraser';
import Text from './tools/text';
import Pan from './tools/pan';

const canvas = document.getElementById('canv');

let pen = new Pen(canvas);
let eraser = new Eraser(canvas);
let text = new Text(canvas);
let pan = new Pan(canvas);

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
