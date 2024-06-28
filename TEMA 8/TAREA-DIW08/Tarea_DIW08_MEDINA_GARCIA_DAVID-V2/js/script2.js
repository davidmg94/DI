document.addEventListener("DOMContentLoaded", () => {
    cargarProvincias(); // Carga las provincias en el select
    cargarCiudades(); // Carga las ciudades según la provincia seleccionada
    manejarNavegacion(); // Inicia la gestión de navegación entre secciones del formulario
});

// Función para cargar las provincias en el select
function cargarProvincias() {
    const provincias = ["Albacete", "Ciudad Real", "Cuenca", "Guadalajara", "Toledo", "Otra"];
    const provinciaSelect = document.getElementById("provincia");

    provincias.forEach((provincia) => {
        const option = document.createElement("option");
        option.value = provincia;
        option.textContent = provincia;
        provinciaSelect.appendChild(option);
    });
}

// Función para cargar las ciudades según la provincia seleccionada
function cargarCiudades() {
    const ciudadesPorProvincia = {
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

    // Evento para cargar ciudades según la provincia seleccionada
    provinciaSelect.addEventListener("change", () => {
        const selectedProvincia = provinciaSelect.value;

        ciudadSelect.innerHTML = '<option value="" disabled selected>Selecciona una ciudad</option>';
        if (selectedProvincia === "Otra") {
            ciudadSelect.removeAttribute("required");
            ciudadSelect.setAttribute("disabled", "");
            otraCiudad.setAttribute("required", "");
            otraCiudad.removeAttribute("disabled");
        } else {
            otraCiudad.removeAttribute("required");
            otraCiudad.setAttribute("disabled", "");

            ciudadSelect.setAttribute("required", "");
            ciudadSelect.removeAttribute("disabled");

            ciudadesPorProvincia[selectedProvincia].forEach((ciudad) => {
                const option = document.createElement("option");
                option.value = ciudad;
                option.textContent = ciudad;
                ciudadSelect.appendChild(option);
            });
        }
    });
}

// Habilitar/deshabilitar el botón de envío según la aceptación de términos
document.getElementById("aceptoTerminos").addEventListener("change", function () {
    document.getElementById("enviarGeneral").disabled = !this.checked;
    document.getElementById("terminos").hidden = this.checked;
});

// Función para validar el formulario general
function validarFormulario() {
    let regexTelf = /^[6-7]\d{8}$/;
    let regexEmail = /\S+@\S+\.\S+/;

    let email = document.getElementById("email");
    let telefono = document.getElementById("telefono");
    let fechaNac = document.getElementById("fechaNacimiento");
    fechaNac = new Date(fechaNac.value);

    let fechaActual = new Date();
    let diferenciaEnAños = fechaActual.getFullYear() - fechaNac.getFullYear();

    if (fechaActual.getMonth() < fechaNac.getMonth() || (fechaActual.getMonth() == fechaNac.getMonth() && fechaActual.getDate() < fechaNac.getDate())) {
        diferenciaEnAños--;
    }

    if (diferenciaEnAños < 16) {
        alert("Debes tener al menos 16 años para registrarte.");
        return false;
    }

    if (!regexEmail.test(email.value)) {
        alert("Por favor, introduce un correo electrónico válido.");
        return false;
    }

    if (!regexTelf.test(telefono.value)) {
        alert("Por favor, introduce un número de teléfono válido que comienza con 6 o 7 y tiene 9 dígitos.");
        return false;
    }

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
    let regexNumTarjeta = /\d{16}/;
    let regexCaducidad = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    let regexCVV = /\d{3}/;

    let numTarjeta = document.getElementById("numTarjeta");
    let fechaCaducidad = document.getElementById("fechaCaducidad");
    let cvv = document.getElementById("cvv");

    let fechaActual = new Date();
    let ultimasCifrasAno = fechaActual.getFullYear().toString().slice(-2);
    let ultimasCifrasCaducidad = fechaCaducidad.value.slice(-2);
    let mesActual = parseInt(fechaActual.getMonth()) + 1;
    let mesCaducidad = parseInt(fechaCaducidad.value.slice(0, 2));

    if (!regexNumTarjeta.test(numTarjeta.value)) {
        alert("El numero de la tarjeta debe tener 16 digitos.");
        return false;
    }

    if (!regexCaducidad.test(fechaCaducidad.value) || ultimasCifrasCaducidad < ultimasCifrasAno || (ultimasCifrasCaducidad === ultimasCifrasAno && mesCaducidad < mesActual)) {
        alert("Tarjeta caducada.");
        return false;
    }

    if (!regexCVV.test(cvv.value)) {
        alert("El CVV debe tener 3 dígitos. (Consulte el reverso de su tarjeta).");
        return false;
    }

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
    let infoGeneral = document.getElementById("infoGeneral");
    let infoBancaria = document.getElementById("infoBancaria");
    let usuarioRegistrado = document.getElementById("usuarioRegistrado");

    let botonGeneral = document.getElementById("enviarGeneral");
    botonGeneral.addEventListener("click", function (event) {
        event.preventDefault();

        if (validarFormulario()) {
            infoGeneral.setAttribute("hidden", "");
            infoBancaria.removeAttribute("hidden");
        }
    });

    let botonBanco = document.getElementById("enviarBanco");
    botonBanco.addEventListener("click", function (event) {
        event.preventDefault();

        if (validarDatosBancarios()) {
            infoBancaria.setAttribute("hidden", "");
            usuarioRegistrado.removeAttribute("hidden");
        }
    });

    let botonVolver = document.getElementById("volverFormulario");
    botonVolver.addEventListener("click", function (event) {
        event.preventDefault();

        usuarioRegistrado.setAttribute("hidden", "");
        infoGeneral.removeAttribute("hidden");
    });
}
