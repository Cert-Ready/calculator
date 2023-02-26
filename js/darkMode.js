const darkModeEl = document.querySelector('.dark-mode-toggle');
let darkModeToggle = true;

darkModeEl.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
  const faMoon = document.querySelector('.fa-moon');
  const faSun = document.querySelector('.fa-sun');

  if (darkModeToggle) {
    document.body.classList.add('dark-mode');
    faMoon.removeAttribute('id');
    faSun.setAttribute('id', 'hidden');
    darkModeToggle = false;
  } else {
    document.body.classList.remove('dark-mode');
    faMoon.setAttribute('id', 'hidden');
    faSun.removeAttribute('id');
    darkModeToggle = true;
  }
}