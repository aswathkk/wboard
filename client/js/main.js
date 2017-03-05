
var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');

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
    panView: document.getElementById('pan-view').getContext('2d'),
    panBox: document.getElementById('panviewbox'),
    panX: canvas.offsetLeft,
    panY: canvas.offsetTop,
    canvasLeft: canvas.offsetWidth - window.innerWidth,
    canvasTop: canvas.offsetHeight - window.innerHeight,

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
            canvas.className = 'pan grab';
            if(e.touches) {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            } else {
                x = e.clientX;
                y = e.clientY;
            }

            var left = canvas.offsetLeft + (x - panX);
            if(left <= 0 && left >= -pan.canvasLeft) {
                canvas.style.left = left + 'px';
                pan.panBox.style.right = left / 10 + 'px';
            }

            var top = canvas.offsetTop + (y - panY);
            if(top <= 0 && top >= -pan.canvasTop) {
                canvas.style.top = top + 'px';
                pan.panBox.style.bottom = top / 10 + 'px';
            }

            panX = x;
            panY = y;
        }
    },

    stop: function() {
        canvas.className = 'pan';
        pan.drag = false;
    },

    // Pan Tool selected
    select: function() {
        canvas.className = 'pan'; // Setting cursor
        deselectAllTool(); // Removing Other EventListeners

        pan.panView.drawImage(canvas, 0, 0, 200, 200);
        pan.panBox.style.width = window.innerWidth / 10 + 'px';
        pan.panBox.style.height = window.innerHeight / 10 + 'px';

        // Displaying panning view box
        document.querySelector('.pan-view-container').style.opacity = 1;

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

        // Hiding panning view box
        document.querySelector('.pan-view-container').style.opacity = 0;

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
