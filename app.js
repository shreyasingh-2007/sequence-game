let gameseq = [];
let userseq = [];
let lives = 3;  // NEW

let btn = ["yellow", "red", "purple", "green"];
let level = 0;
let started = false;
let h2 = document.querySelector("h2");
let highScore = localStorage.getItem("highScore") || 0;   // read from storage or start at 0
let highScoreEl = document.querySelector("#highScore");   // grab the span from HTML
highScoreEl.innerText = highScore;
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        lives = 3;
        updateLives();
        levelup();
    }
})
function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randominx = Math.floor(Math.random() * 4);
    let randomcolor = btn[randominx];
    let randombtn = document.querySelector(`.${randomcolor}`);
    gameseq.push(randomcolor);
    console.log(gameseq);
    gameflash(randombtn);
}
function gameflash(btn) {
    btn.classList.add("gameflash");
    setTimeout(function () {
        btn.classList.remove("gameflash")
    }, 1000);
}
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash")
    }, 1000);
}
function checkans(idx) {
    //console.log("current level",level);

    if (gameseq[idx] === userseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
        }
    }
    else {
        lives--;
        updateLives();

        if (lives === 0) {
            if (level > highScore) {
                highScore = level;
                localStorage.setItem("highScore", highScore);
                highScoreEl.innerText = highScore;
            }
            h2.innerHTML = `game over! your score was <b>${level}</b> <br> press any key to start`;
            document.querySelector("body").style.backgroundColor = "red";
            setTimeout(function () {
                document.querySelector("body").style.backgroundColor = "white";
            }, 150);
            reset();
        } else {
            h2.innerText = `Wrong! You lost a life 💔. Lives left: ${lives}`;
            userseq = [];
        }
    }
}
function pressbtn() {
    let clickedBtn = this;   // this = the button/div user clicked
    console.log(clickedBtn);
    userflash(clickedBtn);
    usercolor = clickedBtn.getAttribute("id");
    userseq.push(usercolor);
    checkans(userseq.length - 1);

}
let allbtns = document.querySelectorAll(".yellow, .red, .purple, .green");
for (box of allbtns) {
    box.addEventListener("click", pressbtn);

}
function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
    lives = 3;
    updateLives();
}
function updateLives() {
    let livesEl = document.querySelector("#lives");
    livesEl.innerText = `Lives: ${"❤️".repeat(lives)}`;
}

let darkBtn = document.querySelector("#dark-toggle");
darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        darkBtn.innerText = "☀️ Light Mode";
    } else {
        darkBtn.innerText = "🌙 Dark Mode";
    }
});
