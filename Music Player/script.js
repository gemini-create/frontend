let music = document.querySelector("#songs");
let img = document.querySelector("img");
console.log(img);
let title = document.querySelector(".music-titles .title");
console.log(title.innerText);
let artist = document.querySelector(".music-titles .artist");
console.log(artist.innerText);
let playPauseBtn = document.querySelector(".play-pause");
let bar = document.querySelector(".progress-bar");
let progressDiv = document.querySelector(".progress");
let count = 0;
let repeatOn = false;
let isShuffle = false;

let toolTips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
toolTips.forEach(tip=>{
    new bootstrap.Tooltip(tip);
})

function updateTooltip(btn,tip){
    let tooltipInstance = bootstrap.Tooltip.getInstance(btn); 
    btn.setAttribute("title",tip);
    tooltipInstance.setContent({ '.tooltip-inner': tip });
    tooltipInstance.hide(); 
}

const playlist = [
    {
        title : "Nara e Mastana",
        artist : "Abida Parveen",
        src : "Songs/Nara e Mastana.mp3",
        cover : "images/Nara e Mastana.jpg",
    },
     {
        title : "Karde Karam Tu",
        artist : "Samar Jafari",
        src : "Songs/Karde Karam Tu .mp3",
        cover : "images/Karde Karam Tu.jpg",
    },
     {
        title : "Bandeya",
        artist : "Shafqat Amanat Ali",
        src : "Songs/Bandeya.mp3",
        cover : "images/Bandeya.jpg",
    },
     {
        title : "Levitating",
        artist : "Dua Lipa",
        src : "Songs/Levitating.mp3",
        cover : "images/Leviatating.jpg",
    }
]

let controlsBtn = document.querySelectorAll(".controls button"); 
controlsBtn.forEach(btn=>{
    console.log(btn);
    btn.addEventListener("click",()=>{
        if(btn.classList.contains("fa-repeat")){
            console.log("repeat btn");
            let tooltipInstance = bootstrap.Tooltip.getInstance(btn);
            tooltipInstance.hide(); 

            if(!repeatOn){
                repeatOn = true;
                updateTooltip(btn,"Repeat Off");
                console.log("Repeat enabled");
                playSong();
            }
            else if (repeatOn){
                repeatOn = false;
                updateTooltip(btn,"Repeat On");
                console.log("Repeat disabled");
                playSong();
            }
            else{
                console.log("Repeat Error");
            }
        }
        else if(btn.classList.contains("fa-backward-step")){
            console.log("previous btn");
            let tooltipInstance = bootstrap.Tooltip.getInstance(btn);
            tooltipInstance.hide(); 
            previousSong();
        }
        else if(btn.classList.contains("play-pause")){
            if(btn.classList.contains("fa-play")){
               playSong();
            }
            else{
               pauseSong();
            }
        }
        else if(btn.classList.contains("fa-forward-step")){
             console.log("next btn");
             let tooltipInstance = bootstrap.Tooltip.getInstance(btn);
             tooltipInstance.hide(); 

            nextSong();
        }
        else if(btn.classList.contains("fa-shuffle")){
            console.log("shuffle btn");
            let tooltipInstance = bootstrap.Tooltip.getInstance(btn);
            tooltipInstance.hide();

            if(!isShuffle){
                isShuffle = true;
                updateTooltip(btn,"Shuffle Off");
                let randomIndex = Math.floor(Math.random() * (playlist.length-1))+ 0;
                loadData(randomIndex);
                playSong();
                console.log("Shuffle enabled");
            }
            else if (isShuffle){
                isShuffle = false;
                updateTooltip(btn,"Shuffle On");
                console.log("Shuffle disabled");
            }

            else{
                console.log("Shuffle Error");
            }
        }
        else{
            console.log("Error");
        }
    });
});

function loadData(index){
    title.innerHTML= playlist[index].title;
    artist.innerHTML = playlist[index].artist;
    img.src = playlist[index].cover;
    music.src = playlist[index].src;
}

function playSong(){
     playPauseBtn.classList.remove("fa-play");
     playPauseBtn.classList.add("fa-circle-pause");
     updateTooltip(playPauseBtn, "Pause");
     music.play();
}

function pauseSong(){
    playPauseBtn.classList.remove("fa-circle-pause");
    playPauseBtn.classList.add("fa-play");
    updateTooltip(playPauseBtn, "Play");
    music.pause();
}

function previousSong(){
    if(isShuffle){
        shuffling();
    }
    else{
        count--;
        if(count < 0){
            count = playlist.length-1;
        }
        else{
            count = count;
        }
    }
    loadData(count);
    playSong();
}

function nextSong(){
    if(isShuffle){
        shuffling();
    }
    else{
        count++;
        if(count >= playlist.length){
            count = 0;
        }
        else{
            count = count;
        }
    }
    loadData(count);
    playSong();
}

function shuffling(){
    let randomIndex;
        do
        {
            randomIndex = Math.floor(Math.random() * (playlist.length-1));
        }while(randomIndex === count);
        count = randomIndex;
}

music.addEventListener("timeupdate", (e) => {
    let initialTime = e.target.currentTime;
    let finalTime = e.target.duration;
    let progressBarWidth = (initialTime) / (finalTime) * 100;
    bar.style.width = progressBarWidth+"%";

//Timer
    music.addEventListener("loadeddata", ()=>{
    let finalTimeData = document.querySelector(".final");

    //Update finalDuration
    let musicDuration = music.duration;
    let finalMinutes = Math.floor(musicDuration / 60);
    let finalSeconds = Math.floor(musicDuration % 60);
    if(finalSeconds < 10){
      finalSeconds = "0"+finalSeconds;
    }
    finalTimeData.innerText = finalMinutes +":"+finalSeconds;
  });

  //Update Current Duration
  let currentTime = document.querySelector(".current");
  let Current = music.currentTime;
  let currentMinutes = Math.floor(Current / 60);
  let currentSeconds = Math.floor(Current % 60);
  if(currentSeconds < 10){
    currentSeconds = "0"+currentSeconds;
  }
  currentTime.innerText = currentMinutes+":"+currentSeconds;

});

//Bar
 progressDiv.addEventListener("click", (e)=>{
    let progressValue =progressDiv.clientWidth; //total width of bar
    let clickedOffsetX = e.offsetX;     //how far from the left  clicked
    let MusicDuration = music.duration; //total seconds of the song

    music.currentTime = (clickedOffsetX / progressValue) * MusicDuration;
  });


music.addEventListener("ended", () => {
    console.log("Song ended.");
    if (repeatOn) {
        music.currentTime = 0; // restart same song
        playSong();
    }
    else{
    nextSong();
    }
});

music.addEventListener("error", (e) => {
    console.error("Audio Error:", e);
});
    