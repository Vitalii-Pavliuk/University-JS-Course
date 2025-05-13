function initializeUser() {
  currentUser = localStorage.getItem('snakeUser') || '';
  if (currentUser) {
    showWelcomeMessage(currentUser);
    userName.style.display = 'none';
    loginBtn.textContent = 'Вийти';
  }
  
  loginBtn.addEventListener('click', handleLogin);
}

function handleLogin() {
  if (currentUser) {
    currentUser = '';
    localStorage.removeItem('snakeUser');
    welcomeMessage.textContent = '';
    userName.style.display = 'block';
    userName.value = '';
    loginBtn.textContent = 'Увійти';
  } else {
    const userInput = userName.value.trim();
    if (userInput) {
      currentUser = userInput;
      localStorage.setItem('snakeUser', currentUser);
      showWelcomeMessage(currentUser);
      userName.style.display = 'none';
      loginBtn.textContent = 'Вийти';
    } else {
      alert('Будь ласка, введіть ваше ім\'я!');
    }
  }
}

function showWelcomeMessage(name) {
  welcomeMessage.innerHTML = `<i class="bi bi-person-circle"></i> Вітаємо, <strong>${name}</strong>!`;
  
  welcomeMessage.classList.add('welcome-animation');
  setTimeout(() => {
    welcomeMessage.classList.remove('welcome-animation');
  }, 1000);
}