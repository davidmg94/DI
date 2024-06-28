function initFiguras() {
   // Obtener el canvas y el contexto 2D
   canvas = document.getElementById("figuras");
   ctx = canvas.getContext("2d");

   // Llamar a las funciones para dibujar las figuras
   apartado1(100, 100, 50, Math.PI, 2 * Math.PI, false); // Dibujar el primer conjunto de arcos
   apartado2(450, 150, 100, 0, 2 * Math.PI); // Dibujar el segundo conjunto de arcos
   apartado3(120, 350, 100, 100, ctx); // Llamar a la función apartado3 con el contexto
   apartado3Size(300, 350, 100, 100, 100, ctx); // Llamar a la función apartadoSize con el contexto
   apartado4(480, 350, 100, 100, ctx); // Llamar a la función apartado4 con el contexto
}
// arcos
function apartado1(cx, cy, r, sa, ea, orientation) {
   // Arco 1
   ctx.save(); // Guardar el estado del contexto
   ctx.beginPath(); // Comenzar un nuevo trazado
   ctx.arc(cx, cy, r, sa, ea, orientation); // Dibujar un arco
   ctx.strokeStyle = "red"; // Establecer el color del trazo
   ctx.stroke(); // Dibujar el trazo
   ctx.restore(); // Restaurar el estado del contexto

   // Arco 2
   ctx.save(); // Guardar el estado del contexto
   ctx.beginPath(); // Comenzar un nuevo trazado
   ctx.arc(cx + r * 2, cy, r, sa, ea, orientation); // Dibujar un arco
   ctx.fillStyle = "blue"; // Establecer el color de relleno
   ctx.fill(); // Rellenar el arco
   ctx.restore(); // Restaurar el estado del contexto

   // Arco 3
   ctx.save(); // Guardar el estado del contexto
   ctx.beginPath(); // Comenzar un nuevo trazado
   orientation = true; // Cambiar la orientación
   ctx.arc(cx, cy + r * 2, r, sa, ea, orientation); // Dibujar un arco
   ctx.strokeStyle = "green"; // Establecer el color del trazo
   ctx.stroke(); // Dibujar el trazo
   ctx.restore(); // Restaurar el estado del contexto

   // Arco 4
   ctx.save(); // Guardar el estado del contexto
   ctx.beginPath(); // Comenzar un nuevo trazado
   ctx.arc(cx + r * 2, cy + r * 2, r, sa, ea * 1.5); // Dibujar un arco
   ctx.fillStyle = "yellow"; // Establecer el color de relleno
   ctx.fill(); // Rellenar el arco
   ctx.restore(); // Restaurar el estado del contexto
}
// circulo
function apartado2(cx, cy, r, sa, ea) {
   ctx.save(); // Guardar el estado del contexto
   ctx.beginPath(); // Comenzar un nuevo trazado
   ctx.arc(cx, cy, r, sa, ea); // Dibujar un arco
   // gradiente radial
   let gradient = ctx.createRadialGradient(cx, cy, r * 0.15, cx, cy, r); // Crear un gradiente radial
   // gradiente vertical
   // let gradient = ctx.createLinearGradient(cx, cy - r, cx, cy + r);
   // gradiente horizontal
   // let gradient = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
   // gradiente diagonal
   // let gradient = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);

   gradient.addColorStop(0, "red"); // Agregar un color al gradiente
   gradient.addColorStop(1, "purple"); // Agregar otro color al gradiente
   ctx.fillStyle = gradient; // Establecer el gradiente como color de relleno
   ctx.fill(); // Rellenar el arco con el gradiente
   ctx.restore(); // Restaurar el estado del contexto
}

// cuadrado gradiente en cuadrado (son size, el gradiente es independiente)
function apartado3Size(cx, cy, size, width, height, ctx) {
   ctx.save(); // Guardar el estado del contexto
   ctx.beginPath(); // Comenzar un nuevo trazado

   // Calcular las coordenadas de los vértices del rectángulo
   var x = cx - width / 2;
   var y = cy - height / 2;

   // Dibujar el rectángulo
   ctx.rect(x, y, width, height);

   // Crear un gradiente radial
   var gradient = ctx.createRadialGradient(cx, cy, size * 0.15, cx, cy, size);
   gradient.addColorStop(0, "red"); // Agregar un color al gradiente
   gradient.addColorStop(0.5, "purple"); // Agregar otro color al gradiente

   // Establecer el gradiente como color de relleno
   ctx.fillStyle = gradient;
   ctx.fill(); // Rellenar el cuadrado con el gradiente

   ctx.restore(); // Restaurar el estado del contexto
}

// cuadrado gradiente en cuadrado (sin size, escala el gradiente con la figura)
function apartado3(cx, cy, width, height, ctx) {
   ctx.save(); // Guardar el estado del contexto
   ctx.beginPath(); // Comenzar un nuevo trazado

   // Calcular las coordenadas de los vértices del rectángulo
   var x = cx - width / 2;
   var y = cy - height / 2;

   // Dibujar el rectángulo
   ctx.rect(x, y, width, height);

   // para hacer un rombo
   // var halfWidth = width / 2;
   // var halfHeight = height / 2;

   // // Dibujar el rombo
   // ctx.moveTo(cx, cy - halfHeight); // Vértice superior
   // ctx.lineTo(cx + halfWidth, cy); // Vértice derecho
   // ctx.lineTo(cx, cy + halfHeight); // Vértice inferior
   // ctx.lineTo(cx - halfWidth, cy); // Vértice izquierdo

   ctx.closePath(); // Cerrar el trazado
   // Crear un gradiente radial
   var gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height));
   // Crear un gradiente diagonal
   //   var gradient = ctx.createLinearGradient(x, y, x + width, y + height);
   // Crear un gradiente verical
   // var gradient = ctx.createLinearGradient(cx, y, cx, y + height);
   // Crear un gradiente horizontal
   // var gradient = ctx.createLinearGradient(x, cy, x + width, cy);
   gradient.addColorStop(0, "red"); // Agregar un color al gradiente
   gradient.addColorStop(0.5, "purple"); // Agregar otro color al gradiente

   // Establecer el gradiente como color de relleno
   ctx.fillStyle = gradient;
   ctx.fill(); // Rellenar el cuadrado con el gradiente

   ctx.restore(); // Restaurar el estado del contexto
}

// gradientes en triangulo
function apartado4(cx, cy, width, height, ctx) {
   ctx.save(); // Guardar el estado del contexto
   ctx.beginPath(); // Comenzar un nuevo trazado

   // Calcular las coordenadas de los vértices del triángulo
   var x1 = cx - width / 2;
   var y1 = cy + height / 2;
   var x2 = cx + width / 2;
   var y2 = cy + height / 2;
   var x3 = cx;
   var y3 = cy - height / 2;

   // Dibujar el triángulo
   ctx.moveTo(x1, y1);
   ctx.lineTo(x2, y2);
   ctx.lineTo(x3, y3);
   ctx.closePath();

   // Crear un gradiente radial
     var gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height));
   // Crear un gradiente diagonal
   //    var gradient = ctx.createLinearGradient(x1, y1, x2, y3);
   // Crear un gradiente vertical
   //   var gradient = ctx.createLinearGradient(cx, y1, cx, y3);
   // Crear un gradiente horizontal
   // var gradient = ctx.createLinearGradient(x1, cy, x2, cy);
   gradient.addColorStop(0, "red"); // Agregar un color al gradiente
   gradient.addColorStop(0.5, "purple"); // Agregar otro color al gradiente
   // Establecer el gradiente como color de relleno
   ctx.fillStyle = gradient;
   ctx.fill(); // Rellenar el triángulo con el gradiente

   ctx.restore(); // Restaurar el estado del contexto
}
