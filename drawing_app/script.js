/** finished 080222
 * smooth tools works better with dev tools opened
 * because of a potential bug ??
 * https://stackoverflow.com/questions/27367448/why-do-i-get-better-performance-in-chrome-when-dev-console-is-up
 * 
 * tried doing querySelector for a class on an img element but it didn't work???
 * 
 * some improvements could be more colours
 * and a direct download button ->
 * something to do with dataURL, MIME filetypes to load images
 */

const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
let painting = false;
let drawColour = "black";
let restore_array = [];
let index = -1;

let points = [];

let ctrlDown = false;
let brushSelector = document.getElementById("brush");
let widthSelector = document.querySelector(".range");

window.addEventListener('load', () => {
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;

    context.lineWidth = widthSelector.value;
    brush = brushSelector.value;
    console.log(`lineWidth : ${context.lineWidth}`);
    context.lineCap = "round";
    console.log("loaded");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
});

function startDrawing(e) {
    context.beginPath(); 
    painting = true;
    context.strokeStyle = drawColour;
    console.log(`painting: ${painting}`);

    draw(e);
}

function stopDrawing() {
    painting = false;
    context.closePath();
    console.log(`painting: ${painting}`);
    restore_array.push(context.getImageData(0, 0 , canvas.width, canvas.height));
    index += 1;

    points = [];
}

function draw(e){
    if(!painting) return;
    let xpos = e.clientX - canvas.offsetLeft - 4;
    let ypos = e.clientY - canvas.offsetTop - 4;
    if(brush === "grainy"){
        context.lineTo(xpos, ypos);
        context.stroke();
    }else if(brush === "smooth") {
        points.push(xpos);
        points.push(ypos);
        if(points.length >= 6) {
            context.moveTo(points[0], points[1]);
            context.quadraticCurveTo(points[2], points[3], points[4], points[5]);
            context.stroke();
            points = [];
            console.log("smooth drawing");
        }
    }
}

canvas.addEventListener("mousedown", (e) => {
    if(e.button == 0) {
        startDrawing(e);
    }
});
canvas.addEventListener("mouseup", () => {
    stopDrawing();
});

canvas.addEventListener("mousemove", (e) => {
    draw(e);
    console.log("moving");
});

draw_colour = document.getElementById("draw_colour");
draw_colour.addEventListener("input", () => {
    drawColour = draw_colour.value;
});

function clearContext() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    restore_array = [];
    index = -1;
}

function undo() {
    if (index <= 0){
        clearContext();
    }else{
        index -= 1;
        restore_array.pop();
        context.putImageData(restore_array[index], 0, 0);
    }
}

window.addEventListener("keydown", (e) => {
    if(e.keyCode == 17) {
        ctrlDown = true;
        console.log("control down");
    }

    if(ctrlDown == true && e.keyCode == 90) {
        undo();
        console.log("undo");
    }
});

window.addEventListener("keyup", (e) => {
    if(e.keyCode == 17) {
        ctrlDown = false;
        console.log("control up");
    }
});

brushSelector.addEventListener("input", () => {
    brush = brushSelector.value;
    console.log(brush);
});

widthSelector.addEventListener("input", () => {
    context.lineWidth = parseInt(widthSelector.value);
});