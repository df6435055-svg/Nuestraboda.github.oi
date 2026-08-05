// ==========================================
// 1. CONFIGURACIÓN DE LA FECHA Y CUENTA REGRESIVA
// ==========================================
const eventDate = new Date(2026, 12, 11, 13, 0, 0); // Ajusta aquí la fecha objetivo[span_0](start_span)[span_0](end_span)

function updateCountdown() {
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
        if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ==========================================
// 2. CONTROL DE MÚSICA DE FONDO (COMPATIBLE CON IOS)
// ==========================================

function playMusic() {
    const music = document.getElementById('bg-music');
    const icon = document.getElementById('music-icon');

    if (music) {
        music.load(); // Fuerza el buffer en dispositivos iOS
        const promise = music.play();

        if (promise !== undefined) {
            promise.then(() => {
                if (icon) icon.innerText = "⏯️";
            }).catch(() => {
                // Silencia el error en consola si Safari retiene el audio
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
            if (icon) icon.innerText = "⏯️";
        }).catch(e => console.log("Audio detenido:", e));
    } else {
        music.pause();
        if (icon) icon.innerText = "🔇";
    }
}

// Inicializa el reproductor con la primera interacción del usuario en móviles
['touchstart', 'click'].forEach(eventType => {
    document.addEventListener(eventType, function initAudioOnTouch() {
        const music = document.getElementById('bg-music');
        if (music && music.paused) {
            playMusic();
        }
    }, { once: true });
});


// ==========================================
// 3. GALERÍA DE FOTOS / LIGHTBOX (COMPATIBLE CON TOUCH)
// ==========================================
// Nota: Verifica que el nombre exacto de la carpeta y archivos coincida con GitHub (Respetando Mayúsculas y Minúsculas)[span_1](start_span)[span_1](end_span)
const images = [
    'nuestra_boda/foto1.jpeg',
    'nuestra_boda/foto4.jpeg',
    'nuestra_boda/foto6.jpeg',
    'nuestra_boda/foto9.jpeg'
    'nuestra_boda/foto11.jpeg',
    'nuestra_boda/foto12.jpeg',
    'nuestra_boda/foto2.jpeg',
    'nuestra_boda/foto3.jpeg'
    'nuestra_boda/foto5.jpeg'
];

let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (lightbox && lightboxImg) {
        lightboxImg.src = images[currentIndex];
        lightbox.style.display = 'flex';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
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
