
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
}, 1000);unction playMusic() {
    const music = document.getElementById('bg-music');
    const icon = document.getElementById('music-icon');
    
    if (music) {
        // Cargar explícitamente el recurso de audio antes de reproducir en iOS
        music.load(); 
        const promise = music.play();
        
        if (promise !== undefined) {
            promise.then(() => {
                if (icon) icon.innerText = "🎵";
            }).catch(error => {
                console.log("iOS desbloquea el audio al primer toque interactivo.");
            });
        }
    }
}

function toggleMusic() {
    const music = document.getElementById('bg-music');
    const icon = document.getElementById('music-icon');
    
    if (!music) return;

    if (music.paused) {
        music.play().then(() => {
            if (icon) icon.innerText = "🎵";
        }).catch(e => console.log("Error al reproducir audio:", e));
    } else {
        music.pause();
        if (icon) icon.innerText = "🔇";
    }
}

// Activar reproducción con cualquier evento táctil en la pantalla para Safari
['touchstart', 'click'].forEach(eventType => {
    document.addEventListener(eventType, function initAudioOnTouch() {
        const music = document.getElementById('bg-music');
        if (music && music.paused) {
            playMusic();
        }
    }, { once: true });
});

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

function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (lightbox && lightboxImg) {
        lightboxImg.src = images[currentIndex];
        // Forzar estilos inline para asegurar visibilidad en Safari
        lightbox.style.display = 'flex';
        lightbox.style.visibility = 'visible';
        lightbox.style.opacity = '1';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        lightbox.style.opacity = '0';
    }
}

function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
        lightboxImg.src = images[currentIndex];
    }
}

