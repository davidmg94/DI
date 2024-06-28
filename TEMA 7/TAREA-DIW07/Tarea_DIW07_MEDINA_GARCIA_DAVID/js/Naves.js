// CONSTANTES
DIR_IMG = "img/"; // Directorio de las imágenes
LARGO = "600"; // Ancho del canvas
ALTO = "450"; // Alto del canvas
POSX_INICIAL = Math.round(LARGO / 2) - 20; // Posición inicial en X de la nave
POSY_INICIAL = ALTO - 40; // Posición inicial en Y de la nave
JUEGO_FPS = 60; // Fotogramas por segundo del juego

var micanvas; // Variable para el canvas
var contexto; // Contexto del canvas

// Inicialización del espacio de juego
function initSpace() {
   micanvas = document.getElementById("espacio");
   contexto = micanvas.getContext("2d");

   var juego = new Juego(); // Iniciar el juego
}

// Constructor de ManejadorDeEventos
var ManejadorDeEventos = function (nave) {
   this.nave = nave;

   // Función para manejar las teclas presionadas
   this.tecla = function (e) {
      // se obtiene el evento
      var evento = e || window.event;

      // Manejar las teclas presionadas
      switch (evento.keyCode) {
         case 97: // Tecla 'A'
            nave.moverIzquierda();
            break;

         case 100: // Tecla 'D'
            nave.moverDerecha();
            break;

         case 115: // Tecla 'S'
            nave.moverAbajo();
            break;

         case 119: // Tecla 'W'
            nave.moverArriba();
            break;
      }

      return 0;
   };

   // Asignar el evento de teclado al documento
   document.body.addEventListener("keypress", this.tecla);

};

// Constructor de Nave
var Nave = function () {
   // Atributos de la nave
   this.posx = new Number(POSX_INICIAL);
   this.posy = new Number(POSY_INICIAL);
   this.figura = new Image();
   this.figura.src = DIR_IMG + "viper.jpg"; // Imagen de la nave

   // Función para dibujar la nave en el canvas
   this.dibujar = function () {
      var figura = this.getFigura();
      var x = this.getX();
      var y = this.getY();

      // Verificar si las coordenadas son válidas
      if (isNaN(x) || isNaN(y)) {
         x = Math.rint(LARGO / 2) - 20; // redondea al entero mas cercano
         y = ALTO - 40;
      }

      // Dibujar la nave en el canvas
      contexto.drawImage(figura, x, y, 60, 60); // Dibujar la imagen en la posición especificada
   };

   // Función para obtener la posición X de la nave
   this.getX = function () {
      return this.posx;
   };

   // Función para obtener la posición Y de la nave
   this.getY = function () {
      return this.posy;
   };

   // Función para obtener la imagen de la nave
   this.getFigura = function () {
      return this.figura;
   };

   // Función para mover la nave hacia arriba
   this.moverArriba = function () {
      if (this.posy > 0) {
         // Verificar que la nave no esté en el borde superior
         this.posy -= 15; // Mover la nave hacia arriba
      }
   };

   // Función para mover la nave hacia abajo
   this.moverAbajo = function () {
      if (this.posy < ALTO - 40) {
         // Verificar que la nave no esté en el borde inferior
         this.posy += 15; // Mover la nave hacia abajo
      }
   };

   // Función para mover la nave hacia la izquierda
   this.moverIzquierda = function () {
      if (this.posx > 0) {
         // Verificar que la nave no esté en el borde izquierdo
         this.posx -= 15; // Mover la nave hacia la izquierda
      }
   };

   // Función para mover la nave hacia la derecha
   this.moverDerecha = function () {
      if (this.posx < LARGO - 60) {
         // Verificar que la nave no esté en el borde derecho
         this.posx += 15; // Mover la nave hacia la derecha
      }
   };
};

// Función para limpiar el canvas
function limpiar() {
   micanvas.width = micanvas.width;
}

// Constructor de Obstaculo
var Obstaculo = function () {
   this.ancho = Math.random() * 20 + 20; // Ancho aleatorio entre 20 y 40
   this.alto = Math.random() * 20 + 20; // Alto aleatorio entre 20 y 40
   this.posx = Math.random() * (LARGO - this.ancho); // Posición X aleatoria del obstáculo(al restarle el ancho del obstaculo evitamos que se genere en el borde del canvas, lo que hacia que se bloquease y no saliera de esa posicion)
   this.posy = Math.random() * 0; // Posición Y aleatoria del obstáculo (siempre apareceran desde arriba)
   this.velocidadX = (Math.random() - 0.5) * 10; // Velocidad X aleatoria del obstáculo
   this.velocidadY = (Math.random() - 0.5) * 10; // Velocidad Y aleatoria del obstáculo
   this.figura = new Image();
   this.figura.src = DIR_IMG + "obstacle.png"; // Imagen del obstáculo

   // Función para dibujar el obstáculo en el canvas
   this.dibujar = function () {
      contexto.drawImage(this.figura, this.posx, this.posy, this.ancho, this.alto); // Dibujar el obstáculo con tamaño aleatorio
   };

   // Función para mover el obstáculo
   this.mover = function () {
      this.posx += this.velocidadX; // Mover el obstáculo en la dirección X
      this.posy += this.velocidadY; // Mover el obstáculo en la dirección Y

      // Revertir la dirección si el obstáculo alcanza los bordes del canvas
      if (this.posx < 0 || this.posx > LARGO - 30) {
         this.velocidadX = -this.velocidadX;
      }

      if (this.posy < 0 || this.posy > ALTO) {
         this.velocidadY = -this.velocidadY;
      }
   };
};

// Constructor de Juego
var Juego = function () {
   var viper = new Nave(); // Crear una nueva nave

   var manejadornave = new ManejadorDeEventos(viper); // Crear un manejador de eventos para la nave

   var obstaculos = [new Obstaculo(), new Obstaculo(), new Obstaculo(), new Obstaculo()]; // Crear una matriz de obstáculos

   // Función para ejecutar el juego
   this.correr = function () {
      limpiar(); // Limpiar el canvas

      viper.dibujar(); // Dibujar la nave en el canvas

      // Dibujar y mover los obstáculos
      for (var i = 0; i < obstaculos.length; i++) {
         obstaculos[i].mover(); // Mover el obstáculo
         obstaculos[i].dibujar(); // Dibujar el obstáculo en el canvas
         // Verificar colisión entre la nave y los obstáculos
         if (
            viper.getX() < obstaculos[i].posx + obstaculos[i].ancho &&
            viper.getX() + 60 > obstaculos[i].posx &&
            viper.getY() < obstaculos[i].posy + obstaculos[i].alto &&
            60 + viper.getY() > obstaculos[i].posy
         ) {
            // Colisión detectada
            clearInterval(intervalId); // Detener el bucle del juego
            // alert("¡Game Over!"); // Mostrar mensaje de Game Over
            initSpace(); // Reiniciar el juego
         }
      }
   };

   var intervalId = setInterval(this.correr, 1000 / JUEGO_FPS); // Iniciar el bucle del juego con el FPS especificado
};
