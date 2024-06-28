// Evento que se ejecuta cuando el contenido del DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => {
   cargarProvinciasYEventos(); // Inicializa la carga de provincias y eventos asociados
   manejarNavegacion(); // Configura la navegación entre secciones del formulario
});

// Función para cargar las provincias y configurar eventos asociados
function cargarProvinciasYEventos() {
   // Objeto que contiene las provincias y sus respectivas ciudades
   const provinciasYciudades = {
      Albacete: ["Albacete", "Hellín", "Almansa"],
      "Ciudad Real": ["Ciudad Real", "Puertollano", "Tomelloso"],
      Cuenca: ["Cuenca", "Tarancón", "Motilla del Palancar"],
      Guadalajara: ["Guadalajara", "Azuqueca de Henares", "Yebes"],
      Toledo: ["Toledo", "Talavera de la Reina", "Illescas"],
      Otra: [],
   };

   const provinciaSelect = document.getElementById("provincia");
   const ciudadSelect = document.getElementById("ciudad");
   const otraCiudad = document.getElementById("otraCiudad");

   // Agrega opciones de provincias al select de provincias
   Object.keys(provinciasYciudades).forEach((provincia) => {
      provinciaSelect.insertAdjacentHTML("beforeend", `<option value="${provincia}">${provincia}</option>`);
   });

   // Evento para actualizar las ciudades según la provincia seleccionada
   provinciaSelect.addEventListener("change", () => {
      const selectedProvincia = provinciaSelect.value;
      ciudadSelect.innerHTML = '<option value="" disabled selected>Selecciona una ciudad</option>';

      if (selectedProvincia === "Otra") {
         // Si se selecciona "Otra", habilitar el campo de otra ciudad y deshabilitar el select de ciudades
         otraCiudad.required = true;
         ciudadSelect.required = false;
         otraCiudad.disabled = false;
         ciudadSelect.disabled = true;
      } else {
         // Si se selecciona una provincia específica, habilitar el select de ciudades y deshabilitar el campo de otra ciudad
         otraCiudad.required = false;
         ciudadSelect.required = true;
         otraCiudad.disabled = true;
         ciudadSelect.disabled = false;
         // Agregar opciones de ciudades al select de ciudades
         provinciasYciudades[selectedProvincia].forEach((ciudad) => {
            ciudadSelect.insertAdjacentHTML("beforeend", `<option value="${ciudad}">${ciudad}</option>`);
         });
      }
   });

   // Evento para habilitar/deshabilitar el botón de envío según la aceptación de términos
   document.getElementById("aceptoTerminos").addEventListener("change", function () {
      document.getElementById("enviarGeneral").disabled = !this.checked;
      document.getElementById("terminos").hidden = this.checked;
   });
}

// Función para mostrar u ocultar elementos
function toggleElementVisibility(element, show) {
   if (show) {
      element.removeAttribute("hidden");
   } else {
      element.setAttribute("hidden", "");
   }
}

// Función para validar el formulario general
function validarFormulario() {
   const regexTelf = /^[6-7]\d{8}$/;
   const regexEmail = /\S+@\S+\.\S+/;
   const email = document.getElementById("email");
   const telefono = document.getElementById("telefono");
   const fechaNac = new Date(document.getElementById("fechaNacimiento").value);
   const fechaActual = new Date();
   const edad =
      fechaActual.getFullYear() -
      fechaNac.getFullYear() -
      (fechaActual.getMonth() < fechaNac.getMonth() || (fechaActual.getMonth() === fechaNac.getMonth() && fechaActual.getDate() < fechaNac.getDate())
         ? 1
         : 0);

   // Validación de edad mínima
   if (edad < 16) {
      alert("Debes tener al menos 16 años para registrarte.");
      return false;
   }

   // Validación de correo electrónico
   if (!regexEmail.test(email.value)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return false;
   }

   // Validación de número de teléfono
   if (!regexTelf.test(telefono.value)) {
      alert("Por favor, introduce un número de teléfono válido que comienza con 6 o 7 y tiene 9 dígitos.");
      return false;
   }

   // Validación de campos obligatorios
   return Array.from(document.querySelectorAll("#infoGeneral [required]")).every((campo) => {
      if (!campo.value) {
         alert(`Por favor, completa el campo "${campo.name}".`);
         return false;
      }
      return true;
   });
}

// Función para validar los datos bancarios
function validarDatosBancarios() {
   const regexNumTarjeta = /^\d{16}$/;
   const regexCaducidad = /^(0[1-9]|1[0-2])\/(\d{2})$/;
   const regexCVV = /^\d{3}$/;
   const numTarjeta = document.getElementById("numTarjeta");
   const fechaCaducidad = document.getElementById("fechaCaducidad");
   const cvv = document.getElementById("cvv");

   const fechaActual = new Date();
   const anoActual = fechaActual.getFullYear().toString().slice(-2);
   const mesActual = fechaActual.getMonth() + 1;

   const [mesCaducidad, anoCaducidad] = fechaCaducidad.value.split("/").map(Number);

   // Validación de número de tarjeta
   if (!regexNumTarjeta.test(numTarjeta.value)) {
      alert("El número de la tarjeta debe tener 16 dígitos.");
      return false;
   }

   // Validación de fecha de caducidad
   if (!regexCaducidad.test(fechaCaducidad.value) || anoCaducidad < anoActual || (anoCaducidad === parseInt(anoActual) && mesCaducidad < mesActual)) {
      alert("Tarjeta caducada.");
      return false;
   }

   // Validación de CVV
   if (!regexCVV.test(cvv.value)) {
      alert("El CVV debe tener 3 dígitos. (Consulte el reverso de su tarjeta).");
      return false;
   }

   // Validación de campos obligatorios
   return Array.from(document.querySelectorAll("#infoBancaria [required]")).every((campo) => {
      if (!campo.value) {
         alert(`Por favor, completa el campo "${campo.name}".`);
         return false;
      }
      return true;
   });
}

// Función para manejar la navegación entre secciones del formulario
function manejarNavegacion() {
   document.getElementById("enviarGeneral").addEventListener("click", function (event) {
      event.preventDefault();

      if (validarFormulario()) {
         mostrarSeccionInfoBancaria();
      }
   });

   document.getElementById("infoBancaria").addEventListener("click", function (event) {
      if (event.target && event.target.id === "enviarBanco") {
         event.preventDefault();

         if (validarDatosBancarios()) {
            mostrarUsuarioRegistrado();
         }
      }
   });

   document.getElementById("usuarioRegistrado").addEventListener("click", function (event) {
      if (event.target && event.target.id === "volverFormulario") {
         event.preventDefault();

         mostrarSeccionGeneral();
      }
   });
}

// Función para mostrar la sección de información bancaria
function mostrarSeccionInfoBancaria() {
   const infoBancaria = document.getElementById("infoBancaria");
   infoBancaria.replaceChildren();
   infoBancaria.insertAdjacentHTML(
      "beforeend",
      `
        <form id="formularioBanco">
            <h2>Datos Bancarios</h2>
            <fieldset>
                <legend>Información bancaria</legend>

                <label for="numTarjeta">Número de Tarjeta:</label>
                <input type="text" id="numTarjeta" name="numTarjeta" placeholder="16 dígitos" required autofocus>
            
                <label for="nombreTitular">Nombre del Titular:</label>
                <input type="text" id="nombreTitular" name="nombreTitular" required>
                
                <label for="fechaCaducidad">Fecha de Caducidad (MM/YY):</label>
                <input type="text" id="fechaCaducidad" name="fechaCaducidad" placeholder="MM/YY" required>
                
                <label for="cvv">CVV (Código de Seguridad):<span title="El CVV es un código de 3 dígitos en la parte posterior de tu tarjeta." class="ayuda"></span></label>
                <input type="text" id="cvv" name="cvv" placeholder="3 dígitos" required>
                
            </fieldset>

            <div id="botonesBanco">
                <input id="enviarBanco" type="submit" value="Enviar">
                <input id="resetBanco" type="reset" value="Limpiar formulario">
            </div>
        </form>
    `
   );

   toggleElementVisibility(document.getElementById("infoGeneral"), false);
   toggleElementVisibility(infoBancaria, true);
}

// Función para mostrar la sección de usuario registrado con éxito
function mostrarUsuarioRegistrado() {
   const usuarioRegistrado = document.getElementById("usuarioRegistrado");
   usuarioRegistrado.innerHTML = `
        <div id="usuarioRegistrado">
            <h1>Usuario registrado con éxito.</h1>
            <input id="volverFormulario" type="submit" value="Volver a inicio">
        </div>
    `;

   toggleElementVisibility(document.getElementById("infoBancaria"), false);
   toggleElementVisibility(usuarioRegistrado, true);
}

// Función para volver a mostrar la sección general del formulario
function mostrarSeccionGeneral() {
   toggleElementVisibility(document.getElementById("infoGeneral"), true);
   toggleElementVisibility(document.getElementById("infoBancaria"), false);
   toggleElementVisibility(document.getElementById("usuarioRegistrado"), false);
}
