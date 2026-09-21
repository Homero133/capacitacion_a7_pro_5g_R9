document.addEventListener('DOMContentLoaded', () => {
    console.log("Sitio web inicializado.");

    // --- MÚSICA DE FONDO ---
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    let isPlaying = false;

    if(musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar Música';
            } else {
                bgMusic.play();
                musicBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar Música';
            }
            isPlaying = !isPlaying;
        });
    }

    // --- VIDEO INTRO (SLIDE 2) ---
    const btnComenzar = document.getElementById('btn-comenzar');
    const introVideoContainer = document.getElementById('intro-video-container');
    const introVideo = document.getElementById('intro-video');
    const skipIntroBtn = document.getElementById('skip-intro');

    function closeIntroAndScroll() {
        introVideoContainer.classList.remove('show');
        introVideo.pause();
        introVideo.currentTime = 0;
        
        // Hacer scroll a la siguiente sección (slide-3)
        const nextSlide = document.getElementById('slide-3');
        if(nextSlide) {
            nextSlide.scrollIntoView({ behavior: 'smooth' });
        }
    }

    if(btnComenzar && introVideoContainer && introVideo) {
        btnComenzar.addEventListener('click', () => {
            // Detener música de forma definitiva y ocultar el botón
            if (bgMusic) {
                bgMusic.pause();
                isPlaying = false;
            }
            if (musicBtn) {
                musicBtn.remove();
            }
            
            introVideoContainer.classList.add('show');
            introVideo.play();
        });

        // Cuando el video termina
        introVideo.addEventListener('ended', closeIntroAndScroll);
        
        // Botón de saltar intro
        if(skipIntroBtn) {
            skipIntroBtn.addEventListener('click', closeIntroAndScroll);
        }
    }

    // --- ACRÓNIMO BEST (SLIDE 7) COMPLETADO ---
    const letters = document.querySelectorAll('.acronym-letter');
    const closeBtns = document.querySelectorAll('.close-modal');
    const resumenContainer = document.getElementById('resumen-container');

    letters.forEach(letter => {
        letter.addEventListener('click', () => {
            // Marcar como completado al hacer clic
            letter.classList.add('completed');
            
            // Verificar si todos están completados
            const allCompleted = Array.from(letters).every(l => l.classList.contains('completed'));
            if (allCompleted && resumenContainer) {
                resumenContainer.style.display = 'block';
            }
        });
    });

    // Cerrar cualquier modal
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('show');
            // Si hay modales de video, pausarlos todos al cerrar
            const videos = btn.closest('.modal').querySelectorAll('video');
            videos.forEach(video => video.pause());
        });
    });

    // Cerrar clickeando fuera
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
            const videos = e.target.querySelectorAll('video');
            videos.forEach(video => video.pause());
        }
    });

});

// --- FUNCIÓN GLOBAL PARA ABRIR VIDEO (SLIDE 16) ---
window.openVideoModal = function(videoSrc) {
    const videoModal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('modal-video-player');
    
    if(videoModal && videoPlayer) {
        videoPlayer.src = videoSrc;
        videoModal.classList.add('show');
        videoPlayer.play();
    }
}

// --- FUNCIÓN GLOBAL PARA ABRIR IMAGEN ---
window.openImageModal = function(imgSrc) {
    const imageModal = document.getElementById('image-modal');
    const imagePlayer = document.getElementById('modal-image-player');
    
    if(imageModal && imagePlayer) {
        imagePlayer.src = imgSrc;
        imageModal.classList.add('show');
    }
}

// --- FUNCIÓN PARA MODAL FLUIDEZ ---
window.openFluidezModal = function() {
    const modal = document.getElementById('modal-fluidez');
    if(modal) {
        modal.classList.add('show');
        const videos = modal.querySelectorAll('video');
        videos.forEach(v => v.play());
    }
}
