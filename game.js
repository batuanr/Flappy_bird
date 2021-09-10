// cho canvas vào
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

//khởi tạo hình ảnh và các biến
let birdimg1 = new Image();
let end = new Image();
let end2 = new Image();
let disPlayImg = new Image();
let pipeTop = new Image();
let pipeBot = new Image();

    birdimg1.src = "img/bird1.png";
    end.src = "img/end.png";
    end2.src = "img/reset.png";
    disPlayImg.src = 'img/nen2.png';
    pipeTop.src = 'img/ongtren.png';
    pipeBot.src = "img/ongduoi.png";
    // chèn thêm nhạc
let dieAudio = new Audio();
let hitAudio = new Audio();
let pointAudio = new Audio();
let wingAudio = new Audio();
    dieAudio.src = 'audio/die.mp3';
    hitAudio.src = 'audio/hit.mp3';
    pointAudio.src = 'audio/point.mp3';
    wingAudio.src = 'audio/wing.mp3';


let maxScore = localStorage.getItem('score');
let betweenPipe = 150;
let pipeDown = pipeTop.height + betweenPipe;
let score = 0;

let dy = 1;
let dx = 5;
// tạo đối tượng bird
let bird={
    x:canvas.width/4,
    y:canvas.height/2
}
// tạo đối tượng pipe
let pipe = [];
pipe[0] = {
    x: canvas.width,
    y:0
}
 // bắt đầu tạo disPlay
function disPlay() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(disPlayImg,0,0);
    ctx.drawImage(birdimg1,bird.x,bird.y);
    bird.y+=dy;
    dy *= 1.04;

    ctx.font = '16px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText('Score: '+score,5,20);
    ctx.fillStyle = 'blue';
    ctx.fillText('Max Score: '+ maxScore,580,20);
    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeTop,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeBot,pipe[i].x,pipe[i].y + pipeDown);
        pipe[i].x -= dx;
        if (pipe[i].x === canvas.width/2){
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random()*pipeTop.height) - pipeTop.height
            })
        }
        if (pipe[i].x + pipeTop.width === 0){
            pipe.splice(0,1);
        }
        if (pipe[i].x === bird.x){
            score++;
            pointAudio.play();

            if (score > maxScore){
                maxScore = score;
                localStorage.setItem('score',score);
            }
        }
        if (bird.x + birdimg1.width >= pipe[i].x && bird.x <= pipe[i].x + pipeTop.width
            && (bird.y < pipe[i].y + pipeTop.height ||
                bird.y + birdimg1.height > pipe[i].y + pipeDown )){
            return  (
                hitAudio.play(),
                ctx.drawImage(end,250,100),
                    ctx.drawImage(end2,290,270),
                    score=0
            )

        }
        if (bird.y + birdimg1.height > canvas.height - 20){
            return  (
                dieAudio.play(),
                ctx.drawImage(end,250,100),
                    ctx.drawImage(end2,290,270),
                    score=0
            )
        }
    }

    requestAnimationFrame(disPlay);


}
// cho bird nhảy lên
// document.addEventListener("keydown",  ()=>{
//     if (bird.y+birdimg1.height < canvas.height - 20){
//         bird.y-=40;
//         wingAudio.play()
//         dy = 1;
//     }
// })
// hàm lấy tọa độ xy của chuột
function printMousePos(e) {
    let cursorX = e.pageX;
    let cursorY = e.pageY;
    if (cursorX>= 300 && cursorX <= 345 && cursorY >= 280 && cursorY <= 345 && score === 0){
        start()
    }
}
// và gọi hàm
document.addEventListener("click", printMousePos);


function start() {
     pipeDown = pipeTop.height + betweenPipe;
     score = 0;

    dy = 1;
    dx = 5;
     bird={
        x:canvas.width/4,
        y:canvas.height/2
    }
     pipe = [];
    pipe[0] = {
        x: canvas.width,
        y:0
    }

    disPlay();
    document.addEventListener("keydown",  ()=>{
        if (bird.y+birdimg1.height < canvas.height - 20){
            bird.y-=40;
            wingAudio.play()
            dy = 1;
        }
    })
}
