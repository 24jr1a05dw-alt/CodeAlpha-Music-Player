const songs = [

{
title:"Love me like you do",
artist:"Ellie Goulding",
src:"songs/love-me-like-you-do-mp3.mp3",
cover:"images/lovemelikeudo.jpg"
},

{
title:"perfect",
artist:"Ed Sheeran",
src:"songs/Perfect - Ed Sheeran.mp3",
cover:"images/perfect.jpg"
},

{
title:"Sahiba",
artist:"Aditya Rikhari",
src:"songs/Sahiba.mp3",
cover:"images/sahibha.jpg"
},

{
title:"Ordinary",
artist:"Alex Warren",
src:"songs/Alex warren - Ordinary.mp3",
cover:"images/ordinary.jpg"
}
];

const repeatBtn =
document.getElementById("repeat");

const shuffleBtn =
document.getElementById("shuffle");

const visualizer =
document.querySelector(".visualizer");

const searchSong =
document.getElementById("searchSong");

const playlistBtn =
document.getElementById("playlistBtn");

const playlistBox =
document.querySelector(".playlist-box");

const audio =
document.getElementById("audio");

const playBtn =
document.getElementById("play");

const nextBtn =
document.getElementById("next");

const prevBtn =
document.getElementById("prev");

const progress =
document.getElementById("progress");

const volume =
document.getElementById("volume");

const cover =
document.getElementById("cover");

const title =
document.getElementById("title");

const artist =
document.getElementById("artist");

const current =
document.getElementById("current");

const duration =
document.getElementById("duration");

const playlist =
document.getElementById("playlist");

let currentSong = 0;

let isRepeat = false;

repeatBtn.addEventListener("click",()=>{

isRepeat = !isRepeat;

repeatBtn.style.color =
isRepeat ? "cyan" : "black";

});

let isShuffle = false;

shuffleBtn.addEventListener("click",()=>{

isShuffle = !isShuffle;

shuffleBtn.style.color =
isShuffle ? "cyan" : "black";

});
function loadSong(index){

audio.src =
songs[index].src;

cover.src =
songs[index].cover;

title.textContent =
songs[index].title;

artist.textContent =
songs[index].artist;

updatePlaylist();

}

searchSong.addEventListener("input",()=>{

const value =
searchSong.value.toLowerCase();

const items =
document.querySelectorAll("#playlist li");

items.forEach((item,index)=>{

const title =
songs[index].title.toLowerCase();

const artist =
songs[index].artist.toLowerCase();

if(
title.includes(value) ||
artist.includes(value)
){
item.style.display="block";
}else{
item.style.display="none";
}

});

});

playlistBtn.addEventListener("click",()=>{

if(playlistBox.style.display==="block"){

playlistBox.style.display="none";

}else{

playlistBox.style.display="block";

}
playlistBox.classList.toggle("show");
});

function playSong(){

audio.play();

playBtn.innerHTML =
'<i class="fas fa-pause"></i>';

cover.classList.add("rotate-cover");
visualizer.classList.add("active");
}


function pauseSong(){

audio.pause();

playBtn.innerHTML =
'<i class="fas fa-play"></i>';
cover.classList.remove("rotate-cover");
visualizer.classList.remove("active");
}


playBtn.addEventListener(
"click",
()=>{

if(audio.paused){

playSong();

}else{

pauseSong();

}

}
);

nextBtn.addEventListener(
"click",
()=>{

if(isShuffle){

currentSong =
Math.floor(
Math.random() * songs.length
);

}else{

currentSong++;

}

if(
currentSong >= songs.length
){

currentSong = 0;

}

loadSong(currentSong);

playSong();

}
);


prevBtn.addEventListener(
"click",
()=>{

currentSong--;

if(
currentSong < 0
){

currentSong =
songs.length - 1;

}

loadSong(currentSong);

playSong();

}
);

audio.addEventListener(
"timeupdate",
()=>{

if(audio.duration){

progress.value =
(audio.currentTime /
audio.duration) * 100;

current.textContent =
formatTime(
audio.currentTime
);

}

}
);


audio.addEventListener(
"loadedmetadata",
()=>{

duration.textContent =
formatTime(
audio.duration
);

}
);

progress.addEventListener(
"input",
()=>{

audio.currentTime =
(progress.value / 100)
* audio.duration;

}
);

volume.addEventListener(
"input",
()=>{

audio.volume =
volume.value;

}
);
function formatTime(time){

const min =
Math.floor(time / 60);

const sec =
Math.floor(time % 60);

return `${min}:${sec < 10 ? "0"+sec : sec}`;

}
audio.addEventListener(
"ended",
()=>{

if(isRepeat){

audio.currentTime = 0;
playSong();

}else{

nextBtn.click();

}

}
);
function createPlaylist(){

songs.forEach(
(song,index)=>{

const li =
document.createElement("li");

li.innerHTML =
`
<div class="playlist-item">

<img src="${song.cover}" class="playlist-cover">

<div class="playlist-info">
<strong>${song.title}</strong>
<br>
<span>${song.artist}</span>
</div>

</div>
`;

li.addEventListener(
"click",
()=>{

currentSong = index;

loadSong(index);

playSong();

}
);

playlist.appendChild(li);

}
);

}

function updatePlaylist(){

const items =
document.querySelectorAll(
"#playlist li"
);

items.forEach(
(item,index)=>{

item.classList.remove(
"active"
);

if(
index === currentSong
){

item.classList.add(
"active"
);

}

}
);

}

document.addEventListener(
"keydown",
(e)=>{

if(e.code === "Space"){

e.preventDefault();

if(audio.paused){

playSong();

}else{

pauseSong();

}

}

if(e.code === "ArrowRight"){

nextBtn.click();

}

if(e.code === "ArrowLeft"){

prevBtn.click();

}

}
);

createPlaylist();

loadSong(currentSong);