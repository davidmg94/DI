// Array de objetos que contiene información sobre los audios
let audioInfo = [
   // Cada objeto contiene la ruta del archivo (src), el nombre, el formato, la frecuencia y el link de descarga
   {
      src: "audios/Alone_-_Color_Out.mp3",
      name: "Alone",
      format: "MP3",
      frequency: "44.1kHz",
      link: "https://www.jamendo.com/track/1886257/alone",
   },
   {
      src: "audios/LEEONA_-_LEEONA_-_Do_I.wav",
      name: "LEEONA - Do I",
      format: "WAV",
      frequency: "32kHz",
      link: "https://www.jamendo.com/track/2135375/leeona-do-i",
   },
   {
      src: "audios/No_Rest_Or_Endless_Rest_-_Lisofv.ogg",
      name: "No Rest Or Endless Rest",
      format: "OGG",
      frequency: "22.05kHz",
      link: "https://www.jamendo.com/track/1882761/no-rest-or-endless-rest",
   },
   {
      src: "audios/Tab_-_Sake_Bomb_(feat._Jade_Gritty_&amp;_Aurc).flac",
      name: "Sake Bomb (feat. Jade Gritty & Aurc)",
      format: "FLAC",
      frequency: "88.2kHz",
      link: "https://www.jamendo.com/track/2016794/sake-bomb-feat-jade-gritty-and-aurc",
   },
   {
      src: "audios/The_Deep_-_Anitek.aiff",
      name: "The Deep",
      format: "AIFF",
      frequency: "96kHz",
      link: "https://www.jamendo.com/track/1884527/the-deep",
   },
];

// Función para cargar los audios en la página
function loadAudios() {
   // Obtiene el elemento principal del DOM
   let mainContent = document.getElementById("main-content");
   // Limpia el contenido existente
   mainContent.replaceChildren();
   // Crea un nuevo elemento de lista
   let ulElement = document.createElement("ul");
   ulElement.classList.add("audios");
   // Añade el elemento de lista al contenido principal
   mainContent.appendChild(ulElement);

   // Recorre cada objeto en el array audioInfo
   for (let i = 0; i < audioInfo.length; i++) {
      // Crea un nuevo elemento de lista y un elemento de audio
      let listItem = document.createElement("li");
      let audio = document.createElement("audio");
      // Configura el elemento de audio
      audio.controls = true;
      audio.src = audioInfo[i].src;

      // Añade información sobre el audio al elemento de lista
      listItem.innerHTML += "<strong>Cancion</strong>: " + audioInfo[i].name + "<br>";
      // Comprueba si el formato es AIFF
      if (audioInfo[i].format === "AIFF") {
         // Como el navegador no soporta el formato AIFF, lanzamos un mensaje de error
         listItem.innerHTML += "ERROR! El formato AIFF no es soportado por todos los navegadores.";
      } else {
         // Si no es AIFF, añade el elemento de audio al elemento de lista
         listItem.appendChild(audio);
      }

      // Añade más información sobre el audio al elemento de lista
      listItem.innerHTML += "<br> Formato: " + audioInfo[i].format + ", Frecuencia: " + audioInfo[i].frequency;

      // Añade el elemento de lista al elemento de lista principal
      ulElement.appendChild(listItem);
   }
   loadLinks();
}

// Función para cargar los enlaces en el aside
function loadLinks() {
   // Obtener el elemento aside donde irán los enlaces y borramos su contenido
   let links = document.getElementById("enlaces");
   links.replaceChildren();
   let descargas = document.createElement("div");
   descargas.classList.add("descargas");
   descargas.innerHTML = "Descargas";

   links.append(descargas);
   // Crea un nuevo elemento de lista desordenada para los enlaces
   let ulLinks = document.createElement("ul");
   // Añade la lista desordenada de enlaces al aside
   links.appendChild(ulLinks);
   // Recorre cada objeto en el array audioInfo
   for (let i = 0; i < audioInfo.length; i++) {
      // Añade el enlace al elemento de lista desordenada
      let liLink = document.createElement("li");

      // Añade el enlace al elemento de lista en el aside
      let linkElement = document.createElement("a");
      linkElement.classList.add("links");
      
      linkElement.href = audioInfo[i].link;
      linkElement.innerHTML = audioInfo[i].name;
      linkElement.target = "_blank";
      
      liLink.appendChild(linkElement);
      ulLinks.appendChild(liLink);
   }
}

// Array de objetos que contiene información sobre los videos
let videoInfo = [{ name: "Tarea 06 - David Medina Garcia", src: "videos/video.mp4", format: "MP4" }];

// Función para cargar los videos en la página
function loadVideo() {
   // Obtiene el elemento links donde estan los enlaces y borra el contenido
   let links = document.getElementById("enlaces");
   links.replaceChildren();

   // Obtiene el elemento principal del DOM
   let mainContent = document.getElementById("main-content");
   // Limpia el contenido existente
   mainContent.replaceChildren();
   // Crea un nuevo elemento de lista
   let ulElement = document.createElement("ul");
   ulElement.classList.add("videos");
   // Añade el elemento de lista al contenido principal
   mainContent.appendChild(ulElement);

   // Recorre cada objeto en el array videoInfo
   for (let i = 0; i < videoInfo.length; i++) {
      // Crea un nuevo elemento de lista y un elemento de video

      let listItem = document.createElement("li");
      listItem.innerHTML += " <strong>Video</strong>: " + videoInfo[i].name;
      let video = document.createElement("video");
      // Configura el elemento de video
      video.controls = true;
      video.src = videoInfo[i].src;
      // Añade el elemento de video al elemento de lista
      listItem.appendChild(video);
      // Añade el elemento de lista al elemento de lista principal
      ulElement.appendChild(listItem);
   }
}

// Función para cargar la página de inicio
function loadInicio() {
   // Obtiene el elemento links donde estan los enlaces y borra el contenido
   let links = document.getElementById("enlaces");
   links.replaceChildren();

   // Obtiene el elemento principal del DOM
   let mainContent = document.getElementById("main-content");
   // Limpia el contenido existente
   mainContent.replaceChildren();

   // Crea nuevos elementos de encabezado
   let h4Element = document.createElement("h4");
   h4Element.innerHTML = "Pulse en uno de los enlaces de la izquierda<br><br>para cargar contenido multimedia ";
   // Añade el encabezado al contenido principal
   mainContent.appendChild(h4Element);
}

// Función para cargar la matriz en el área principal
function loadContentMatriz() {
   // Obtiene el elemento main-content donde se mostrará la matriz
   let mainContent = document.getElementById("main-content");
   mainContent.replaceChildren();
   mainContent.innerHTML = '<canvas id="matriz" width="400" height="400"></canvas>'; // Agrega un canvas para la matriz

   initMatriz(); // Inicializa la matriz
}

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

window.onload = loadInicio;
