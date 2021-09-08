let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let birdimg = new Image();
let tubeUp = new Image();
let tubeDown = new Image();
    birdimg.src = "bird.png";
    tubeUp.src = 'ongtren.png';
    tubeDown.src = "ongduoi.png";
let betweenTube = 150;
let tubeLong = tubeUp.height + betweenTube;
let bird={
    x:canvas.width/4,
    y:canvas.height/2
}
let tube = [];
tube[0] = {
    x: canvas.width,
    y:0
}


function start() {
    ctx.clearRect(0,0,500,680)
    ctx.drawImage(birdimg,bird.x,bird.y);
    bird.y+=3
    for (let i = 0; i < tube.length; i++) {
        ctx.drawImage(tubeUp,tube[i].x,tube[i].y);
        ctx.drawImage(tubeDown,tube[i].x,tube[i].y + tubeLong)
        tube[i].x -=5
    }
    requestAnimationFrame(start)
}
start()