/**
 * Gestion des boutons de la navbar et des sections associées
 * Style rétro gaming - Projet [Nom de ton projet]
 */

// =============================================
// 1. ÉTAT INITIAL DE L'APPLICATION
// =============================================
const state = {
  currentSection: 'about', // Section affichée par défaut
  activeButton: null,      // Bouton actuellement actif
};

// =============================================
// 2. FONCTIONS UTILITAIRES
// =============================================

/**
 * Met à jour l'affichage des sections et l'état des boutons
 * @param {HTMLElement} button - Bouton cliqué
 */
function updateDisplay(button) {
  // Récupère la cible de la section depuis l'attribut data-target du bouton
  const targetSection = button.dataset.target;

  // 2.1. Met à jour l'état actif du bouton
  // -------------------------------------
  // Retire la classe 'active' du bouton précédemment actif
  if (state.activeButton) {
    state.activeButton.classList.remove('active');
  }
  // Ajoute la classe 'active' au nouveau bouton
  button.classList.add('active');
  // Met à jour l'état global
  state.activeButton = button;

  // 2.2. Masque toutes les sections
  // -------------------------------------
  document.querySelectorAll('.main > div').forEach(section => {
    section.style.display = 'none';
  });

  // 2.3. Affiche la section ciblée
  // -------------------------------------
  const sectionToShow = document.querySelector(`.${targetSection}`);
  if (sectionToShow) {
    sectionToShow.style.display = 'block';
  }

  // 2.4. Met à jour l'état global avec la section actuelle
  // ------------------------------------------------------
  state.currentSection = targetSection;
}

/**
 * Initialise les écouteurs d'événements sur les boutons
 */
function setupButtonListeners() {
  // Sélectionne tous les boutons de la navbar
  const buttons = document.querySelectorAll('.buttonBar button');

  // Pour chaque bouton, ajoute un écouteur de clic
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Appelle la fonction pour mettre à jour l'affichage
      updateDisplay(this);
    });
  });
}

/**
 * Initialise l'affichage par défaut au chargement de la page
 */
function initDefaultDisplay() {
  // Trouve le bouton actif par défaut (celui avec la classe 'active')
  const defaultButton = document.querySelector('.buttonBar button.active');

  // Si un bouton actif existe, met à jour l'affichage
  if (defaultButton) {
    updateDisplay(defaultButton);
  }
}

// =============================================
// 3. INITIALISATION DE L'APPLICATION
// =============================================
document.addEventListener('DOMContentLoaded', function() {
  // 3.1. Configure les écouteurs sur les boutons
  setupButtonListeners();

  // 3.2. Initialise l'affichage par défaut
  initDefaultDisplay();

  // 3.3. Gestion du bouton "Démarrer" (spécifique à ton projet)
  // ---------------------------------------------------------
  const startButton = document.querySelector('.start-button');
  const typewriterText = document.getElementById('typewriter-text');

  if (startButton && typewriterText) {
    startButton.addEventListener('click', function() {
      // Masque le bouton "Démarrer" après clic
      this.style.display = 'none';

      // Affiche le texte "machine à écrire"
      typewriterText.style.display = 'block';

      // Lance l'animation de frappe (à adapter avec ton texte réel)
      const text = "LOREM IPSUM DOLOR SIT AMET..."; // Remplace par ton texte
      let i = 0;
      function typeWriter() {
        if (i < text.length) {
          typewriterText.innerHTML += text.charAt(i);
          i++;
          // Vitesse aléatoire pour un effet réaliste
          const speed = 50 + Math.random() * 100;
          setTimeout(typeWriter, speed);
        }
      }
      typeWriter();
    });
  }
});
