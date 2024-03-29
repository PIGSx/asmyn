const h1 = document.getElementById("h1");
const banner = document.getElementById("banner");
const button = document.getElementById("button");

const onScroll = () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 150) {
    banner.style.backgroundSize = "150%";
    h1.style.opacity = 0;
    h1.style.transform = "translate(0, -50px) scale(0.9)";
    button.style.opacity = 0;
    button.style.transform = "translate(0, -50px) scale(0.8)";
  } else {
    banner.style.backgroundSize = "180%";
    h1.style.opacity = 1;
    h1.style.transform = "translate(0, 0) scale(1)";
    button.style.opacity = 1;
    button.style.transform = "translate(0, 0) scale(1)";
  }
};

document.addEventListener("scroll", onScroll);

// gallery
let activeVideo = null;
let activeImage = null;

const videos = document.querySelectorAll('.video video');
const images = document.querySelectorAll('.image img');

videos.forEach(video => {
  video.addEventListener('click', () => {
    if (activeImage !== null) {
      activeImage.classList.remove('active');
      activeImage = null;
    }

    videos.forEach(v => {
      if (v !== video) {
        v.pause();
        v.currentTime = 0; // Reinicia o vídeo para a posição inicial ao "fechar"
        v.classList.remove('active');
      }
    });

    if (video !== activeVideo) {
      if (activeVideo !== null) {
        activeVideo.pause();
        activeVideo.currentTime = 0; // Reinicia para o início
        activeVideo.classList.remove('active');
      }
      activeVideo = video;
      activeVideo.classList.add('active');
      activeVideo.controls = true;
      activeVideo.play();
    } else {
      if (!activeVideo.paused) {
        activeVideo.pause();
      }
      activeVideo.currentTime = 0; // Reinicia para o início
      activeVideo.classList.remove('active');
      activeVideo.removeAttribute('controls'); // Remove os controles do vídeo
      activeVideo = null;
    }
  });

  video.addEventListener('mouseenter', () => {
    if (video.classList.contains('active')) {
      video.controls = true;
      video.muted = false;
      video.play();
    }
  });

  video.addEventListener('mouseleave', () => {
    if (video.classList.contains('active') && video.paused) {
      video.controls = false;
      video.muted = true;
    }
  });

  video.addEventListener('ended', () => {
    video.currentTime = 0; // Reinicia o vídeo para a posição inicial ao terminar de reproduzir
  });

  video.setAttribute('loop', true);
});

images.forEach(image => {
  image.addEventListener('click', () => {
    if (activeVideo !== null) {
      activeVideo.classList.remove('active');
      activeVideo.pause();
      activeVideo.currentTime = 0; // Reinicia o vídeo para a posição inicial
      activeVideo = null;
    }

    if (image !== activeImage && activeImage !== null) {
      activeImage.classList.remove('active');
    }

    image.classList.toggle('active');
    activeImage = image;
  });
});

// sair do video 
const videoContainers = document.querySelectorAll('.gallery .video');

// Função para fechar o vídeo e mostrar a imagem correspondente
function closeVideoIfClickedOutside(event) {
  const clickedVideoContainer = event.target.closest('.video');

  if (!clickedVideoContainer) {
    videoContainers.forEach(container => {
      const video = container.querySelector('video');
      const image = container.previousElementSibling;

      if (video && !video.paused) {
        video.pause();
        video.currentTime = 0; // Reinicia para o início
        video.classList.remove('active');

        // Mostra a imagem associada ao vídeo
        image.style.display = 'block';
      }
    });
  } else {
    const video = clickedVideoContainer.querySelector('video');

    if (video && !video.classList.contains('active')) {
      videos.forEach(v => {
        v.pause();
        v.currentTime = 0;
        v.classList.remove('active');
      });

      video.classList.add('active');
      video.play();
    }
  }
}

document.addEventListener('click', closeVideoIfClickedOutside);
document.addEventListener('touchstart', closeVideoIfClickedOutside);
