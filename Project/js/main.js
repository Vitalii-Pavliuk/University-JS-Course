let currentUser = '';
let evolutionData = [];

const welcomeMessage = document.getElementById('welcomeMessage');
const userName = document.getElementById('userName');
const loginBtn = document.getElementById('loginBtn');
const currentScoreElement = document.getElementById('currentScore');
const highScoreElement = document.getElementById('highScore');
const evolutionList = document.getElementById('evolutionList');
const navbarNav = document.getElementById('navbarNav');
const menuToggle = document.querySelector('.menu-toggle');

document.addEventListener('DOMContentLoaded', () => {
  initializeUser();
  updateHighScore();
  loadEvolutionData();
  setupMenuToggle();
});

function setupMenuToggle() {
  if (menuToggle) {
    navbarNav.classList.remove('show');
    document.body.style.overflow = '';
    
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navbarNav.classList.toggle('show');
      if (navbarNav.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    const navLinks = document.querySelectorAll('#navbarNav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarNav.classList.remove('show');
        document.body.style.overflow = '';
      });
    });
    
    document.addEventListener('click', (event) => {
      if (navbarNav.classList.contains('show') && 
          !event.target.closest('#navbarNav') && 
          !event.target.closest('.menu-toggle')) {
        navbarNav.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
    
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navbarNav.classList.contains('show')) {
        navbarNav.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  }
}

function updateHighScore() {
  const highScore = localStorage.getItem('snakeHighScore') || 0;
  highScoreElement.textContent = highScore;
}

function updateCurrentScore(score) {
  currentScoreElement.textContent = score;
}

window.updateScore = function(score) {
  updateCurrentScore(score);
} 