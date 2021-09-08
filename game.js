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
let score = 0;
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
    ctx.clearRect(0,0,700,500)
    ctx.drawImage(birdimg,bird.x,bird.y);
    bird.y+=3

    ctx.fillText('Score: '+score,5,20)
    for (let i = 0; i < tube.length; i++) {
        ctx.drawImage(tubeUp,tube[i].x,tube[i].y);
        ctx.drawImage(tubeDown,tube[i].x,tube[i].y + tubeLong);
        tube[i].x -=5;
        if (tube[i].x === canvas.width/2){
            tube.push({
                x: canvas.width,
                y: Math.floor(Math.random()*tubeUp.height) - tubeUp.height
            })
        }
        if (tube[i].x === 0){
            tube.splice(0,1);
        }
        if (tube[i].x === bird.x) score++;
        if (bird.y + birdimg.height > canvas.height - 20 ||
        bird.x + birdimg.width >= tube[i].x && bird.x <= tube[i].x + tubeUp.width
            && (bird.y <= tube[i].y + tubeUp.height ||
                bird.y + birdimg.height >= tube[i].y + tubeDown.height)){
            return;
        }
    }

    requestAnimationFrame(start)

}
document.addEventListener("keydown", function (){
    bird.y-=30
})
start()