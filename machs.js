/**
 * machs.js
 * ------------------------------------------------------------------
 * Lógica de machs.html: lee el historial de matches guardado por
 * app.js en localStorage (clave "tinderchamba_matches") y lo pinta
 * como una lista de tarjetas, cada una con un botón que lleva a la
 * URL real de postulación.
 *
 * No depende de jobs.js: todo lo que necesita ya quedó guardado
 * dentro de cada match en localStorage.
 * ------------------------------------------------------------------ */

(function () {
  'use strict';

  const MATCHES_KEY = 'tinderchamba_matches';

  const matchesList = document.getElementById('matches-list');
  const emptyState = document.getElementById('matches-empty');

  function obtenerMatchesGuardados() {
    try {
      const raw = localStorage.getItem(MATCHES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error('No se pudo leer localStorage:', error);
      return [];
    }
  }

  function guardarMatches(matches) {
    try {
      localStorage.setItem(MATCHES_KEY, JSON.stringify(matches));
    } catch (error) {
      console.error('No se pudo actualizar localStorage:', error);
    }
  }

  function formatearSueldo(valor) {
    return valor.toLocaleString('es-CL');
  }

  function formatearFecha(iso) {
    try {
      return new Date(iso).toLocaleDateString('es-CL', {
        day: '2-digit',
        month: 'short'
      });
    } catch {
      return '';
    }
  }

  /* Deriva la clase de color de banda, igual que en app.js */
  function claseBandaPorTipoMedio(tipoMedio) {
    const t = (tipoMedio || '').toLowerCase();
    if (t.includes('televisión') || t.includes('television')) return 'job-card__band--tv';
    if (t.includes('digital')) return 'job-card__band--digital';
    if (t.includes('radio')) return 'job-card__band--radio';
    if (t.includes('agencia')) return 'job-card__band--agencia';
    if (t.includes('corporativo') || t.includes('estatal') || t.includes('académico') || t.includes('academico')) {
      return 'job-card__band--corporativo';
    }
    return 'job-card__band--deportivo';
  }

  function crearTarjetaMatch(job) {
    const card = document.createElement('article');
    card.className = 'match-card';
    card.dataset.jobId = String(job.id);

    const requisitosHTML = (job.requisitos || [])
      .map((r) => `<li>${r}</li>`)
      .join('');

    card.innerHTML = `
      <div class="match-card__band ${claseBandaPorTipoMedio(job.tipoMedio)}">
        <span class="job-card__tipo-medio">${job.tipoMedio}</span>
        <span class="match-card__fecha">Match ${formatearFecha(job.fechaMatch)}</span>
      </div>
      <div class="match-card__body">
        <h2 class="job-card__cargo">${job.cargo}</h2>
        <p class="job-card__empresa">${job.empresa}</p>
        <p class="job-card__meta">${job.comuna} · ${job.modalidad}</p>
        <p class="job-card__sueldo">
          $${formatearSueldo(job.sueldoLiquido)} <span>líquido aprox.</span>
        </p>
        <ul class="job-card__requisitos">${requisitosHTML}</ul>
        <div class="match-card__actions">
          <a href="${job.url}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--full">
            Postular ahora ↗
          </a>
          <button class="btn-remove-match" data-remove-id="${job.id}" aria-label="Quitar de mis machs">
            Quitar
          </button>
        </div>
      </div>
    `;

    return card;
  }

  function render() {
    const matches = obtenerMatchesGuardados();
    matchesList.innerHTML = '';

    if (matches.length === 0) {
      emptyState.hidden = false;
      matchesList.hidden = true;
      return;
    }

    emptyState.hidden = true;
    matchesList.hidden = false;

    // Los más recientes primero
    matches
      .slice()
      .reverse()
      .forEach((job) => {
        matchesList.appendChild(crearTarjetaMatch(job));
      });
  }

  /* Delegación de eventos para los botones "Quitar" de cada tarjeta */
  matchesList.addEventListener('click', (event) => {
    const btn = event.target.closest('.btn-remove-match');
    if (!btn) return;

    const idAQuitar = Number(btn.dataset.removeId);
    const matches = obtenerMatchesGuardados().filter((m) => m.id !== idAQuitar);
    guardarMatches(matches);
    render();
  });

  render();
})();
