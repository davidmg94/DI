function initMatriz() {
   // Obtener el canvas y el contexto 2D
   canvas = document.getElementById("matriz");
   ctx = canvas.getContext("2d");

   // Dibujar la matriz de cruces
   drawCrossMatriz(30);
}

function drawSingleCross(ctx, x, y, size) {
   // Dibujar una cruz simple en el contexto dado
   ctx.beginPath(); // Comenzar un nuevo trazado
   ctx.moveTo(x - size / 2, y); // Mover el lápiz a la posición inicial en la parte izquierda de la cruz
   ctx.lineTo(x + size / 2, y); // Dibujar una línea horizontal en la parte derecha de la cruz
   ctx.moveTo(x, y - size / 2); // Mover el lápiz a la posición inicial en la parte superior de la cruz
   ctx.lineTo(x, y + size / 2); // Dibujar una línea vertical en la parte inferior de la cruz
   ctx.strokeStyle = "blue"; // Establecer el color del trazo
   ctx.lineWidth = 1; // Establecer el grosor del trazo
   ctx.stroke(); // Dibujar el trazo
}

function createCrossPattern(size) {
   // Crear un patrón de cruz repetido
   var patternCanvas = document.createElement("canvas"); // Crear un nuevo elemento canvas
   var patternCtx = patternCanvas.getContext("2d"); // Obtener el contexto 2D del canvas creado

   // Establecer el tamaño del canvas
   patternCanvas.width = size;
   patternCanvas.height = size;

   // Dibujar una cruz simple en el canvas
   drawSingleCross(patternCtx, size / 2, size / 2, size);

   // Crear un patrón de repetición con el canvas dibujado
   return ctx.createPattern(patternCanvas, "repeat");
}

function drawCrossMatriz(crossSize) {
   // Dibujar la matriz de cruces en el canvas
   var pattern = createCrossPattern(crossSize); // Crear el patrón de cruz repetido
   var matrizCanvas = document.getElementById("matriz"); // Obtener el canvas de la matriz
   var matrizCtx = matrizCanvas.getContext("2d"); // Obtener el contexto 2D del canvas de la matriz

   // Establecer el patrón de cruz como color de relleno y dibujar un rectángulo que ocupe todo el canvas
   matrizCtx.fillStyle = pattern;
   matrizCtx.fillRect(0, 0, matrizCanvas.width, matrizCanvas.height);
}

