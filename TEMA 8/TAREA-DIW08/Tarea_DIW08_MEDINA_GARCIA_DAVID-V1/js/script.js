// Llamar a las funciones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
   cargarCiudades(); // Carga las ciudades según la provincia seleccionada
   manejarNavegacion(); // Inicia la gestión de navegación entre secciones del formulario
});

// Función para cargar las ciudades según la provincia seleccionada
function cargarCiudades() {
   // Objeto que mapea provincias con sus respectivas ciudades
   const ciudadesPorProvincia = {
      Albacete: ["Albacete", "Hellín", "Almansa"],
      "Ciudad Real": ["Ciudad Real", "Puertollano", "Tomelloso"],
      Cuenca: ["Cuenca", "Tarancón", "Motilla del Palancar"],
      Guadalajara: ["Guadalajara", "Azuqueca de Henares", "Yebes"],
      Toledo: ["Toledo", "Talavera de la Reina", "Illescas"],
      Otra: [],
   };
   // Recogemos los elementos del DOM
   const provinciaSelect = document.getElementById("provincia");
   const ciudadSelect = document.getElementById("ciudad");
   const campoOtra = document.getElementById("campoOtra");
   const ciudades = document.getElementById("ciudades");
   const otraNacionalidad = document.getElementById("otraNacionalidad");

   // Iterar sobre las ciudades de la provincia seleccionada y crear las opciones
   Object.keys(ciudadesPorProvincia).forEach((provincia) => {
      const option = document.createElement("option");
      option.value = provincia;
      option.textContent = provincia;
      provinciaSelect.appendChild(option);
   });

   // Agregar un event listener para detectar cambios en la selección de provincia
   provinciaSelect.addEventListener("change", () => {
      // Obtener la provincia seleccionada
      const selectedProvincia = provinciaSelect.value;
      // Limpiar el select de ciudades y añadir opción por defecto
      ciudadSelect.innerHTML = '<option value="" disabled selected>Selecciona una ciudad</option>';
      if (selectedProvincia === "Otra") {
         ciudadSelect.removeAttribute("required");
         ciudades.setAttribute("hidden", "");
         otraNacionalidad.setAttribute("required", "");
         campoOtra.removeAttribute("hidden"); // Mostrar el campo de otra nacionalidad
      } else {
         campoOtra.setAttribute("hidden", "");
         otraNacionalidad.removeAttribute("required"); // Mostrar el campo de otra nacionalidad
         ciudades.removeAttribute("hidden"); // Mostrar el campo de otra nacionalidad
         ciudadSelect.setAttribute("required", "");

         // Iterar sobre las ciudades de la provincia seleccionada y crear las opciones
         ciudadesPorProvincia[selectedProvincia].forEach((ciudad) => {
            const option = document.createElement("option");
            option.value = ciudad;
            option.textContent = ciudad;
            ciudadSelect.appendChild(option);
         });
      }
   });
}

// Agregar un event listener para el checkbox de aceptación de términos
document.getElementById("aceptoTerminos").addEventListener("change", function () {
   // Deshabilitar el botón de enviar si el checkbox no está marcado
   document.getElementById("enviarGeneral").disabled = !this.checked;
   document.getElementById("terminos").hidden = this.checked;
});

// Función para validar los campos del formulario
function validarFormulario() {
   // Expresiones regulares para validar email y teléfono
   let regexTelf = /^[6-7]\d{8}$/;
   let regexEmail = /\S+@\S+\.\S+/;

   // Obtiene los elementos del formulario
   let email = document.getElementById("email");
   let telefono = document.getElementById("telefono");
   let fechaNac = document.getElementById("fechaNacimiento");
   fechaNac = new Date(fechaNac.value);

   // Obtiene la fecha actual
   let fechaActual = new Date();
   let diferenciaEnAños = fechaActual.getFullYear() - fechaNac.getFullYear();

   // Ajusta la diferencia en años si aún no ha llegado el cumpleaños de este año
   if (
      fechaActual.getMonth() < fechaNac.getMonth() ||
      (fechaActual.getMonth() == fechaNac.getMonth() && fechaActual.getDate() < fechaNac.getDate())
   ) {
      diferenciaEnAños--;
   }

   // Comprueba si la diferencia en años es mdenor que 16
   if (diferenciaEnAños < 16) {
      alert("Debes tener al menos 16 años para registrarte.");
      return false;
   }

   // Comprueba si el valor del email coincide con la expresión regular
   if (!regexEmail.test(email.value)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return false;
   }

   // Comprueba si el valor del teléfono coincide con la expresión regular
   if (!regexTelf.test(telefono.value)) {
      alert("Por favor, introduce un número de teléfono válido que comienza con 6 o 7 y tiene 9 dígitos.");
      return false;
   }

   // Validar campos obligatorios
   let camposObligatorios = document.querySelectorAll("#infoGeneral [required]");
   for (let campo of camposObligatorios) {
      if (!campo.value) {
         alert(`Por favor, completa el campo "${campo.name}".`);
         return false;
      }
   }
   return true;
}

// Función para validar los datos bancarios
function validarDatosBancarios() {
   // Expresiones regulares para validar el número de tarjeta, la fecha de caducidad y el CVV
   let regexNumTarjeta = /\d{16}/;
   let regexCaducidad = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
   let regexCVV = /\d{3}/;

   // Obtiene los elementos del formulario
   let numTarjeta = document.getElementById("numTarjeta");
   let fechaCaducidad = document.getElementById("fechaCaducidad");
   let cvv = document.getElementById("cvv");

   // Obtiene la fecha actual
   let fechaActual = new Date();
   let ultimasCifrasAno = fechaActual.getFullYear().toString().slice(-2);
   let ultimasCifrasCaducidad = fechaCaducidad.value.slice(-2);
   let mesActual = parseInt(fechaActual.getMonth()) + 1;
   let mesCaducidad = parseInt(fechaCaducidad.value.slice(0, 2));

   // Valida el número de tarjeta
   if (!regexNumTarjeta.test(numTarjeta.value)) {
      alert("El numero de la tarjeta debe tener 16 digitos.");
      return false;
   }

   // Valida la fecha de caducidad
   if (
      !regexCaducidad.test(fechaCaducidad.value) ||
      ultimasCifrasCaducidad < ultimasCifrasAno ||
      (ultimasCifrasCaducidad === ultimasCifrasAno && mesCaducidad < mesActual)
   ) {
      alert("Tarjeta caducada.");
      return false;
   }

   // Valida el CVV
   if (!regexCVV.test(cvv.value)) {
      alert("El CVV debe tener 3 digitos. (Consulte el reverso de su tarjeta).");
      return false;
   }
   // Validar campos obligatorios
   let camposObligatorios = document.querySelectorAll("#infoBancaria [required]");
   for (let campo of camposObligatorios) {
      if (!campo.value) {
         alert(`Por favor, completa el campo "${campo.name}".`);
         return false;
      }
   }
   return true;
}

// Función para manejar la navegación entre secciones del formulario
function manejarNavegacion() {
   // Obtiene las referencias a las secciones del formulario
   let infoGeneral = document.getElementById("infoGeneral");
   let infoBancaria = document.getElementById("infoBancaria");
   let usuarioRegistrado = document.getElementById("usuarioRegistrado");

   // Mostrar formulario de datos bancarios al enviar el formulario general
   let botonGeneral = document.getElementById("enviarGeneral");
   botonGeneral.addEventListener("click", function (event) {
      event.preventDefault(); // Evita el comportamiento predeterminado del botón (enviar el formulario)

      // Si la validación del formulario general es exitosa
      if (validarFormulario()) {
         // Oculta la sección de información general y muestra la sección de información bancaria
         infoGeneral.setAttribute("hidden", "");
         infoBancaria.removeAttribute("hidden");
      }
   });

   // Volver al formulario general desde el formulario de datos bancarios
   let botonBanco = document.getElementById("enviarBanco");
   botonBanco.addEventListener("click", function (event) {
      event.preventDefault(); // Evita el comportamiento predeterminado del botón (enviar el formulario)

      // Si la validación de los datos bancarios es exitosa
      if (validarDatosBancarios()) {
         // Oculta la sección de información bancaria y muestra la sección de usuario registrado
         infoBancaria.setAttribute("hidden", "");
         usuarioRegistrado.removeAttribute("hidden");
      }
   });

   // Volver al formulario general desde la sección de usuario registrado
   let botonVolver = document.getElementById("volverFormulario");
   botonVolver.addEventListener("click", function (event) {
      event.preventDefault(); // Evita el comportamiento predeterminado del botón (enviar el formulario)

      // Oculta la sección de usuario registrado y muestra la sección de información general
      usuarioRegistrado.setAttribute("hidden", "");
      infoGeneral.removeAttribute("hidden");
   });
}


