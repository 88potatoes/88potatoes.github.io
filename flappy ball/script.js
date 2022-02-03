//start 010222 - end ??????

let screen = document.querySelector(".screen");
let scoreboard = document.querySelector(".score");
let pipeArray = [];
let gameIsPlaying = true;
let gap = 200;
let score = 0;
class Pipes {
    constructor(hstart, hend){
        this.x = 720;
        this.hstart = hstart;
        this.hend = hend;
        this.width = 70;
        this.speed = 1;
        this.top = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.bot = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.topDict = {"x": `${this.x}`, "y": "0", "width": `${this.width}`, "height": `${this.hstart}`, "fill": "#2A9D8F"};
        this.botDict = {"x": `${this.x}`, "y": `${this.hend}`, "width": `${this.width}`, "height": `${1280 - this.hend}`, "fill": "#2A9D8F"};
        this.scored = false;
        screen.appendChild(this.top);
        screen.appendChild(this.bot);
        for(var key in this.topDict){
            this.top.setAttribute(key, this.topDict[key]);
        }

        for(var key in this.botDict){
            this.bot.setAttribute(key, this.botDict[key]);
        }
    }

    //moves the pipes left
    move(){
        this.x -= this.speed;
        this.top.setAttribute("x", `${this.x}`);
        this.bot.setAttribute("x", `${this.x}`);
    }

    //returns whether or not the pipes are in collision with the bird
    collides(){
        if(bird.x + bird.length > this.x
            && bird.x < this.x + this.width
            && bird.y < this.hstart
            && bird.y + bird.length > 0) {
                return true;
        }else if (bird.x < this.x + this.width
            && bird.x + bird.length > this.x
            && bird.y < 1280
            && bird.y + bird.length > this.hend){
            return true;
        }else{
            return false;
        }
    }

    update() {
        this.move();

        if(this.collides()) {
            console.log("COLLIDE");
            gameIsPlaying = false;
        }

        if(this.x + this.width < 0) {
            console.log("REMOVED")
            this.top.remove();
            this.bot.remove();
            pipeArray.pop();
        }
        
        //scoring
        if(!this.scored && this.x + this.width < bird.x){
            score++;
            this.scored = true;

            scoreboard.innerHTML = `SCORE: ${score}`;
        }
    }
}

//the gameloop
window.requestAnimationFrame(gameLoop);

let oldTimeStamp;
let secondsPassed;
let fps;
let smoothing = 0.9;
let oldfps = 0;
let fpsSmoothed = 0;
function gameLoop (timeStamp){
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    fps = Math.round(1 / secondsPassed);
    
    if(gameIsPlaying){
        update();

        window.requestAnimationFrame(gameLoop);
    }    
}

function update() {
    createPipes();

    bird.update();

    for(let i = 0; i < pipeArray.length; i++){
        pipeArray[i].update();
    }
}

//adding pipes to the game
const framesPerPipe = 400;
let p = framesPerPipe - 1;
function createPipes() {
    p++;
    if(p >= framesPerPipe){
        p = 0;
        let n = Math.floor(Math.random() * (720 - gap));
        pipeArray.unshift(new Pipes(n, n + gap));
    }
}


class Bird {
    constructor() {
        this.x = 80;
        this.y = 640;
        this.length = 40;
        this.bird = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.birdDict =  {"x": `${this.x}`, "y": `${this.y}`, "width": `${this.length}`, "height": `${this.length}`};
        this.gravity = 0.1;
        this.velocity = 0;
        this.jumpvelocity = 8;
        this.atBottom = false;
        this.atTop = false;

        for(let key in this.birdDict) {
            this.bird.setAttribute(key, this.birdDict[key]);
        }

        screen.appendChild(this.bird);
    }

    jump() {
        console.log("jump");
        if(this.atBottom) {
            this.velocity = 0;
            this.atBottom = false;
        }

        this.velocity -= this.jumpvelocity;
    }

    update() {
        if(!this.atBottom){
            this.velocity += this.gravity;
            this.y += this.velocity;

            if(this.y + this.length >= 1280) {
                this.y = 1280 - this.length;
                this.atBottom = true;
            }
        }

        if(this.y < 0){
            this.y = 0;
            this.velocity = 0;
        }

        this.bird.setAttribute("y", `${this.y}`);
    }

}

let bird = new Bird();

document.body.onkeydown = (e) => {
    if(e.keyCode == 32) {
        gameIsPlaying ? bird.jump() : resetGame();
    }
}

function resetGame() {
    console.log()
    a = pipeArray.length;
    for(let i = 0; i < a; i++) {
        pipeArray[0].top.remove();
        console.log("removed a pair");
        pipeArray[0].bot.remove();
        pipeArray.shift();
    }

    gameIsPlaying = true;
    p = framesPerPipe - 1;
    window.requestAnimationFrame(gameLoop);

    score = 0;
    scoreboard.innerHTML = `SCORE: ${score}`;
}