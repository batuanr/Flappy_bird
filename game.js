let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let birdimg = new Image();
let pipeTop = new Image();
let pipeBot = new Image();
    birdimg.src = "bird.png";
    pipeTop.src = 'ongtren.png';
    pipeBot.src = "ongduoi.png";
let betweenPipe = 150;
let pipeDown = pipeTop.height + betweenPipe;
let score = 0;
let maxScore = localStorage.getItem('score');
let dy = 1;
let bird={
    x:canvas.width/4,
    y:canvas.height/2
}
let pipe = [];
pipe[0] = {
    x: canvas.width,
    y:0
}


function start() {
    ctx.clearRect(0,0,700,500)
    ctx.drawImage(birdimg,bird.x,bird.y);
    bird.y+=dy;
    dy *= 1.04

    ctx.font = '16px Arial'
    ctx.fillStyle = 'red'
    ctx.fillText('Score: '+score,5,20)
    ctx.fillText('Max Score: '+ maxScore,580,20)
    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeTop,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeBot,pipe[i].x,pipe[i].y + pipeDown);
        pipe[i].x -=5;
        if (pipe[i].x === canvas.width/2){
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random()*pipeTop.height) - pipeTop.height
            })
        }
        if (pipe[i].x === 0){
            pipe.splice(0,1);
        }
        if (pipe[i].x === bird.x){
            score++;
            localStorage.setItem('score',score)
            if (score > maxScore){
                maxScore = score;
            }
        }
        if (bird.y + birdimg.height > canvas.height - 20 ||
        bird.x + birdimg.width >= pipe[i].x && bird.x <= pipe[i].x + pipeTop.width
            && (bird.y < pipe[i].y + pipeTop.height ||
                bird.y + birdimg.height > pipe[i].y + pipeDown )){
            return;
        }
    }

    requestAnimationFrame(start)
    canvas.addEventListener("click", ()=>{
        start()
    })

}
document.addEventListener("keydown",  ()=>{
    bird.y-=40;
    dy = 1;
})
canvas.addEventListener("click", ()=>{
    start()
})