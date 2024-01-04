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
const videos = document.querySelectorAll('.video video');
const images = document.querySelectorAll('.image img');

videos.forEach(video => {
  video.addEventListener('click', () => {
    if (video.paused) {
      video.classList.add('active');
      video.play();
    } else {
      video.classList.remove('active');
      video.pause();
    }
  });

  video.addEventListener('mouseenter', () => {
    if (video.classList.contains('active')) {
      video.muted = false;
    }
  });

  video.addEventListener('mouseleave', () => {
    if (video.classList.contains('active')) {
      video.muted = true;
    }
  });

  video.setAttribute('loop', true);
});

images.forEach(image => {
  image.addEventListener('click', () => {
    image.classList.toggle('active');
  });
});
