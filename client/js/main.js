
var socket = io();
var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');

// Pen Tool
var pen = {
    penColor: '#000000',
    penThickness: 10,
    drag: false,

    begin: function (e) {
        ctx.strokeStyle = pen.penColor;
        ctx.lineWidth = pen.penThickness;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.globalCompositeOperation = "source-over";
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

        socket.emit('draw start', {
            x: x,
            y: y,
            lineWidth: ctx.lineWidth,
            strokeStyle: ctx.strokeStyle
        });
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
            socket.emit('draw', {
                x: x,
                y: y
            });
        }
    },

    stop: function () {
        pen.drag = false;
    },

    // Pen Tool selected
    select: function () {
        canvas.className = 'pen';
        deselectAllTool(); // Removing Other EventListeners

        document.querySelector('.tool-item.pen').className = 'tool-item pen active';

        // Touch Events
        canvas.addEventListener('touchstart', pen.begin, false);
        canvas.addEventListener('touchmove', pen.move, false);
        canvas.addEventListener('touchend', pen.stop, false);

        // Mouse Events
        canvas.addEventListener('mousedown', pen.begin, false);
        canvas.addEventListener('mousemove', pen.move, false);
        canvas.addEventListener('mouseup', pen.stop, false);
        canvas.addEventListener('mouseout', pen.stop, false);
    },

    deselect: function() {

        document.querySelector('.tool-item.pen').className = 'tool-item pen';

        // Touch Events
        canvas.removeEventListener('touchstart', pen.begin, false);
        canvas.removeEventListener('touchmove', pen.move, false);
        canvas.removeEventListener('touchend', pen.stop, false);

        // Mouse Events
        canvas.removeEventListener('mousedown', pen.begin, false);
        canvas.removeEventListener('mousemove', pen.move, false);
        canvas.removeEventListener('mouseup', pen.stop, false);
        canvas.removeEventListener('mouseout', pen.stop, false); 
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

// eraser Tool
var eraser = {
    drag: false,

    begin: function (e) {
        ctx.lineWidth = pen.penThickness;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "rgba(0,0,0,1)";
        eraser.drag = true;
        if(e.touches) {
            x = e.touches[0].clientX - canvas.offsetLeft;
            y = e.touches[0].clientY - canvas.offsetTop;
        } else {
            x = e.clientX - canvas.offsetLeft;
            y = e.clientY - canvas.offsetTop;
        }
        ctx.beginPath();
        ctx.moveTo(x, y);

        socket.emit('erase start', {
            x: x,
            y: y
        });
    },

    move: function (e) {
        if(eraser.drag) {
            if(e.touches) {
                x = e.touches[0].clientX - canvas.offsetLeft;
                y = e.touches[0].clientY - canvas.offsetTop;
            } else {
                x = e.clientX - canvas.offsetLeft;
                y = e.clientY - canvas.offsetTop;
            }
            ctx.lineTo(x, y);
            ctx.stroke();

            socket.emit('erase', {
                x: x,
                y: y
            });
        }
    },

    stop: function () {
        eraser.drag = false;
    },

    // Eraser Tool selected
    select: function () {
        canvas.className = 'eraser';
        deselectAllTool(); // Removing Other EventListeners

        document.querySelector('.tool-item.eraser').className = 'tool-item eraser active';

        // Touch Events
        canvas.addEventListener('touchstart', eraser.begin, false);
        canvas.addEventListener('touchmove', eraser.move, false);
        canvas.addEventListener('touchend', eraser.stop, false);

        // Mouse Events
        canvas.addEventListener('mousedown', eraser.begin, false);
        canvas.addEventListener('mousemove', eraser.move, false);
        canvas.addEventListener('mouseup', eraser.stop, false);
        canvas.addEventListener('mouseout', eraser.stop, false);
    },

    deselect: function() {

        document.querySelector('.tool-item.eraser').className = 'tool-item eraser';

        // Touch Events
        canvas.removeEventListener('touchstart', eraser.begin, false);
        canvas.removeEventListener('touchmove', eraser.move, false);
        canvas.removeEventListener('touchend', eraser.stop, false);

        // Mouse Events
        canvas.removeEventListener('mousedown', eraser.begin, false);
        canvas.removeEventListener('mousemove', eraser.move, false);
        canvas.removeEventListener('mouseup', eraser.stop, false);  
        canvas.removeEventListener('mouseout', eraser.stop, false);
    },

    // Initialize Eraser tool
    init: function() {
        document.querySelector('.tool-item.eraser').addEventListener('click', eraser.select, false);
    },

}

// Text Tool
var text = {
    typing: false,

    begin: function (e) {

        if(text.typing) {

            text.rasterize();

        } else {

            if(e.touches) {
                x = e.touches[0].clientX - canvas.offsetLeft;
                y = e.touches[0].clientY - canvas.offsetTop;
            } else {
                x = e.clientX - canvas.offsetLeft;
                y = e.clientY - canvas.offsetTop;
            }

            // Creating element for user input
            var textPsuedo = document.createElement('input');
            textPsuedo.type = 'text';
            textPsuedo.className = 'text-tool-accept';
            document.body.appendChild(textPsuedo);
            textPsuedo.style.left = x + 'px';
            textPsuedo.style.top = y - 18.5 + 'px';
            textPsuedo.style.color = pen.penColor;
            textPsuedo.focus();
            textPsuedo.addEventListener('keydown', function(e) {
                if(e.keyCode == 13)
                    text.rasterize();
            });

            text.typing = true;
            text.x = x;
            text.y = y;
        }

    },

    // Converting html element to canvas drawing
    rasterize() {
        var textPseudo = document.querySelector('.text-tool-accept');
        if(textPseudo) {
            ctx.fillStyle = pen.penColor;
            ctx.font = '14px sans-serif';
            ctx.fillText(textPseudo.value, text.x + 11, text.y + 6);
            document.body.removeChild(textPseudo);
            text.typing = false;

            socket.emit('text', {
                text: textPseudo.value,
                x: text.x + 11,
                y: text.y + 6,
                fillStyle: ctx.fillStyle
            });
        }
    },

    // Text Tool selected
    select: function() {
        canvas.className = 'text'; // Setting cursor
        deselectAllTool(); // Removing Other EventListeners

        document.querySelector('.tool-item.text').className = 'tool-item text active';

        canvas.addEventListener('click', text.begin, false);
    },
    
    deselect: function() {

        document.querySelector('.tool-item.text').className = 'tool-item text';

        var textPseudo = document.querySelector('.text-tool-accept');
        text.rasterize();

        canvas.removeEventListener('click', text.begin, false);
    },

    // Initialize Text Tool
    init: function() {
        document.querySelector('.tool-item.text').addEventListener('click', text.select, false);
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

        document.querySelector('.tool-item.pan').className = 'tool-item pan active';

        pan.panView.drawImage(canvas, 0, 0, 200, 200);
        pan.panBox.style.width = window.innerWidth / 10 + 'px';
        pan.panBox.style.height = window.innerHeight / 10 + 'px';

        // Displaying panning view box
        document.querySelector('.pan-view-container').className = 'pan-view-container visible'

        // Touch Events
        canvas.addEventListener('touchstart', pan.begin, false);
        canvas.addEventListener('touchmove', pan.move, false);
        canvas.addEventListener('touchend', pan.stop, false);

        // Mouse Events
        canvas.addEventListener('mousedown', pan.begin, false);
        canvas.addEventListener('mousemove', pan.move, false);
        canvas.addEventListener('mouseup', pan.stop, false);
        canvas.addEventListener('mouseout', pan.stop, false);
    },
    
    deselect: function() {

        // Hiding panning view box
        document.querySelector('.pan-view-container').className = 'pan-view-container';

        document.querySelector('.tool-item.pan').className = 'tool-item pan';

        // Touch Events
        canvas.removeEventListener('touchstart', pan.begin, false);
        canvas.removeEventListener('touchmove', pan.move, false);
        canvas.removeEventListener('touchend', pan.stop, false);

        // Mouse Events
        canvas.removeEventListener('mousedown', pan.begin, false);
        canvas.removeEventListener('mousemove', pan.move, false);
        canvas.removeEventListener('mouseup', pan.stop, false);
        canvas.removeEventListener('mouseout', pan.stop, false);
    },

    // Initialize Pan Tool
    init: function() {
        document.querySelector('.tool-item.pan').addEventListener('click', pan.select, false);
    }
}

var sock = {
    startDraw: function(data) {
        ctx.strokeStyle = data.strokeStyle;
        ctx.lineWidth = data.lineWidth;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.globalCompositeOperation = "source-over";
        ctx.beginPath();
        ctx.moveTo(data.x, data.y);
    },

    draw: function(data) {
        ctx.lineTo(data.x, data.y);
        ctx.stroke();
    },

    startErase: function(data) {
        ctx.lineWidth = pen.penThickness;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.beginPath();
        ctx.moveTo(data.x, data.y);
    },

    erase: function(data) {
        ctx.lineTo(data.x, data.y);
        ctx.stroke();
    },

    text: function(data) {
        ctx.fillStyle = data.fillStyle;
        ctx.font = '14px sans-serif';
        ctx.fillText(data.text, data.x, data.y);
    },

    init: function() {
        socket.on('draw', this.draw);
        socket.on('draw start', this.startDraw);
        socket.on('erase', this.erase);
        socket.on('erase start', this.startErase);
        socket.on('text', this.text);
    }
}

// UNselect All tools
function deselectAllTool () {
    pen.deselect();
    pan.deselect();
    eraser.deselect();
    text.deselect();
}

function setSize(size) {
    pen.penThickness = size;
}

// Initializing tools
pen.init();
eraser.init();
colorPicker.init();
pan.init();
text.init();

// Initializing socket.io events
sock.init();

// Select Pen Tool initially
pen.select();
