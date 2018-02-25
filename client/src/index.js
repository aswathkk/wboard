import './style.css';

import Pen from './tools/pen';
import Eraser from './tools/eraser';

const canvas = document.getElementById('canv');

let pen = new Pen(canvas);
let eraser = new Eraser(canvas);

pen.select();
