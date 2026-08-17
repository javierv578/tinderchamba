/**
 * jobs.js
 * ------------------------------------------------------------------
 * Base de datos local (simulada) de ofertas laborales para periodistas
 * en la Región Metropolitana de Chile.
 *
 * No requiere backend: este array vive en el cliente. Es consumido por:
 *   - app.js    → calcula compatibilidad con el perfil y arma el swipe
 *   - machs.js  → no lo necesita directamente (lee los matches ya
 *                 guardados en localStorage), pero comparte la misma
 *                 forma de objeto
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
 *   url:                 enlace de postulación (string).
 *                         Al ser datos simulados, no existe una vacante
 *                         real específica que linkear: aquí apunta a una
 *                         búsqueda de LinkedIn Jobs ya filtrada por cargo
 *                         + empresa (el enlace funciona y lleva a
 *                         resultados reales). Cuando conectes ofertas
 *                         reales, reemplaza esto por la URL exacta de
 *                         postulación de cada vacante.
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
    descripcion: "Cobertura de contingencia diaria para pauta de prensa y despachos en vivo.",
    url: "https://www.linkedin.com/jobs/search/?keywords=periodista%20CNN%20Chile&location=Santiago%2C%20Chile"
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
    descripcion: "Redacción y edición de notas para portal de alto tráfico, con foco en SEO.",
    url: "https://www.linkedin.com/jobs/search/?keywords=editor%20contenidos%20BioBioChile&location=Santiago%2C%20Chile"
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
    descripcion: "Desarrollo de reportajes de investigación sobre corrupción y poder.",
    url: "https://www.linkedin.com/jobs/search/?keywords=periodista%20investigacion%20CIPER&location=Santiago%2C%20Chile"
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
    descripcion: "Gestión de comunicación interna y externa de la red de Metro.",
    url: "https://www.linkedin.com/jobs/search/?keywords=comunicaciones%20Metro%20de%20Santiago&location=Santiago%2C%20Chile"
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
    descripcion: "Cobertura de torneos nacionales e internacionales, en cancha y estudio.",
    url: "https://www.linkedin.com/jobs/search/?keywords=periodista%20deportivo%20TNT%20Sports&location=Santiago%2C%20Chile"
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
    descripcion: "Producción de notas para noticiario central y matinal.",
    url: "https://www.linkedin.com/jobs/search/?keywords=productor%20periodistico%20Canal%2013&location=Santiago%2C%20Chile"
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
    descripcion: "Gestión de redes sociales y adaptación de contenidos editoriales al formato digital.",
    url: "https://www.linkedin.com/jobs/search/?keywords=community%20manager%20periodista%20La%20Tercera&location=Santiago%2C%20Chile"
  },
  {
    id: 8,
    cargo: "Encargado(a) de Comunicaciones Corporativas",
    empresa: "CCU",
    tipoMedio: "Corporativo",
    comuna: "Las Condes",
    modalidad: "Híbrido",
    sueldoLiquido: 1550000,
    experienciaMinima: 4,
    areas: ["corporativo"],
    herramientas: ["redes-sociales", "redaccion-seo"],
    requisitos: [
      "Experiencia en comunicación interna y de marca",
      "Redacción de contenidos corporativos y de sustentabilidad",
      "Coordinación con agencias externas"
    ],
    descripcion: "Comunicación interna y de marca corporativa para una compañía multinacional de bebidas.",
    url: "https://www.linkedin.com/jobs/search/?keywords=comunicaciones%20corporativas%20CCU&location=Santiago%2C%20Chile"
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
    descripcion: "Lectura y redacción de pauta horaria para el informativo de radio.",
    url: "https://www.linkedin.com/jobs/search/?keywords=locutor%20Radio%20Cooperativa&location=Santiago%2C%20Chile"
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
    descripcion: "Cobertura gráfica y audiovisual para distribución a medios clientes de la agencia.",
    url: "https://www.linkedin.com/jobs/search/?keywords=periodista%20audiovisual%20Agencia%20UNO&location=Santiago%2C%20Chile"
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
    descripcion: "Coordinación de la estrategia comunicacional y vocerías del ministerio.",
    url: "https://www.linkedin.com/jobs/search/?keywords=jefe%20de%20prensa%20Ministerio%20de%20Salud&location=Santiago%2C%20Chile"
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
    descripcion: "Redacción de noticias de última hora para portal de alto tráfico.",
    url: "https://www.linkedin.com/jobs/search/?keywords=redactor%20web%20Emol&location=Santiago%2C%20Chile"
  },
  {
    id: 13,
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
    descripcion: "Cobertura informativa de la vida universitaria para el sitio institucional.",
    url: "https://www.linkedin.com/jobs/search/?keywords=periodista%20prensa%20Universidad%20de%20Chile&location=Santiago%2C%20Chile"
  }
];
