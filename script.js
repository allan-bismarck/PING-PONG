var btStart;
var ball;
var CPU;
var player;
var painelPoints;

var game, frames;

var posBallX, posBallY;
var posPlayerX, posPlayerY;
var posCpuX, posCpuY;

var dirJy;

var posPlayerStartY = 180, posPlayerStartX = 10, posCpuStartX = 930, posCpuStartY = 180, posBallStartX = 475, posBallStartY = 250;

var fieldX = 0, fieldY = 0, fieldWidth = 960, fieldHeight = 500;
var barWidth = 20, barHeight = 140, ballWidth = 20, ballHeight = 20;

var ballX, ballY;
var cpuY = 0;

var velBall, velCpu, velPlayer;

var points = 0;
var key;
var gaming = false;

function CPUController() {
    if(gaming) {
        if((posBallX > (fieldWidth/2)) && (ballX > 0)) {
            if(((posBallY + (ballHeight/2)) > ((posCpuY + (barHeight/2))) + velCpu)) {
                if ((posCpuY + barHeight) <= fieldHeight) {
                    posCpuY += velCpu;
                }
            } else if((posBallY + (ballHeight/2)) < (posCpuY + (barHeight/2)) - velCpu) {
                if ((posCpuY + barHeight) <= fieldHeight) {
                    posCpuY -= velCpu;
                }
            }
        } else {
            if((posCpuY + (barHeight/2)) < (fieldHeight/2)) {
                posCpuY += velCpu;
            } else if(posCpuY + (barHeight/2) > (fieldHeight/2)) {
                posCpuY -= velCpu;
            }
        }
        CPU.style.top = posCpuY + "px";
    }
}

function ballController() {
    posBallX += velBall*ballX; 
    posBallY += velBall*ballY;

    if((posBallX <= (posPlayerX + barWidth)) && ((posBallY + ballHeight) >= posPlayerY) && (posBallY <= (posPlayerY + barHeight))) {
        ballY = (((posBallY + (ballHeight/2)) - (posPlayerY + (barHeight/2)))/32);
        ballX *= -1;
    }

    if((posBallX >= (posCpuX - barWidth)) && ((posBallY + ballHeight) >= posCpuY) && (posBallY <= (posCpuY + barHeight))) {
        ballY = ((posBallY + (ballHeight/2)) - (posCpuY + (barHeight/2)))/32;
        ballX *= -1;
    }

    if(posBallY >=480 || posBallY <= 0) {
        ballY *= -1;
    }

    if(posBallX >= (fieldWidth-ballWidth)) {
        velBall = 0;
        posBallX = posBallStartX;
        posBallY = posBallStartY;
        posPlayerX = posPlayerStartX;
        posPlayerY = posBallStartY;
        posCpuX = posCpuStartX;
        posCpuY = posCpuStartY;
        points++;
        painelPoints.value = points;
        player.style.top = posPlayerStartY + "px";
        CPU.style.top = posCpuStartY + "px";
        gaming = false;
    } else if(posBallX <= 0) {
        velBall = 0;
        posBallX = posBallStartX;
        posBallY = posBallStartY;
        posPlayerX = posPlayerStartX;
        posPlayerY = posBallStartY;
        posCpuX = posCpuStartX;
        posCpuY = posCpuStartY;
        points--;
        painelPoints.value = points;
        player.style.top = posPlayerStartY + "px";
        CPU.style.top = posCpuStartY + "px";
        gaming = false;
    }

    ball.style.top = posBallY + "px";
    ball.style.left = posBallX + "px";
}

function playerController() {
    if(gaming) {
        posPlayerY += velPlayer*dirJy;
        if((posPlayerY + barHeight >= fieldHeight) || posPlayerY <=0) {
            posPlayerY += velPlayer*dirJy*(-1); 
        }
        player.style.top = posPlayerY + "px";
    }
}

function keyDown(event) {
    key = event.keyCode;
    if(key==38) { //Cima
        dirJy =- 1;
    } else if(key==40) { //Baixo
        dirJy =+ 1;
    }
}

function keyUp(event) {
    key = event.keyCode;
    if(key==38) { //Cima
        dirJy = 0;
    } else if(key==40) { //Baixo
        dirJy = 0;
    }
}

function gameController() {
    if(gaming) {
        playerController();
        ballController();
        CPUController();
    }
    frames = requestAnimationFrame(gameController);
}

function startGame() {
    if(!gaming) {
        velBall = velCpu = velPlayer = 8;
        cancelAnimationFrame(frames);
        gaming = true;
        dirJy = 0;
        ballY = 0;
        if((Math.random()*10) < 5) {
            ballX = -1;
        } else {
            ballX = 1;
        }
        posBallX = posBallStartX;
        posBallY = posBallStartY;
        posPlayerX = posPlayerStartX;
        posPlayerY = posPlayerStartY;
        posCpuX = posCpuStartX;
        posCpuY = posCpuStartY;
        gameController();
    }
}

function inicialize() {
    velBall = velCpu = velPlayer = 8;
    btStart = document.getElementById("btStart");
    btStart.addEventListener("click", startGame);
    player = document.getElementById("player");
    CPU = document.getElementById("CPU");
    ball = document.getElementById("ball");
    painelPoints = document.getElementById("painelPoints");
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp)
}

window.addEventListener("load", inicialize);