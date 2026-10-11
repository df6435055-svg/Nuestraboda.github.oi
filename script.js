document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  const musicToggleBtn = document.getElementById("music-toggle");

  if (audio) {
    audio.loop = true;

    // Función que detecta el primer toque o scroll en el celular para liberar el audio
    const unlockAndPlay = () => {
      audio.play().then(() => {
        // Si arrancó con éxito, cambiamos el texto del botón
        if (musicToggleBtn) musicToggleBtn.textContent = "🔇 Pausar Música";
      }).catch(err => {
        console.log("El navegador pidió otra interacción:", err);
      });

      // Eliminamos los detectores para que solo ocurra en el primer toque
      document.removeEventListener("click", unlockAndPlay);
      document.removeEventListener("touchstart", unlockAndPlay);
      document.removeEventListener("scroll", unlockAndPlay);
    };

    // Escuchamos cualquier toque, clic o deslizamiento en el celular
    document.addEventListener("click", unlockAndPlay);
    document.addEventListener("touchstart", unlockAndPlay);
    document.addEventListener("scroll", unlockAndPlay);

    // Permitir pausar y reproducir manualmente con el botón flotante
    if (musicToggleBtn) {
      musicToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita conflictos con el evento de la pantalla
        if (audio.paused) {
          audio.play();
          musicToggleBtn.textContent = "🔇 Pausar Música";
        } else {
          audio.pause();
          musicToggleBtn.textContent = "🎵 Reproducir Música";
        }
      });
    }
  }
});

  // --- 2. CUENTA REGRESIVA ---
  const weddingDate = new Date("December 11, 2026 17:00:00").getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const setElementText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setElementText("days", days);
    setElementText("hours", hours);
    setElementText("minutes", minutes);
    setElementText("seconds", seconds);
  };

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // --- 3. GALERÍA Y LIGHTBOX (Apertura, cambio y cierre) ---
  
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const photoItems = document.querySelectorAll(".photo-item img");
  
  let currentIndex = 0;
  const imagesSrc = Array.from(photoItems).map(img => img.getAttribute("src"));

  // Asignar el evento de clic automáticamente a cada foto de la galería
  photoItems.forEach((img, index) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      currentIndex = index;
      if (lightbox && lightboxImg) {
        lightboxImg.src = imagesSrc[currentIndex];
        lightbox.style.display = "flex";
      }
    });
  });

  // Funciones globales para los botones del Lightbox
  window.closeLightBox = function() {
    if (lightbox) lightbox.style.display = "none";
  };

  window.changeImage = function(direction) {
    if (imagesSrc.length === 0) return;
    currentIndex += direction;
    if (currentIndex < 0) {
      currentIndex = imagesSrc.length - 1;
    } else if (currentIndex >= imagesSrc.length) {
      currentIndex = 0;
    }
    if (lightboxImg) {
      lightboxImg.src = imagesSrc[currentIndex];
    }
  };

  // Cerrar tocando el fondo oscuro
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightBox();
      }
    });
  }
});
