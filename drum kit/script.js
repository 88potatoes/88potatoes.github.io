const audios = document.querySelectorAll("audio");
const buttons = document.querySelectorAll(".button");

audios.forEach(track => {
    track.addEventListener("ended", () => {
        let button = document.querySelector(`.button[data-key="${track.getAttribute("data-key")}"]`);
        button.classList.remove("ringing");
    });
});

window.addEventListener("keydown", (e) => {
    let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if(!audio) return;

    //plays the audio
    audio.currentTime = 0;
    audio.play();

    //runs the animation
    let button = document.querySelector(`.button[data-key="${e.keyCode}"]`);
    button.classList.add('playing', 'ringing');
});

buttons.forEach(button => {
    button.addEventListener("transitionend", (e) => {
        if(e.propertyName == 'transform') {
            button.classList.remove("playing");
        }
    });
});


