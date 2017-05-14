console.log('Webbsidan är designad och byggd av Sandelin Webbyrå.\n\nhttps://sandelinwebbyra.se');

const hero = document.querySelector('section.hero');
const back = document.querySelector('article.back');

const container = document.querySelector('.video-container');

const video = document.createElement('video');
video.loop = true;

const source = document.createElement('source');
source.type = 'video/mp4';
source.src = 'media/trainhack-2016.mp4';

video.load();
video.addEventListener('loadeddata', () => {
  hero.classList.add('play');
  video.play();
});

video.appendChild(source);
container.appendChild(video);



const videoOverlay = document.querySelector('section.video-overlay');

function showVideoOverlay () {
  videoOverlay.classList.add('display');
  setTimeout(() => {
    videoOverlay.classList.add('show');
  }, 20);
}

function closeVideoOverlay () {
  videoOverlay.classList.remove('show');
  setTimeout(() => {
    videoOverlay.classList.remove('display');
  }, 400);
}

document.getElementById('watch-video').addEventListener('click', showVideoOverlay);

document.getElementById('close-video-overlay').addEventListener('click', closeVideoOverlay);