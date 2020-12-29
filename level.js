import { Rectangle } from "./rectangle.js";
import { squareSize } from "./canvas.js";
import { Ball } from "./ball.js";

export class Level {
    constructor(startPos, endPos) {
        this.ball = new Ball();
        this.start = new Rectangle(
            startPos.x * squareSize,
            startPos.y * squareSize,
            squareSize,
            squareSize
        );
        this.end = new Rectangle(
            endPos.x * squareSize,
            endPos.y * squareSize,
            squareSize,
            squareSize
        );
        this.start.color = "#FFFF00";
        this.end.color = "#A00000";
        this.won = false;
        this.obstacles = [];
    }

    addObstacle(obj) {
        this.obstacles.push(obj);
    }

    init() {
        this.ball.x = this.start.x + squareSize / 2;
        this.ball.y = this.start.y + squareSize / 2;
    }

    testCollisions() {
        for (const obstacle of this.obstacles) {
            if (this.ball.collidesWith(obstacle)) {
                this.init();
                this.ball.freeze();
                return true;
            }
        }
    }

    testWin() {
        if (this.ball.isContainedIn(this.end)) {
            this.end.color = "blue";
            this.won = true;
            return true;
        }
    }

    update() {
        this.ball.update();
        this.obstacles.forEach((obs) => obs.update());
        this.obstacles.forEach((obs) => obs.animate());
    }

    draw() {
        this.start.draw();
        this.end.draw();
        this.obstacles.forEach((obs) => obs.draw());
        this.ball.draw();
    }
}
