
var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var pen = {

    begin: function (e) {
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

    init: function () {
        // Touch Events
        canvas.addEventListener('touchstart', pen.begin, false);
        canvas.addEventListener('touchmove', pen.move, false);
        canvas.addEventListener('touchend', pen.stop, false);

        // Mouse Events
        canvas.addEventListener('mousedown', pen.begin, false);
        canvas.addEventListener('mousemove', pen.move, false);
        canvas.addEventListener('mouseup', pen.stop, false);
    }

}

pen.init();
