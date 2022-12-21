// console.log("i am avin")
///gamecon
let inputdir = { x: 0, y: 0 };
const foodsound = new Audio('music/food.mp3');
const gameoversound = new Audio('music/gameover.mp3');
const movesound = new Audio('music/move.mp3')
const musicound = new Audio('music/music.mp3')
let speed = 5;
let lastPaintTime = 0;
let score = 0;
// foodsound.play()

let snakearr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 }

//game function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}



function iscollide(snake) {
    // if you buminto yourself
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    // return false;
}
function gameEngine() {
    //updatig the snke array
    if (iscollide(snakearr)) {
        gameoversound.play();
        musicound.pause();
        inputdir = { x: 0, y: 0 };
        alert("Gameover.press any key to restart again")
        snakearr = [{ x: 13, y: 15 }]
        musicound.play();
        score = 0;
    }
    //if you have eaten the food and increament and decreament the food
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodsound.play();
        score += 1;
        scorebox.innerHTML = "score:" + score;
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    //moving the snake and food
    //
    for (let i = snakearr.length - 2; i >= 0; i--) {
        //   const element= snakearr[i];
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;




    ///

    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // snakeElement.classList.add('food');
        if (index == 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    });
    //part2:render the snamke array

    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    // snakeElement.classList.add('food');
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

//main logic start here
// let highScore = localStorage.getItem("hiscore");
// if(hiscore === null ){
//     Highscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(Highscoreval));
// }
// else {
//     highscorebox.innerHTML = "highscore:" + hiscore;
// }

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 }
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;

            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;

            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x = 1;
            inputdir.y = 0;
            break;

        default:
            break;


    }
}) 
