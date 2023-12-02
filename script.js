document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");
    const svg = document.querySelector(".background-svg");
  
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
  
      // Aplica la transparencia gradual a las secciones al desplazarse
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
  
        if (scrollPosition >= sectionTop - window.innerHeight / 2 && scrollPosition < sectionTop + sectionHeight) {
          section.style.opacity = 1;
        } else {
          section.style.opacity = 0;
        }
      });
  
      // Calcula la nueva posición vertical del SVG y ajusta la escala
      const translateY = Math.min(scrollPosition * 1, window.innerHeight); // Ajusta la velocidad de desplazamiento según sea necesario
      const scale = 1; // Ajusta la escala según sea necesario
  
      // Aplica el desplazamiento, escala y desenfoque al fondo SVG
      svg.style.transform = `scaleX(-1) scale(${scale}) translateY(${translateY}px)`;
      const blurAmount = Math.min(scrollPosition / 10, 20);
      svg.style.filter = `blur(${blurAmount}px)`;
  
      // Desaparece el fondo SVG al llegar al fondo de la página
      if (scrollPosition >= window.innerHeight) {
        svg.style.opacity = 0;
      } else {
        svg.style.opacity = 1;
      }
    });
  });
  