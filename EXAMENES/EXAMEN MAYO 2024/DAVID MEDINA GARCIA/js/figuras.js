function initFiguras() {
   canvas = document.getElementById("figuras");
   ctx = canvas.getContext("2d");
   circulo(50, 34, 20, 0, 2 * Math.PI);
   arco(50, 75, 20,1.5*Math.PI, 0); 
   // linea(50,75,15);
   linea();
}

function circulo(cx, cy, r, sa, ea) {
   ctx.save();
   ctx.beginPath();
   ctx.arc(cx, cy, r, sa, ea);
   ctx.lineWidth = 3;
   ctx.strokeStyle = "blue";
   ctx.stroke();
   ctx.restore();
}
function arco(cx, cy, r, sa, ea) {
   ctx.save();
   ctx.beginPath();
   ctx.moveTo(cx,cy);
   ctx.arc(cx, cy, r, sa, ea);
   ctx.fillStyle = "blue";
   ctx.fill();
   ctx.restore();
}
function linea() {
   ctx.save();
   ctx.beginPath();
   ctx.fillStyle="blue";
   ctx.fillRect(50,75,30,2);
   ctx.fillStyle="blue";
   ctx.fillRect(80,47,2,30);
   ctx.fillStyle="blue";
   ctx.fillRect(80,47,30,2);
   ctx.restore();
}
// function linea(x, y, size) {
//    ctx.beginPath();
//    ctx.moveTo(x, y);
//    ctx.lineTo(x + size * 2, y);
//    ctx.moveTo(x + size * 2, y);
//    ctx.lineTo(x + size * 2, y - size * 2);
//    ctx.moveTo(x + size * 2, y - size * 2);
//    ctx.lineTo(x + size * 4, y - size * 2);
//    ctx.strokeStyle = "blue";
//    ctx.lineWidth = 3;
//    ctx.stroke();
// }

window.onload = initFiguras();
