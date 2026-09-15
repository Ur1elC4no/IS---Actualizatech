/* ==========================================================================
   main.js — comportamiento compartido por todas las páginas.

   Cada bloque revisa primero si su elemento existe en la página actual,
   porque este archivo se carga en las cuatro y no todas tienen todo.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Tema claro / oscuro

   Por defecto manda el sistema operativo (eso lo resuelve el CSS solito con
   prefers-color-scheme). El botón solo entra cuando el usuario quiere lo
   contrario a lo que trae su equipo, y esa decisión se guarda para la
   próxima visita.

   La preferencia se guarda en localStorage. Si el navegador lo tiene
   bloqueado (modo incógnito estricto, por ejemplo), el try/catch evita que
   se caiga todo el script.
   -------------------------------------------------------------------------- */
const LLAVE_TEMA = "actualizatech-tema";

function leerTemaGuardado(){
  try {
    return localStorage.getItem(LLAVE_TEMA);
  } catch (e) {
    return null;
  }
}

function guardarTema(valor){
  try {
    localStorage.setItem(LLAVE_TEMA, valor);
  } catch (e) {
    // Sin localStorage el tema igual funciona, nada más no se recuerda.
  }
}

/* Qué se está viendo ahora mismo: lo que el usuario eligió, o si no eligió
   nada, lo que diga el sistema. */
function temaActual(){
  const elegido = document.documentElement.getAttribute("data-tema");
  if (elegido) return elegido;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "oscuro" : "claro";
}

function aplicarTema(tema){
  document.documentElement.setAttribute("data-tema", tema);
  guardarTema(tema);

  // El botón anuncia a dónde te lleva, no dónde estás. Para quien usa lector
  // de pantalla, "cambiar a tema claro" es más útil que "tema oscuro".
  const boton = document.querySelector(".tema");
  if (boton){
    const destino = tema === "oscuro" ? "claro" : "oscuro";
    boton.setAttribute("aria-label", "Cambiar a tema " + destino);
  }
}

// Restaurar la elección previa apenas carga, antes de que se vea la página.
const temaGuardado = leerTemaGuardado();
if (temaGuardado) aplicarTema(temaGuardado);

document.addEventListener("DOMContentLoaded", () => {

  const botonTema = document.querySelector(".tema");
  if (botonTema){
    aplicarTema(temaActual());
    botonTema.addEventListener("click", () => {
      aplicarTema(temaActual() === "oscuro" ? "claro" : "oscuro");
    });
  }

  /* ------------------------------------------------------------------------
     Menú móvil

     Se usa el atributo hidden en vez de una clase con display:none porque
     hidden también saca el menú del árbol de accesibilidad: un lector de
     pantalla no lee enlaces que no se pueden ver.
     ------------------------------------------------------------------------ */
  const botonMenu = document.querySelector(".hamburguesa");
  const menu = document.getElementById("menu-principal");

  if (botonMenu && menu){

    // El menú solo arranca cerrado en pantallas chicas; en escritorio debe
    // verse siempre, aunque el CSS ya lo controle.
    const esMovil = () => window.matchMedia("(max-width: 760px)").matches;

    function ajustarMenu(){
      if (esMovil()){
        menu.hidden = true;
        botonMenu.setAttribute("aria-expanded", "false");
      } else {
        menu.hidden = false;
      }
    }

    ajustarMenu();

    botonMenu.addEventListener("click", () => {
      const abierto = botonMenu.getAttribute("aria-expanded") === "true";
      botonMenu.setAttribute("aria-expanded", String(!abierto));
      menu.hidden = abierto;
    });

    // Si alguien gira el celular o agranda la ventana, recalcular, porque
    // si no el menú se queda escondido en escritorio.
    window.addEventListener("resize", ajustarMenu);

    // Escape cierra el menú, que es lo que espera cualquiera que use teclado.
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && esMovil() && !menu.hidden){
        menu.hidden = true;
        botonMenu.setAttribute("aria-expanded", "false");
        botonMenu.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     Marcar en qué página estamos

     Antes había que escribir la clase "activo" a mano en cada archivo y era
     cuestión de tiempo que uno se quedara desincronizado. Ahora se compara
     el nombre del archivo de la URL contra el href de cada enlace.

     aria-current="page" hace doble trabajo: el CSS lo usa para pintar el
     subrayado y los lectores de pantalla lo anuncian.
     ------------------------------------------------------------------------ */
  const archivoActual = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".navbar__links a").forEach(enlace => {
    const destino = enlace.getAttribute("href").split("#")[0];
    if (destino === archivoActual && !enlace.classList.contains("navbar__cta")){
      enlace.setAttribute("aria-current", "page");
    }
  });

  /* ------------------------------------------------------------------------
     Pintar las secciones que salen de DATOS

     Cada render revisa si su contenedor existe; así este mismo archivo sirve
     para las cuatro páginas sin reventar en las que no tienen esa sección.
     ------------------------------------------------------------------------ */
  if (typeof DATOS === "undefined") return;

  pintar("servicios-grid", DATOS.servicios, s => `
    <article class="servicio">
      <div class="servicio__icono" style="background:${s.color}">${s.inicial}</div>
      <h3 class="servicio__titulo">${s.titulo}</h3>
      <p class="servicio__texto">${s.texto}</p>
      <ul class="servicio__lista">${s.lista.map(i => `<li>${i}</li>`).join("")}</ul>
    </article>
  `);

  pintar("metricas-grid", DATOS.metricas, m => `
    <div class="metrica">
      <p class="metrica__valor">${m.valor}</p>
      <p class="metrica__label">${m.label}</p>
    </div>
  `);

  pintar("mision-vision", DATOS.misionVision, mv => `
    <div class="mv-card">
      <h3 class="mv-card__titulo">${mv.titulo}</h3>
      <p>${mv.texto}</p>
    </div>
  `);

  pintar("casos-grid", DATOS.casos, c => `
    <article class="caso">
      <h3 class="caso__negocio">${c.negocio}</h3>
      <p class="caso__giro">${c.giro}</p>
      <div class="caso__cambio">
        <div class="caso__antes"><span>Antes</span><p>${c.antes}</p></div>
        <div class="caso__despues"><span>Ahora</span><p>${c.despues}</p></div>
      </div>
      <blockquote class="caso__cita">${c.cita}</blockquote>
      <p class="caso__autor">${c.autor}</p>
    </article>
  `);

  /* details/summary nativo: se abre y cierra solo, responde a Enter y a
     espacio, y no necesita una línea de JavaScript para funcionar. */
  pintar("faq-lista", DATOS.faq, f => `
    <details class="faq__item">
      <summary class="faq__pregunta">${f.pregunta}</summary>
      <p class="faq__respuesta">${f.respuesta}</p>
    </details>
  `);

  pintar("equipo-grid", DATOS.equipo, p => `
    <article class="miembro">
      <div class="miembro__avatar" style="background:${p.color}">${iniciales(p.nombre)}</div>
      <h3 class="miembro__nombre">${p.nombre}</h3>
      <p class="miembro__rol">${p.rol}</p>
      <p class="miembro__descripcion">${p.descripcion}</p>
    </article>
  `);

  const textoPropuesta = document.getElementById("propuesta-texto");
  if (textoPropuesta) textoPropuesta.textContent = DATOS.propuesta;
});

/* --------------------------------------------------------------------------
   Utilidades
   -------------------------------------------------------------------------- */

/* Recibe el id del contenedor, la lista y una función que convierte un
   elemento en HTML. Se arma todo como una sola cadena y se asigna de un
   golpe en vez de meter nodo por nodo: es un solo repintado del navegador. */
function pintar(id, lista, plantilla){
  const contenedor = document.getElementById(id);
  if (!contenedor || !Array.isArray(lista)) return;
  contenedor.innerHTML = lista.map(plantilla).join("");
}

/* Primera letra del nombre y primera del apellido. Varios del equipo tienen
   nombre y apellidos compuestos, así que se toma la primera y la última
   palabra en lugar de las dos primeras. */
function iniciales(nombreCompleto){
  const partes = nombreCompleto.trim().split(/\s+/);
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}