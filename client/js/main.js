
var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');

var pen = {

    begin: function (e) {
        pen.drag = true;
        x = e.clientX - canvas.offsetLeft;
        y = e.clientY - canvas.offsetTop;
        ctx.beginPath();
        ctx.moveTo(x, y);
    },

    move: function (e) {
        if(pen.drag) {
            x = e.clientX - canvas.offsetLeft;
            y = e.clientY - canvas.offsetTop;
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    },

    stop: function () {
        pen.drag = false;
    },

    init: function () {
        canvas.addEventListener('mousedown', pen.begin, false);
        canvas.addEventListener('mousemove', pen.move, false);
        canvas.addEventListener('mouseup', pen.stop, false);
    }

}

pen.init();
