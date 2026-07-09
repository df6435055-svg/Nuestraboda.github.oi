// Configuración de la fecha del evento (Año, Mes [0-11], Día, Hora, Minutos)
const eventDate = new Date(2026, 12, 11, 13, 0, 0).getTime(); // 11 de Diciembre de 2026 a la 1:00 PM

const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const difference = eventDate - now;

    // Cálculos matemáticos de conversión de tiempo
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Renderizado en el HTML agregando ceros a la izquierda si son menores a 10
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    // Acción en caso de cumplirse el tiempo límite
    if (difference < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "<p style='color:#2b5c8f; font-weight:600;'>¡Llegó el gran día!</p>";
    }
}, 1000);

// Abrir y cerrar fotos en pantalla completa
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imageSrc;
    lightbox.style.display = 'flex'; // Aquí se vuelve visible cubriendo la pantalla
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none'; // Se oculta de nuevo
}
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');

// Función para reproducir o pausar con el botón
function toggleMusic() {
    if (music.paused) {
        music.play().then(() => {
            musicIcon.innerText = "⏸️";
            musicBtn.classList.add('music-playing');
        }).catch(error => console.log("Reproducción bloqueada por el navegador"));
    } else {
        music.pause();
        musicIcon.innerText = "▶️";
        musicBtn.classList.remove('music-playing');
    }
}

// Alternativa automática: intenta reproducir al primer clic o interacción del usuario en la pantalla
document.addEventListener('click', () => {
    if (music.paused) {
        music.play().then(() => {
            musicIcon.innerText = "⏸️";
            musicBtn.classList.add('music-playing');
        }).catch(err => console.log("Esperando interacción directa..."));
    }
}, { once: true }); // '{ once: true }' asegura que este detector solo se ejecute la primera vez
// 1. Lista con las rutas exactas de todas tus fotos en orden
const images = [
    'nuestra_boda/foto1.jpeg',
    'nuestra_boda/foto4.jpeg',
    'nuestra_boda/foto6.jpeg',
    'nuestra_boda/foto9.jpeg',
    'nuestra_boda/foto11.jpeg',
    'nuestra_boda/foto12.jpeg',
    'nuestra_boda/foto2.jpeg',
    'nuestra_boda/foto3.jpeg',
    'nuestra_boda/foto5.jpeg' // Añade aquí la ruta de la foto 9 si falta
];

let currentIndex = 0;

// 2. Función para abrir la foto grande
function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = images[currentIndex];
    lightbox.style.display = 'flex'; // Muestra el contenedor
}

// 3. Función para cerrar el Lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.style.display = 'none';
}

// 4. Función para cambiar de foto (flechas izquierda/derecha)
function changeImage(direction) {
    currentIndex += direction;
    
    // Si se pasa del final, regresa a la primera
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    // Si se va antes de la primera, se pasa a la última
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    
    document.getElementById('lightbox-img').src = images[currentIndex];
}

