/* ==========================================================================
   contacto.js — validación del formulario.

   No hay backend todavía, así que al enviar no se manda nada a ningún lado:
   se valida, se muestra la confirmación y se limpia. Cuando exista el
   endpoint, lo único que cambia es el bloque marcado más abajo.

   La validación se hace a mano en vez de dejársela al navegador porque los
   mensajes nativos salen en el idioma del navegador y con textos genéricos
   tipo "Completa este campo". Aquí cada error dice exactamente qué arreglar.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const formulario = document.getElementById("form-contacto");
  if (!formulario) return;

  const aviso = document.getElementById("form-aviso");

  /* Reglas por campo. Cada una devuelve el mensaje de error, o cadena vacía
     si el valor está bien. Tenerlas juntas hace que agregar un campo nuevo
     sea agregar una línea, no tocar la función de envío. */
  const reglas = {
    nombre: valor => {
      if (!valor) return "Escribe tu nombre.";
      if (valor.length < 3) return "El nombre parece muy corto.";
      return "";
    },

    negocio: valor => {
      if (!valor) return "Dinos cómo se llama tu negocio.";
      return "";
    },

    telefono: valor => {
      if (!valor) return "Necesitamos un teléfono para contactarte.";
      // Se quitan espacios, guiones y paréntesis antes de contar: mucha
      // gente escribe su número como 442 123 45 67 y eso es válido.
      const soloNumeros = valor.replace(/[\s\-()+]/g, "");
      if (!/^\d{10}$/.test(soloNumeros)) return "El teléfono debe tener 10 dígitos.";
      return "";
    },

    correo: valor => {
      // El correo es opcional; si lo dejan vacío, se deja pasar.
      if (!valor) return "";
      // Validación a propósito permisiva: solo confirma que haya algo,
      // arroba, algo, punto y algo. Las expresiones estrictas terminan
      // rechazando correos que sí existen.
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) return "Revisa el correo, parece incompleto.";
      return "";
    },

    mensaje: valor => {
      if (!valor) return "Cuéntanos qué necesitas.";
      if (valor.length < 10) return "Escribe un poco más para saber cómo ayudarte.";
      return "";
    }
  };

  /* Pinta o limpia el error de un campo. El contenedor .campo es el que
     recibe la clase, porque hay que marcar el input y también el texto. */
  function mostrarError(nombreCampo, mensaje){
    const input = formulario.elements[nombreCampo];
    const contenedor = input.closest(".campo");
    const salidaError = contenedor.querySelector(".campo__error");

    salidaError.textContent = mensaje;
    contenedor.classList.toggle("campo--invalido", Boolean(mensaje));

    // aria-invalid le avisa del error a los lectores de pantalla, que no
    // ven el borde rojo.
    input.setAttribute("aria-invalid", mensaje ? "true" : "false");
  }

  function validarCampo(nombreCampo){
    const valor = formulario.elements[nombreCampo].value.trim();
    const mensaje = reglas[nombreCampo](valor);
    mostrarError(nombreCampo, mensaje);
    return !mensaje;
  }

  /* Validar mientras se escribe es molesto: te marca error antes de que
     termines de teclear. Por eso solo se valida al salir del campo (blur),
     y ya después de eso sí se corrige en vivo, para que el error se quite
     en cuanto lo arregles. */
  Object.keys(reglas).forEach(nombreCampo => {
    const input = formulario.elements[nombreCampo];

    input.addEventListener("blur", () => validarCampo(nombreCampo));

    input.addEventListener("input", () => {
      const contenedor = input.closest(".campo");
      if (contenedor.classList.contains("campo--invalido")) validarCampo(nombreCampo);
    });
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // Se validan todos antes de decidir, no con un some() que corta en el
    // primero: así se marcan de una vez todos los campos con problema.
    const resultados = Object.keys(reglas).map(validarCampo);
    const todoBien = resultados.every(Boolean);

    if (!todoBien){
      // Llevar el foco al primer campo con error para no dejar al usuario
      // buscando dónde se equivocó.
      const primerError = formulario.querySelector(".campo--invalido input, .campo--invalido textarea");
      if (primerError) primerError.focus();
      return;
    }

    /* ---- Aquí iría el envío real cuando exista backend ----
       fetch("/api/contacto", { method: "POST", body: new FormData(formulario) })
       Por ahora solo se confirma en pantalla.                                */

    aviso.textContent = "Listo, recibimos tus datos. Te contactamos por teléfono en menos de un día hábil.";
    aviso.hidden = false;

    formulario.reset();

    // El foco se va al aviso para que el lector de pantalla lo lea. El
    // tabindex -1 permite enfocarlo sin meterlo en el orden de tabulación.
    aviso.focus();
  });
});