document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? '×' : '☰';
    });
  }

  const themeButtons = document.querySelectorAll('.theme-toggle');
  const savedTheme = localStorage.getItem('nature-theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');
  const updateThemeIcon = () => themeButtons.forEach(button => button.textContent = document.body.classList.contains('dark') ? '☀' : '☾');
  updateThemeIcon();
  themeButtons.forEach(button => button.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('nature-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
  }));

  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    galleryItems.forEach(item => item.hidden = filter !== 'all' && item.dataset.category !== filter);
  }));

  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxImage = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('p');
    const close = lightbox.querySelector('.lightbox-close');
    const closeLightbox = () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); };
    galleryItems.forEach(item => item.addEventListener('click', () => {
      lightboxImage.src = item.dataset.image;
      lightboxImage.alt = item.querySelector('img').alt;
      lightboxCaption.textContent = item.dataset.title;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    }));
    close.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
  }

  const quizOptions = document.querySelectorAll('.quiz-option');
  const feedback = document.querySelector('.quiz-feedback');
  const reset = document.querySelector('.quiz-reset');
  quizOptions.forEach(option => option.addEventListener('click', () => {
    quizOptions.forEach(item => { item.disabled = true; item.classList.remove('correct', 'wrong'); });
    if (option.dataset.correct === 'true') {
      option.classList.add('correct');
      feedback.textContent = 'Правильно! Земля обертається навколо своєї осі.';
    } else {
      option.classList.add('wrong');
      quizOptions.forEach(item => { if (item.dataset.correct === 'true') item.classList.add('correct'); });
      feedback.textContent = 'Не зовсім. Правильна відповідь виділена зеленим.';
    }
  }));
  if (reset) reset.addEventListener('click', () => {
    quizOptions.forEach(item => { item.disabled = false; item.classList.remove('correct', 'wrong'); });
    feedback.textContent = 'Обери одну відповідь.';
  });
});