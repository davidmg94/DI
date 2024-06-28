function cambiarImagen() {
   let mainImages = document.getElementById("images");
   mainImages.classList.remove("form");
   mainImages.replaceChildren();

   let img = document.createElement("img");
   img.classList.add("gatitos");
   img.src = "img/imagen_retocada.jpg";
   img.style.width = "100%";
   img.style.height = "100%";

   mainImages.append(img);
}

function formulario() {
   let mainImages = document.getElementById("images");
   mainImages.replaceChildren();
   mainImages.classList.add("form");

   mainImages.insertAdjacentHTML(
      "beforeend",
      `<form method="get">
           <div id="form">
               <label for="nombre">Nombre</label>
               <input type="text" id="nombre" name="nombre" required autofocus><br>
               <label for="dni">DNI</label>
               <input type="text" id="dni" name="dni" required><br>
               <label for="nacionalidad">Nacionalidad</label>
               <select id="nacionalidad" name="nacionalidad">
                   <option value="Española" selected>Española</option>
                   <option value="Francesa">Francesa</option>
                   <option value="Inglesa">Inglesa</option>
                   <option value="Otra">Otra</option>
               </select><br>
               <div id="otraNacionalidadDiv" hidden>
                   <label for="otraNacionalidad">Otra Nacionalidad</label>
                   <input type="text" id="otraNacionalidad" name="otraNacionalidad"><br>
               </div>
               <br>
               <input id="enviar" type="submit" value="Enviar">
           </div>
       </form>
       <div id="mensajeExito" hidden>¡Formulario enviado con éxito!</div>`
   );
   const nacionalidadSelect = document.getElementById("nacionalidad");
   if (nacionalidadSelect) {
      nacionalidadSelect.addEventListener("change", () => {
         const selectedNacionalidad = nacionalidadSelect.value;
         const otraNacionalidadDiv = document.getElementById("otraNacionalidadDiv");
         const otraNacionalidad = document.getElementById("otraNacionalidad");

         if (selectedNacionalidad === "Otra") {
            otraNacionalidadDiv.removeAttribute("hidden");
            otraNacionalidad.setAttribute("required", "");
            document.getElementById("mensajeExito").setAttribute("hidden", "");
         } else {
            otraNacionalidadDiv.setAttribute("hidden", "true");
            otraNacionalidad.removeAttribute("required");
            document.getElementById("mensajeExito").setAttribute("hidden", "");
         }
      });
   }
   funcionalidadFormulario();
}

function funcionalidadFormulario() {
   const enviar = document.getElementById("enviar");
   enviar.addEventListener("click", function (event) {
      event.preventDefault();

      validarFormulario();
   });
}

function validarFormulario() {
   let regexNombre = /\S{1,50}/;
   let regexDNI = /\d{8}[A-Za-z]/;

   let nombre = document.getElementById("nombre");
   let dni = document.getElementById("dni");

   if (!regexNombre.test(nombre.value)) {
      alert("Por favor, introduce un nombre válido.");
      return false;
   }

   if (!regexDNI.test(dni.value)) {
      alert("Por favor, introduce un DNI válido.");
      return false;
   }

   let camposObligatorios = document.querySelectorAll("#form [required]");
   for (let campo of camposObligatorios) {
      if (!campo.value) {
         alert(`Por favor, completa el campo "${campo.name}".`);
         return false;
      }
   }
   document.getElementById("mensajeExito").removeAttribute("hidden");
   document.getElementById("mensajeExito").style.color = "white";

   return true;
}
