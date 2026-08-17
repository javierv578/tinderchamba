/**
 * app.js
 * ------------------------------------------------------------------
 * Orquesta Tinderchamba:
 *   1. Lee el formulario de perfil.
 *   2. Calcula un % de compatibilidad de cada oferta en JOBS_DB.
 *   3. Ordena las ofertas de mayor a menor compatibilidad.
 *   4. Renderiza el stack de tarjetas y maneja el swipe
 *      (arrastre con mouse/touch + botones X / ♥).
 *
 * Depende de JOBS_DB, definido en jobs.js (debe cargarse antes que
 * este archivo en index.html).
 *
 * La clave de localStorage donde se guardan los matches ("tinderchamba_matches")
 * es la misma que lee machs.html/machs.js — es el puente entre ambas páginas.
 * ------------------------------------------------------------------
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     LocalStorage: guardar matches
     ------------------------------------------------------------------ */
  const MATCHES_KEY = 'tinderchamba_matches';

  function obtenerMatchesGuardados() {
    try {
      const raw = localStorage.getItem(MATCHES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error('No se pudo leer localStorage:', error);
      return [];
    }
  }

  function guardarMatch(job) {
    const matches = obtenerMatchesGuardados();

    // Evita duplicados si el usuario ya le dio match antes a esta oferta
    const yaExiste = matches.some((m) => m.id === job.id);
    if (yaExiste) return;

    // Solo se guardan los campos que machs.html necesita mostrar
    // (se descarta "compatibilidad", que es específico de esta sesión)
    const {
      id, cargo, empresa, tipoMedio, comuna, modalidad,
      sueldoLiquido, requisitos, descripcion, url
    } = job;

    matches.push({
      id, cargo, empresa, tipoMedio, comuna, modalidad,
      sueldoLiquido, requisitos, descripcion, url,
      fechaMatch: new Date().toISOString()
    });

    try {
      localStorage.setItem(MATCHES_KEY, JSON.stringify(matches));
    } catch (error) {
      console.error('No se pudo guardar en localStorage:', error);
    }
  }

  /* ------------------------------------------------------------------
     Referencias al DOM
     ------------------------------------------------------------------ */
  const formView = document.getElementById('form-view');
  const swipeView = document.getElementById('swipe-view');
  const profileForm = document.getElementById('profile-form');

  const cardStack = document.getElementById('card-stack');
  const cardsRemainingEl = document.getElementById('cards-remaining');
  const emptyState = document.getElementById('empty-state');

  const btnReject = document.getElementById('btn-reject');
  const btnLike = document.getElementById('btn-like');
  const btnRestart = document.getElementById('btn-restart');

  /* Cuántas tarjetas del stack se pintan a la vez detrás de la activa
     (solo por rendimiento y para el efecto visual de "mazo") */
  const VISIBLE_STACK_SIZE = 3;

  /* Cola de ofertas ya ordenadas por compatibilidad, pendientes de mostrar */
  let queue = [];

  /* ------------------------------------------------------------------
     1. ALGORITMO DE MATCH
     ------------------------------------------------------------------
     Compara el perfil del usuario con cada oferta y devuelve un score
     0-100. Pondera:
       - 50%  solapamiento de áreas de interés
       - 30%  solapamiento de herramientas
       - 20%  si la experiencia del usuario cubre el mínimo pedido
     ------------------------------------------------------------------ */
  function calcularCompatibilidad(perfil, job) {
    // --- Áreas (50%) ---
    const areasJob = job.areas || [];
    const areasMatch = areasJob.filter((a) => perfil.areas.includes(a)).length;
    const areasScore = areasJob.length
      ? (areasMatch / areasJob.length) * 50
      : 25; // si la oferta no especifica áreas, no perjudica ni beneficia

    // --- Herramientas (30%) ---
    const herramientasJob = job.herramientas || [];
    const herramientasMatch = herramientasJob.filter((h) =>
      perfil.herramientas.includes(h)
    ).length;
    const herramientasScore = herramientasJob.length
      ? (herramientasMatch / herramientasJob.length) * 30
      : 15;

    // --- Experiencia (20%) ---
    // Si el usuario cumple o supera el mínimo, puntaje completo.
    // Si le falta poco (hasta 2 años), puntaje parcial en vez de cero,
    // para no descartar ofertas donde igual podría postular.
    let experienciaScore;
    const diferencia = perfil.experiencia - job.experienciaMinima;
    if (diferencia >= 0) {
      experienciaScore = 20;
    } else if (diferencia >= -2) {
      experienciaScore = 10;
    } else {
      experienciaScore = 0;
    }

    const total = areasScore + herramientasScore + experienciaScore;
    return Math.round(total);
  }

  /* Ordena JOBS_DB por compatibilidad descendente para el perfil dado */
  function ordenarOfertasPorCompatibilidad(perfil) {
    return JOBS_DB
      .map((job) => ({
        ...job,
        compatibilidad: calcularCompatibilidad(perfil, job)
      }))
      .sort((a, b) => b.compatibilidad - a.compatibilidad);
  }

  /* ------------------------------------------------------------------
     2. LECTURA DEL FORMULARIO
     ------------------------------------------------------------------ */
  function leerPerfilDesdeFormulario() {
    const experiencia = Number(profileForm.experiencia.value);

    const areas = Array.from(
      profileForm.querySelectorAll('input[name="areas"]:checked')
    ).map((input) => input.value);

    const herramientas = Array.from(
      profileForm.querySelectorAll('input[name="herramientas"]:checked')
    ).map((input) => input.value);

    return { experiencia, areas, herramientas };
  }

  profileForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const perfil = leerPerfilDesdeFormulario();
    queue = ordenarOfertasPorCompatibilidad(perfil);

    formView.classList.remove('view--active');
    swipeView.classList.add('view--active');
    emptyState.hidden = true;

    renderStack();
  });

  /* Botón "Editar mi perfil" del empty state: vuelve al formulario */
  btnRestart.addEventListener('click', () => {
    swipeView.classList.remove('view--active');
    formView.classList.add('view--active');
  });

  /* ------------------------------------------------------------------
     3. RENDER DEL STACK DE TARJETAS
     ------------------------------------------------------------------ */
  function renderStack() {
    cardStack.innerHTML = '';
    actualizarContador();

    if (queue.length === 0) {
      emptyState.hidden = false;
      return;
    }
    emptyState.hidden = true;

    // Pinta hasta VISIBLE_STACK_SIZE tarjetas, la primera (índice 0) queda
    // arriba e interactiva; las siguientes solo se ven de fondo.
    const visibles = queue.slice(0, VISIBLE_STACK_SIZE);

    // Se insertan en orden inverso para que la primera de la cola quede
    // último en el DOM (arriba, en términos de apilamiento visual).
    visibles
      .slice()
      .reverse()
      .forEach((job, idxInvertido) => {
        const posicionEnStack = visibles.length - 1 - idxInvertido;
        const card = crearTarjeta(job, posicionEnStack);
        cardStack.appendChild(card);
      });
  }

  function actualizarContador() {
    const n = queue.length;
    cardsRemainingEl.textContent =
      n === 1 ? '1 oferta' : `${n} ofertas`;
  }

  /* Deriva la clase de color de banda a partir del tipo de medio */
  function claseBandaPorTipoMedio(tipoMedio) {
    const t = tipoMedio.toLowerCase();
    if (t.includes('televisión') || t.includes('television')) return 'job-card__band--tv';
    if (t.includes('digital')) return 'job-card__band--digital';
    if (t.includes('radio')) return 'job-card__band--radio';
    if (t.includes('agencia')) return 'job-card__band--agencia';
    if (t.includes('corporativo') || t.includes('estatal') || t.includes('académico') || t.includes('academico')) {
      return 'job-card__band--corporativo';
    }
    return 'job-card__band--deportivo';
  }

  /* Clase de color del badge de compatibilidad según el score */
  function claseMatchPorScore(score) {
    if (score >= 70) return 'job-card__match--alto';
    if (score >= 40) return 'job-card__match--medio';
    return 'job-card__match--bajo';
  }

  function formatearSueldo(valor) {
    return valor.toLocaleString('es-CL');
  }

  function crearTarjeta(job, posicionEnStack) {
    const card = document.createElement('article');
    card.className = 'job-card';
    card.dataset.stackPos = String(posicionEnStack);
    card.dataset.jobId = String(job.id);

    const requisitosHTML = (job.requisitos || [])
      .map((r) => `<li>${r}</li>`)
      .join('');

    card.innerHTML = `
      <div class="job-card__band ${claseBandaPorTipoMedio(job.tipoMedio)}">
        <span class="job-card__tipo-medio">${job.tipoMedio}</span>
        <span class="job-card__match ${claseMatchPorScore(job.compatibilidad)}">
          ${job.compatibilidad}% match
        </span>
      </div>
      <div class="job-card__body">
        <h2 class="job-card__cargo">${job.cargo}</h2>
        <p class="job-card__empresa">${job.empresa}</p>
        <p class="job-card__meta">${job.comuna} · ${job.modalidad}</p>
        <p class="job-card__sueldo">
          $${formatearSueldo(job.sueldoLiquido)} <span>líquido aprox.</span>
        </p>
        <ul class="job-card__requisitos">${requisitosHTML}</ul>
      </div>
    `;

    // Solo la tarjeta de arriba del stack (posición 0) es arrastrable
    if (posicionEnStack === 0) {
      habilitarSwipe(card);
    }

    return card;
  }

  /* ------------------------------------------------------------------
     4. LÓGICA DE SWIPE (arrastre + botones)
     ------------------------------------------------------------------ */
  function habilitarSwipe(card) {
    let startX = 0;
    let currentX = 0;
    let dragging = false;

    const onPointerDown = (clientX) => {
      dragging = true;
      startX = clientX;
      card.style.transition = 'none';
    };

    const onPointerMove = (clientX) => {
      if (!dragging) return;
      currentX = clientX - startX;
      const rotacion = currentX / 12;
      card.style.transform = `translateX(${currentX}px) rotate(${rotacion}deg)`;
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      card.style.transition = '';

      const UMBRAL = 100; // píxeles mínimos para considerar swipe válido
      if (currentX > UMBRAL) {
        resolverSwipe('like');
      } else if (currentX < -UMBRAL) {
        resolverSwipe('reject');
      } else {
        // No superó el umbral: la tarjeta vuelve a su lugar
        card.style.transform = '';
      }
      currentX = 0;
    };

    // Mouse
    card.addEventListener('mousedown', (e) => onPointerDown(e.clientX));
    window.addEventListener('mousemove', (e) => onPointerMove(e.clientX));
    window.addEventListener('mouseup', onPointerUp);

    // Touch
    card.addEventListener('touchstart', (e) => onPointerDown(e.touches[0].clientX));
    card.addEventListener('touchmove', (e) => onPointerMove(e.touches[0].clientX));
    card.addEventListener('touchend', onPointerUp);
  }

  /* Ejecuta la salida de la tarjeta superior, ya sea por drag o por botón */
  function resolverSwipe(direccion) {
    if (queue.length === 0) return;

    const topCard = cardStack.querySelector('[data-stack-pos="0"]');
    if (!topCard) return;

    topCard.classList.add(direccion === 'like' ? 'swiping-right' : 'swiping-left');

    // Saca la oferta de la cola antes de decidir qué hacer con ella
    const job = queue.shift();

    if (direccion === 'like') {
      guardarMatch(job);
      mostrarToastMatch(job);
    }

    // Espera a que termine la animación de salida antes de re-renderizar
    setTimeout(() => {
      renderStack();
    }, 300);
  }

  /* Pequeño aviso visual de "¡Match!" al guardar en localStorage */
  function mostrarToastMatch(job) {
    const toast = document.createElement('div');
    toast.className = 'match-toast';
    toast.textContent = `¡Match con ${job.empresa}! Se guardó en Mis machs.`;
    document.body.appendChild(toast);

    // Se autodestruye después de la animación (ver styles.css)
    setTimeout(() => toast.remove(), 2200);
  }

  btnLike.addEventListener('click', () => resolverSwipe('like'));
  btnReject.addEventListener('click', () => resolverSwipe('reject'));
})();
