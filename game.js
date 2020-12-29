import { Ball } from "./ball.js";
import { drawText, drawCheckerBoard, clearCanvas } from "./canvas.js";

const deathCount = document.getElementById("deathCount");
const levelSelect = document.getElementById("levelSelect");

export class Game {
    constructor() {
        this.ball = new Ball();
        this.deaths = 0;
        this.levels = [];
        this.currentLevelIndex = 0;
        this.paused = true;
        this.running = true;
        this.addControls();
    }

    get currentLevel() {
        return this.levels[this.currentLevelIndex];
    }

    addLevels(levels) {
        this.levels.push(...levels);
    }

    start() {
        if (this.levels.length === 0) {
            console.log("There are no levels.");
        } else {
            this.showLevels();
            this.currentLevel.init();
            drawText("Press 'Space' to start");
        }
    }

    showLevels() {
        for (let j = 1; j <= this.levels.length; j++) {
            levelSelect.options[j - 1] = new Option("Level " + j, j - 1);
        }
        levelSelect.addEventListener("change", () => this.changeLevel());
    }

    changeLevel() {
        this.currentLevelIndex = levelSelect.selectedIndex;
        this.currentLevel.init();
    }

    startNextLevel() {
        this.running = false;
        let i = 0;
        while (this.levels[i].won) {
            i++;
            if (i >= this.levels.length) {
                drawText("You won the game!");
                return;
            }
        }
        this.currentLevelIndex = i;
        levelSelect.selectedIndex = i;
        drawText(`Level ${i + 1}`);
        setTimeout(() => {
            this.running = true;
            this.currentLevel.init();
            this.gameloop();
        }, 1000);
    }

    addControls() {
        document.addEventListener("keydown", (e) => {
            if (!this.running) return;
            switch (e.key) {
                case " ":
                    this.paused = !this.paused;
                    if (this.paused) {
                        drawText("Pause", 0.8);
                    } else {
                        this.gameloop();
                    }
                    break;
                case "r":
                    this.currentLevel.init();
                    break;
            }
        });
    }

    gameloop() {
        if (this.paused) return;
        this.running = true;
        clearCanvas();
        drawCheckerBoard();
        this.currentLevel.update();
        const collide = this.currentLevel.testCollisions();
        if (collide) {
            this.deaths++;
            deathCount.innerText = this.deaths;
        }
        this.currentLevel.draw();
        const win = this.currentLevel.testWin();
        if (win) {
            const i = this.currentLevelIndex;
            levelSelect.options[i].innerText = `Level ${i + 1} ✔`;
            this.startNextLevel();
        } else {
            requestAnimationFrame(() => this.gameloop());
        }
    }
}
