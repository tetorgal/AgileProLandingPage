document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  const svg = document.querySelector(".background-svg");

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    // Aplica la transparencia gradual a las secciones al desplazarse
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop - window.innerHeight / 2 &&
        scrollPosition < sectionTop + sectionHeight
      ) {
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
document.addEventListener("DOMContentLoaded", function () {
  const testimonialsContainer = document.getElementById("testimonials-container");
  const arrowLeft = document.querySelector(".arrow-left");
  const arrowRight = document.querySelector(".arrow-right");
  let scrollInterval;

  // Verifica si testimonialsContainer es nulo
  if (!testimonialsContainer) {
    console.error("Elemento con id 'testimonials-container' no encontrado.");
    return;
  }

  // Clona las tarjetas para crear el efecto infinito
  const cards = document.querySelectorAll(".testimonial-card");
  const cardWidth = cards[0].offsetWidth;

  // Duplica las tarjetas al principio y al final
  const totalCards = cards.length;
  const cloneCount = 3; // Elige un número suficientemente grande para el efecto infinito

  for (let i = 0; i < cloneCount; i++) {
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      testimonialsContainer.appendChild(clone);
    });
  }

  // Función para desplazar hacia la izquierda
  const scrollLeft = () => {
    testimonialsContainer.scrollLeft -= 2; // Ajusta la velocidad de desplazamiento
  };

  // Función para desplazar hacia la derecha
  const scrollRight = () => {
    testimonialsContainer.scrollLeft += 2; // Ajusta la velocidad de desplazamiento
  };

  // Evento al hacer hover sobre la flecha izquierda
  arrowLeft.addEventListener("mouseover", () => {
    scrollInterval = setInterval(scrollLeft, 10); // Ajusta el intervalo según tus necesidades
  });

  // Evento al dejar de hacer hover sobre la flecha izquierda
  arrowLeft.addEventListener("mouseout", () => {
    clearInterval(scrollInterval);
  });

  // Evento al hacer hover sobre la flecha derecha
  arrowRight.addEventListener("mouseover", () => {
    scrollInterval = setInterval(scrollRight, 10); // Ajusta el intervalo según tus necesidades
  });

  // Evento al dejar de hacer hover sobre la flecha derecha
  arrowRight.addEventListener("mouseout", () => {
    clearInterval(scrollInterval);
  });

  // Ajusta el desplazamiento para que vuelva a la última tarjeta al llegar al final
  testimonialsContainer.addEventListener("scroll", () => {
    if (testimonialsContainer.scrollLeft >= totalCards * cardWidth * cloneCount) {
      testimonialsContainer.scrollLeft = 0;
    } else if (testimonialsContainer.scrollLeft <= 0) {
      testimonialsContainer.scrollLeft = totalCards * cardWidth * (cloneCount - 1);
    }
  });
});