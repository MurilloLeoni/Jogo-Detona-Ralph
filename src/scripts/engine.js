const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        lifes: 3,
        currentTime: 60,
    },
    actions:{
        timerId: setInterval(randomSquare, 500),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        playsound("gameover");
        alert("Game Over! A sua pontuação foi: " + state.values.result);
        initializeGame();
    }
}

function playsound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.05;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()  => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playsound("hit");
            }
            else{
                state.values.lifes--;
                state.view.life.textContent = state.values.lifes;
                playsound("fail");

                if (state.values.lifes === 0) {
                    playsound("gameover");
                    alert("Acabou suas vidas! Sua pontuação foi de: " + state.values.result);
                    initializeGame();
                }
            }
        });
    });
}

function init() {
    addListenerHitBox();
}

function initializeGame() {
    state.values.lifes = 3;
    state.view.life.textContent = state.values.lifes;
    state.values.result = 0;
    state.view.score.textContent = state.values.result;
    state.values.currentTime = 60;
    state.view.timeLeft.textContent = state.values.currentTime;

    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    state.actions.timerId = setInterval(randomSquare, 500);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

init();