const hero = document.querySelector('section.hero');
const container = document.querySelector('article.video-container');

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