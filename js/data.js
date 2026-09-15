/* ==========================================================================
   data.js — todo el contenido de ejemplo del sitio en un solo lugar.

   Antes cada página tenía su propio arreglo copiado y pegado; las métricas
   estaban escritas dos veces y si cambiaba una había que acordarse de la
   otra. Al centralizarlas aquí, el día que exista backend solo hay que
   reemplazar este archivo por un fetch y las páginas ni se enteran.

   Ojo: son datos simulados (US-06 / US-07), no vienen de producción.
   ========================================================================== */

const DATOS = {

  /* Los dos frentes del negocio. El color de cada uno sale del logo:
     cian para presencia digital, violeta para gestión. */
  servicios: [
    {
      titulo: "Presencia Digital",
      color: "#0E9BA6",
      inicial: "PD",
      texto: "Para que te encuentren cuando buscan un negocio como el tuyo.",
      lista: [
        "Sitio web sencillo con tu información y servicios",
        "Ficha en Google Maps optimizada",
        "Enlaces directos a tus redes sociales"
      ]
    },
    {
      titulo: "Gestión de Negocio",
      color: "#6845E8",
      inicial: "GN",
      texto: "Para que dejes de manejar tu negocio con cuadernos y notas sueltas.",
      lista: [
        "Plataforma sin papeles para tu operación diaria",
        "Registro de clientes y pagos en un solo lugar",
        "Reportes simples para tomar decisiones"
      ]
    }
  ],

  propuesta: "Procesos simples que cualquier persona entiende, transparencia total " +
    "sobre el producto final, y evidencia real de negocios que ya digitalizamos con nosotros.",

  metricas: [
    { valor: "48",     label: "Negocios digitalizados" },
    { valor: "92%",    label: "Satisfacción reportada" },
    { valor: "3 días", label: "Tiempo promedio de implementación" },
    { valor: "24/7",   label: "Plataforma disponible" }
  ],

  misionVision: [
    {
      titulo: "Misión",
      texto: "Ayudar a negocios locales a construir presencia digital y gestionar su operación desde un solo lugar, sin necesidad de conocimientos técnicos."
    },
    {
      titulo: "Visión",
      texto: "Ser la opción de confianza para que cualquier negocio local del país pueda digitalizarse sin complicarse la vida."
    }
  ],

  /* La propuesta de valor promete "evidencia real de negocios que ya
     digitalizamos", así que aquí está esa evidencia. Antes/después en una
     sola frase corta, porque el dueño de un negocio no va a leer párrafos. */
  casos: [
    {
      negocio: "Tortillería La Esperanza",
      giro: "Alimentos · Querétaro",
      antes: "Pedidos anotados en libreta",
      despues: "Pedidos en la plataforma",
      cita: "Antes se me perdían los pedidos grandes. Ahora los veo todos en el celular.",
      autor: "Rosa M., dueña"
    },
    {
      negocio: "Taller Mecánico Cano",
      giro: "Servicios · San Juan del Río",
      antes: "Sin aparecer en Maps",
      despues: "Primeros resultados locales",
      cita: "Llegó gente que nunca había pasado por aquí, solo porque nos encontraron buscando.",
      autor: "Uriel C., encargado"
    },
    {
      negocio: "Estética Bella Vida",
      giro: "Belleza · Querétaro",
      antes: "Citas por mensajes sueltos",
      despues: "Agenda en un solo lugar",
      cita: "Ya no se me empalman dos clientas a la misma hora, que era lo que más me pasaba.",
      autor: "Paulina H., dueña"
    }
  ],

  /* Las dudas que de verdad frenan a un negocio local antes de contratar.
     Están escritas en las palabras del cliente, no en las nuestras. */
  faq: [
    {
      pregunta: "¿Necesito saber de computadoras para usarlo?",
      respuesta: "No. La plataforma está pensada para que cualquier persona la use desde el celular. En la entrega te acompañamos hasta que la manejes sin ayuda."
    },
    {
      pregunta: "¿Cuánto tarda en estar listo?",
      respuesta: "El promedio es de tres días desde que nos pasas tu información. Si tu negocio necesita algo fuera de lo común, te lo decimos desde la primera plática, no a la mitad."
    },
    {
      pregunta: "¿Qué pasa si algo falla después?",
      respuesta: "Somos un equipo pequeño donde cada persona conoce su parte del proyecto, así que sabes a quién le toca resolverlo y en cuánto. No hay tickets que se pierdan."
    },
    {
      pregunta: "¿El sitio y la plataforma se contratan por separado?",
      respuesta: "Puedes tomar solo uno de los dos frentes. La mayoría empieza con presencia digital y agrega la gestión después, cuando ya tiene más movimiento."
    },
    {
      pregunta: "¿Quién es dueño de la información de mis clientes?",
      respuesta: "Tú. Los datos son de tu negocio y puedes pedir una copia completa cuando quieras, incluso si decides dejar de trabajar con nosotros."
    }
  ],

  equipo: [
    {
      nombre: "Javier Alexander Martínez Flores",
      rol: "Product Owner",
      descripcion: "Define qué construir primero y por qué, hablando directo con los dueños de negocio.",
      color: "#0E9BA6"
    },
    {
      nombre: "Jairo Antonio Melgar Obrajero",
      rol: "Scrum Master",
      descripcion: "Organiza los sprints y quita obstáculos para que el equipo entregue a tiempo.",
      color: "#6845E8"
    },
    {
      nombre: "Clara Paulina Hernández López",
      rol: "Desarrolladora Frontend / QA",
      descripcion: "Construye las pantallas y verifica que cada historia cumpla sus criterios de aceptación.",
      color: "#0E9BA6"
    },
    {
      nombre: "Oscar Uriel Montalvo Cano",
      rol: "Desarrollador",
      descripcion: "Implementa la lógica de las funcionalidades de la plataforma.",
      color: "#6845E8"
    },
    {
      nombre: "Leonardo Rodríguez Gutiérrez",
      rol: "Desarrollador SQL",
      descripcion: "Diseña y mantiene la base de datos que sostiene la información de la plataforma.",
      color: "#0E9BA6"
    }
  ]
};