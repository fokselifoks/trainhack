console.log('This website was designed and built by Sandelin Webbyrå.\n\nhttps://sandelinwebbyra.se');


/* ==============================
  Hero background video
============================== */

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


/* ==============================
  Overlaying video player
============================== */

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
  heroVideo.pause();
  videoPlayer.playVideo();
  videoOverlay.classList.add('display');
  setTimeout(() => {
    videoOverlay.classList.add('show');
  }, 20);
}

function hideVideoOverlay () {
  heroVideo.play();
  videoPlayer.pauseVideo();
  videoOverlay.classList.remove('show');
  setTimeout(() => {
    videoOverlay.classList.remove('display');
  }, 400);
}

function addVideoOverlayEvents () {
  document.getElementById('watch-video').addEventListener('click', showVideoOverlay);
  document.querySelector('section.video-overlay').addEventListener('click', hideVideoOverlay);
  document.getElementById('close-video-overlay').addEventListener('click', (e) => {
    e.stopPropagation();
    hideVideoOverlay();
  });
  document.querySelector('section.video-overlay .overlay-content').addEventListener('click', (e) => {
    e.stopPropagation();
  });
}