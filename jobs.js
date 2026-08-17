/**
 * jobs.js
 * ------------------------------------------------------------------
 * Base de datos local (simulada) de ofertas laborales para periodistas
 * en la Región Metropolitana de Chile.
 *
 * No requiere backend: este array vive en el cliente y es consumido
 * por app.js para calcular el porcentaje de compatibilidad con el
 * perfil que el usuario llena en el formulario.
 *
 * Estructura de cada oferta:
 * {
 *   id:                 identificador único (number)
 *   cargo:               nombre del puesto (string)
 *   empresa:             nombre de la empresa/medio (string)
 *   tipoMedio:           categoría del empleador, solo informativo (string)
 *   comuna:               comuna de Santiago donde queda (string)
 *   modalidad:           "Presencial" | "Híbrido" | "Remoto"
 *   sueldoLiquido:       sueldo líquido aproximado en CLP (number)
 *   experienciaMinima:   años mínimos requeridos (number)
 *   areas:               array de áreas de interés que calzan con el form
 *                         (usa los mismos value que index.html:
 *                         "investigacion" | "television" | "digital" |
 *                         "corporativo" | "deportivo" | "radio")
 *   herramientas:        array de herramientas requeridas/valoradas
 *                         (mismos value que index.html:
 *                         "redaccion-seo" | "edicion-video" |
 *                         "adobe-premiere" | "photoshop" | "wordpress" |
 *                         "redes-sociales" | "camara" | "locucion")
 *   requisitos:          array de strings, se listan tal cual en la tarjeta
 *   descripcion:         bajada corta del cargo (string)
 * }
 * ------------------------------------------------------------------
 */

const JOBS_DB = [
  {
    id: 1,
    cargo: "Periodista de Prensa",
    empresa: "CNN Chile",
    tipoMedio: "Televisión",
    comuna: "Providencia",
    modalidad: "Presencial",
    sueldoLiquido: 1100000,
    experienciaMinima: 2,
    areas: ["television", "investigacion"],
    herramientas: ["camara", "redes-sociales"],
    requisitos: [
      "Disponibilidad para turnos rotativos",
      "Experiencia cubriendo contingencia",
      "Manejo de fuentes políticas o policiales"
    ],
    descripcion: "Cobertura de contingencia diaria para pauta de prensa y despachos en vivo."
  },
  {
    id: 2,
    cargo: "Editor(a) de Contenidos Digitales",
    empresa: "BioBioChile",
    tipoMedio: "Medio digital",
    comuna: "Santiago Centro",
    modalidad: "Híbrido",
    sueldoLiquido: 950000,
    experienciaMinima: 1,
    areas: ["digital"],
    herramientas: ["redaccion-seo", "wordpress", "redes-sociales"],
    requisitos: [
      "Redacción ágil bajo presión de horario",
      "Conocimientos de SEO periodístico",
      "Manejo de CMS propio"
    ],
    descripcion: "Redacción y edición de notas para portal de alto tráfico, con foco en SEO."
  },
  {
    id: 3,
    cargo: "Periodista de Investigación",
    empresa: "CIPER Chile",
    tipoMedio: "Medio digital",
    comuna: "Santiago Centro",
    modalidad: "Híbrido",
    sueldoLiquido: 1300000,
    experienciaMinima: 5,
    areas: ["investigacion", "digital"],
    herramientas: ["redaccion-seo"],
    requisitos: [
      "Experiencia en reportajes de largo aliento",
      "Manejo de Ley de Transparencia",
      "Portafolio de investigaciones publicadas"
    ],
    descripcion: "Desarrollo de reportajes de investigación sobre corrupción y poder."
  },
  {
    id: 4,
    cargo: "Encargado(a) de Comunicaciones",
    empresa: "Metro de Santiago",
    tipoMedio: "Corporativo / Estatal",
    comuna: "Santiago Centro",
    modalidad: "Presencial",
    sueldoLiquido: 1450000,
    experienciaMinima: 3,
    areas: ["corporativo"],
    herramientas: ["redes-sociales", "photoshop"],
    requisitos: [
      "Experiencia en comunicación de crisis",
      "Redacción de comunicados institucionales",
      "Relación con medios de prensa"
    ],
    descripcion: "Gestión de comunicación interna y externa de la red de Metro."
  },
  {
    id: 5,
    cargo: "Periodista Deportivo",
    empresa: "TNT Sports Chile",
    tipoMedio: "Televisión",
    comuna: "Las Condes",
    modalidad: "Presencial",
    sueldoLiquido: 1050000,
    experienciaMinima: 2,
    areas: ["deportivo", "television"],
    herramientas: ["camara", "locucion"],
    requisitos: [
      "Conocimiento profundo de fútbol chileno y sudamericano",
      "Experiencia en relato o comentario en vivo",
      "Disponibilidad para viajar"
    ],
    descripcion: "Cobertura de torneos nacionales e internacionales, en cancha y estudio."
  },
  {
    id: 6,
    cargo: "Productor(a) Periodístico",
    empresa: "Canal 13",
    tipoMedio: "Televisión",
    comuna: "Vitacura",
    modalidad: "Presencial",
    sueldoLiquido: 1200000,
    experienciaMinima: 3,
    areas: ["television"],
    herramientas: ["edicion-video", "camara"],
    requisitos: [
      "Experiencia en producción de pauta diaria",
      "Manejo de equipos de terreno",
      "Disponibilidad de turnos incluyendo fines de semana"
    ],
    descripcion: "Producción de notas para noticiario central y matinal."
  },
  {
    id: 7,
    cargo: "Community Manager / Periodista Digital",
    empresa: "La Tercera",
    tipoMedio: "Medio digital",
    comuna: "Providencia",
    modalidad: "Híbrido",
    sueldoLiquido: 900000,
    experienciaMinima: 1,
    areas: ["digital"],
    herramientas: ["redes-sociales", "redaccion-seo", "photoshop"],
    requisitos: [
      "Manejo avanzado de Instagram, TikTok y X",
      "Redacción de titulares optimizados",
      "Análisis de métricas de audiencia"
    ],
    descripcion: "Gestión de redes sociales y adaptación de contenidos editoriales al formato digital."
  },
  {
    id: 8,
    cargo: "Periodista de Prensa Institucional",
    empresa: "Universidad de Chile",
    tipoMedio: "Corporativo / Académico",
    comuna: "Ñuñoa",
    modalidad: "Presencial",
    sueldoLiquido: 1000000,
    experienciaMinima: 2,
    areas: ["corporativo", "investigacion"],
    herramientas: ["redaccion-seo", "wordpress"],
    requisitos: [
      "Redacción de noticias institucionales",
      "Cobertura de actividades académicas",
      "Manejo de sitio web institucional"
    ],
    descripcion: "Cobertura informativa de la vida universitaria para el sitio institucional."
  },
  {
    id: 9,
    cargo: "Locutor(a) y Redactor(a) de Noticias",
    empresa: "Radio Cooperativa",
    tipoMedio: "Radio",
    comuna: "Santiago Centro",
    modalidad: "Presencial",
    sueldoLiquido: 980000,
    experienciaMinima: 2,
    areas: ["radio"],
    herramientas: ["locucion"],
    requisitos: [
      "Buena dicción y manejo de micrófono",
      "Redacción para formato radial",
      "Disponibilidad de turno mañana"
    ],
    descripcion: "Lectura y redacción de pauta horaria para el informativo de radio."
  },
  {
    id: 10,
    cargo: "Periodista Audiovisual",
    empresa: "Agencia UNO",
    tipoMedio: "Agencia de noticias",
    comuna: "Providencia",
    modalidad: "Presencial",
    sueldoLiquido: 1150000,
    experienciaMinima: 3,
    areas: ["television", "digital"],
    herramientas: ["edicion-video", "camara", "adobe-premiere"],
    requisitos: [
      "Manejo de cámara y edición en terreno",
      "Entrega de material bajo plazos ajustados",
      "Movilización propia valorada"
    ],
    descripcion: "Cobertura gráfica y audiovisual para distribución a medios clientes de la agencia."
  },
  {
    id: 11,
    cargo: "Jefe(a) de Prensa",
    empresa: "Ministerio de Salud",
    tipoMedio: "Corporativo / Estatal",
    comuna: "Santiago Centro",
    modalidad: "Presencial",
    sueldoLiquido: 1600000,
    experienciaMinima: 8,
    areas: ["corporativo"],
    herramientas: ["redes-sociales"],
    requisitos: [
      "Experiencia liderando equipos de comunicaciones",
      "Manejo de vocerías y puntos de prensa",
      "Experiencia previa en el sector público"
    ],
    descripcion: "Coordinación de la estrategia comunicacional y vocerías del ministerio."
  },
  {
    id: 12,
    cargo: "Redactor(a) Web Junior",
    empresa: "Emol",
    tipoMedio: "Medio digital",
    comuna: "Santiago Centro",
    modalidad: "Híbrido",
    sueldoLiquido: 780000,
    experienciaMinima: 0,
    areas: ["digital"],
    herramientas: ["redaccion-seo", "wordpress"],
    requisitos: [
      "Recién egresado o titulado de Periodismo",
      "Buena redacción y ortografía",
      "Disponibilidad para turno tarde"
    ],
    descripcion: "Redacción de noticias de última hora para portal de alto tráfico."
  }
];
