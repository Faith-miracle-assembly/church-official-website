document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const video = document.querySelector('.header-video');
  let slideIndex = 0;
  let slideInterval;

  slides.forEach(slide => {
    slide.style.opacity = '0';
    slide.classList.remove('active');
  });

  function startSlideshow() {
    slideIndex = 0;
    slides[slideIndex].style.opacity = '1';
    slides[slideIndex].classList.add('active');

    slideInterval = setInterval(() => {
      slides[slideIndex].classList.remove('active');
      slides[slideIndex].style.opacity = '0';

      slideIndex++;
      if (slideIndex < slides.length) {
        slides[slideIndex].classList.add('active');
        slides[slideIndex].style.opacity = '1';
      } else {
        clearInterval(slideInterval);
        setTimeout(() => {
          slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
          });
          video.currentTime = 0;
          video.play();
        }, 1000);
      }
    }, 4000);
  }

  video.addEventListener('ended', () => {
    startSlideshow();
  });
});

 function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('show');
  }
const lastUpdated = new Date(document.lastModified);

  // Format date and time
  const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };

  const formattedDate = lastUpdated.toLocaleDateString(undefined, dateOptions);
  const formattedTime = lastUpdated.toLocaleTimeString(undefined, timeOptions);

  const updatedPara = document.createElement('p');
  updatedPara.textContent = `Last updated: ${formattedDate}, ${formattedTime}`;
  updatedPara.style.fontSize = '0.8rem';
  updatedPara.style.color = '#fff';
  updatedPara.style.marginTop = '5px';

  document.querySelector('.site-footer').appendChild(updatedPara);

