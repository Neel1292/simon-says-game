let gameSeq = [];
let userSeq = [];

let btnsColor = ["red", "orange", "green", "blue"];

let start = false;
let level = 0;
let h2 = $('h2');

$(document).ready(function() {
    $('body').keypress(function (e) { 
        if(start == false) {
            start = true;
            levelUp();
        }
    });
})

function flashBtn(btn) { 
    btn.classList.add('flash');
    setTimeout(() => {
        btn.classList.remove('flash');
    }, 250);
}

function userFlash(btn) {
    btn.classList.add('userFlash');
    setTimeout(() => {
        btn.classList.remove('userFlash');
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.text(`Level ${level}`);

    // select random number
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btnsColor[randIdx];
    let randomBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    flashBtn(randomBtn);
}

let btns = document.querySelectorAll('.btns');
for(let btn of btns) {
    btn.addEventListener('click', btnPress);
}

function check(indx) {
    if(userSeq[indx] === gameSeq[indx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.html(`Game Over! Your Score: <b>${level}</b> <br> Press any key to start`);
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function() {
            document.querySelector('body').style.backgroundColor = 'white';
        }, 200)
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute('id');
    userSeq.push(userColor);

    check(userSeq.length - 1);
}

function reset() {
    start = false;
    level = 0;
    userSeq = [];
    gameSeq = [];
}