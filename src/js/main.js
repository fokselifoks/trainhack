console.log('This website was designed and built by Sandelin Webbyrå.\n\nhttps://sandelinwebbyra.se');

let mobile = (document.body.offsetWidth <= 1024);
window.addEventListener('resize', () => {
  mobile = (document.body.offsetWidth <= 1024);
})

/*
  ==============================
    Hero background video
  ==============================
*/

function buildBackgroundVideo () {
  const container = document.querySelector('.video-container');

  const video = document.createElement('video');
  video.loop = true;

  const source = document.createElement('source');
  source.type = 'video/mp4';
  source.src = 'media/trainhack-2016.mp4';

  video.appendChild(source);
  container.appendChild(video);

  video.load();
  video.addEventListener('loadeddata', () => {
    document.querySelector('section.hero').classList.add('play');
    video.play();
  });

  return video;
}
const heroVideo = buildBackgroundVideo();


/*
  ==============================
    Overlaying video player
  ==============================
*/

const script = document.createElement('script');
script.src = 'https://www.youtube.com/iframe_api';

const firstScript = document.getElementsByTagName('script')[0];
firstScript.parentNode.insertBefore(script, firstScript);

const videoOverlay = document.querySelector('section.video-overlay');
let videoPlayer;
let done = false;
function onYouTubeIframeAPIReady () {
  videoPlayer = new YT.Player('video-placeholder', {
    videoId: '68ovvJuZ5aA'
  });
  addVideoOverlayEvents();
}

function showVideoOverlay () {
  if (!mobile) {
    heroVideo.pause();
    videoPlayer.playVideo();
  }
  videoOverlay.classList.add('display');
  setTimeout(() => {
    videoOverlay.classList.add('show');
  }, 20);
}

function hideVideoOverlay () {
  if (!mobile) {
    heroVideo.play();
    videoPlayer.pauseVideo();
  }
  videoOverlay.classList.remove('show');
  setTimeout(() => {
    videoOverlay.classList.remove('display');
  }, 400);
}

function addVideoOverlayEvents () {
  document.getElementById('watch-video').addEventListener('click', showVideoOverlay);
  document.querySelector('section.video-overlay').addEventListener('click', hideVideoOverlay);
  document.getElementById('hide-video-overlay').addEventListener('click', (e) => {
    e.stopPropagation();
    hideVideoOverlay();
  });
  document.querySelector('section.video-overlay .overlay-content').addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

/*
  ==============================
    Overlaying sign up form
  ==============================
*/

const signupOverlay = document.querySelector('section.signup-overlay');

function showSignupOverlay () {
  signupOverlay.classList.add('display');
  setTimeout(() => {
    signupOverlay.classList.add('show');
  }, 20);
}

function hideSingupOverlay () {
  signupOverlay.classList.remove('show');
  setTimeout(() => {
    signupOverlay.classList.remove('display');
  }, 400);
}

if (document.getElementById('sign-up')) {
  document.getElementById('sign-up').addEventListener('click', showSignupOverlay);
}

document.querySelector('section.signup-overlay').addEventListener('click', hideSingupOverlay);
document.getElementById('hide-signup-overlay').addEventListener('click', (e) => {
  e.stopPropagation();
  hideSingupOverlay();
});
document.querySelector('section.signup-overlay .overlay-content').addEventListener('click', (e) => {
  e.stopPropagation();
});

document.getElementById('signup-email').addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    document.getElementById('send-singup').click();
  }
});

/*
  ==============================
    Time table slider
  ==============================
*/

const timeTableContainer = document.querySelector('.time-table');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

const slider = new Swiper(timeTableContainer, {
  slidesPerView: 'auto',
  centeredSlides: true,
  observeParents: true,
  onSlideChangeStart: (swiper) => {
    const index = swiper.activeIndex;
    const prevHas = prev.classList.contains('disable');
    const nextHas = next.classList.contains('disable');
    if (index > 0 && prevHas) prev.classList.remove('disable');
    if (index === 0 && !prevHas) prev.classList.add('disable');
    if (index < (swiper.slides.length - 1) && nextHas) next.classList.remove('disable');
    if (index === (swiper.slides.length - 1) && !nextHas) next.classList.add('disable');
  }
});

next.addEventListener('click', () => {
  slider.slideNext();
});

prev.addEventListener('click', () => {
  slider.slidePrev();
});

/*
  ==============================
    Event subjects
  ==============================
*/

let subjectOverlayMoving = false;
let subjectOverlayHidden = true;
const subjectOverlay = document.querySelector('.subject-overlay');
const subjects = document.querySelectorAll('ul.links.subjects li');
for (let i = 0; i < subjects.length; i++) {
  subjects[i].addEventListener('click', subjectClick);
}

subjectOverlay.querySelector('.close').addEventListener('click', () => {
  toggleSubjectOverlay();
});

subjectOverlay.querySelector('.subject-info').addEventListener('click', (e) => {
  e.stopPropagation();
});

function subjectClick () {
  const title = this.querySelector('p').innerHTML;
  const text = this.querySelector('p.info').innerHTML;

  subjectOverlay.querySelector('h3').innerText = title;
  subjectOverlay.querySelector('p').innerHTML = text;
  toggleSubjectOverlay();
}

function toggleSubjectOverlay () {
  if (subjectOverlayMoving) return;

  subjectOverlayMoving = true;
  if (subjectOverlayHidden) {
    subjectOverlay.classList.add('display');
    setTimeout(() => {
      subjectOverlay.classList.add('show');

      if (window.innerWidth <= 568) {
        const bodyRect = document.body.getBoundingClientRect();
        const elemRect = subjectOverlay.querySelector('.subject-info').getBoundingClientRect();
        const offset = elemRect.top - bodyRect.top - 50;
        window.scrollTo(0, offset);
      }
      window.addEventListener('click', toggleSubjectOverlay);

      setTimeout(() => {
        subjectOverlayMoving = false;
      }, 300);
    }, 20);
  } else {
    subjectOverlay.classList.remove('show');
    window.removeEventListener('click', toggleSubjectOverlay);
    setTimeout(() => {
      subjectOverlay.classList.remove('display');
      setTimeout(() => {
        subjectOverlayMoving = false;
      }, 20);
    }, 300);
  }

  subjectOverlayHidden = !subjectOverlayHidden;
}
