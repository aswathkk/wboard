
var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Pen Tool
var pen = {
    penColor: '#000000',
    penThickness: 15,
    drag: false,

    begin: function (e) {
        ctx.strokeStyle = pen.penColor;
        ctx.lineWidth = pen.penThickness;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        pen.drag = true;
        if(e.touches) {
            x = e.touches[0].clientX - canvas.offsetLeft;
            y = e.touches[0].clientY - canvas.offsetTop;
        } else {
            x = e.clientX - canvas.offsetLeft;
            y = e.clientY - canvas.offsetTop;
        }
        ctx.beginPath();
        ctx.moveTo(x, y);
    },

    move: function (e) {
        if(pen.drag) {
            if(e.touches) {
                x = e.touches[0].clientX - canvas.offsetLeft;
                y = e.touches[0].clientY - canvas.offsetTop;
            } else {
                x = e.clientX - canvas.offsetLeft;
                y = e.clientY - canvas.offsetTop;
            }
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    },

    stop: function () {
        pen.drag = false;
    },

    // Pen Tool selected
    select: function () {
        canvas.className = 'pen';
        deselectAllTool(); // Removing Other EventListeners

        // Touch Events
        canvas.addEventListener('touchstart', pen.begin, false);
        canvas.addEventListener('touchmove', pen.move, false);
        canvas.addEventListener('touchend', pen.stop, false);

        // Mouse Events
        canvas.addEventListener('mousedown', pen.begin, false);
        canvas.addEventListener('mousemove', pen.move, false);
        canvas.addEventListener('mouseup', pen.stop, false);
    },

    deselect: function() {

        // Touch Events
        canvas.removeEventListener('touchstart', pen.begin, false);
        canvas.removeEventListener('touchmove', pen.move, false);
        canvas.removeEventListener('touchend', pen.stop, false);

        // Mouse Events
        canvas.removeEventListener('mousedown', pen.begin, false);
        canvas.removeEventListener('mousemove', pen.move, false);
        canvas.removeEventListener('mouseup', pen.stop, false);  
    },

    // Initialize Pen tool
    init: function() {
        document.querySelector('.tool-item.pen').addEventListener('click', pen.select, false);
    },

}

var colorPicker = {
    init: function() {
        var elm = document.querySelectorAll('.color');
        for(var i = 0; i < elm.length; i++) {
            elm[i].addEventListener('click', function() {
                var color = getComputedStyle(this).backgroundColor;
                pen.penColor = color;
                document.querySelector('.tool-item.color-picker svg').style.fill = color;
            }, false);
        }
    }
}

// Pan Tool
var pan = {
    drag: false,
    panX: canvas.offsetLeft,
    panY: canvas.offsetTop,

    begin: function (e) {
        pan.drag = true;

        if(e.touches) {
            panX = e.touches[0].clientX;
            panY = e.touches[0].clientY;
        } else {
            panX = e.clientX;
            panY = e.clientY;
        }

    },

    move: function (e) {
        if(pan.drag) {
            if(e.touches) {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            } else {
                x = e.clientX;
                y = e.clientY;
            }

            canvas.style.left = canvas.offsetLeft + (x - panX) + 'px';
            canvas.style.top = canvas.offsetTop + (y - panY) + 'px';

            panX = x;
            panY = y;
        }
    },

    stop: function() {
        pan.drag = false;
    },

    // Pan Tool selected
    select: function() {
        canvas.className = 'pan'; // Setting cursor
        deselectAllTool(); // Removing Other EventListeners

        // Touch Events
        canvas.addEventListener('touchstart', pan.begin, false);
        canvas.addEventListener('touchmove', pan.move, false);
        canvas.addEventListener('touchend', pan.stop, false);

        // Mouse Events
        canvas.addEventListener('mousedown', pan.begin, false);
        canvas.addEventListener('mousemove', pan.move, false);
        canvas.addEventListener('mouseup', pan.stop, false);
    },
    
    deselect: function() {

        // Touch Events
        canvas.removeEventListener('touchstart', pan.begin, false);
        canvas.removeEventListener('touchmove', pan.move, false);
        canvas.removeEventListener('touchend', pan.stop, false);

        // Mouse Events
        canvas.removeEventListener('mousedown', pan.begin, false);
        canvas.removeEventListener('mousemove', pan.move, false);
        canvas.removeEventListener('mouseup', pan.stop, false);
    },

    // Initialize Pan Tool
    init: function() {
        document.querySelector('.tool-item.pan').addEventListener('click', pan.select, false);
    }
}

function deselectAllTool () {
    pen.deselect();
    pan.deselect();
}

pen.init();
colorPicker.init();
pan.init();

// Select Pen Tool initially
pen.select();
