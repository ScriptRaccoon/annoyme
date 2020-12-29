import { canvas, ctx, squareSize } from "./canvas.js";

export class Ball {
    constructor() {
        this.size = squareSize / 3;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.horizontalSpeed = 0;
        this.verticalSpeed = 0;
        this.maximalHorizontalSpeed = squareSize * (2 / 15);
        this.maximalVerticalSpeed = squareSize * (2 / 15);
        this.color = "red";
        this.addControls();
        this.canMove = true;
    }

    draw() {
        ctx.globalAlpha = this.canMove ? 1 : 0.5;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    freeze() {
        this.canMove = false;
        this.horizontalSpeed = 0;
        this.verticalSpeed = 0;
        setTimeout(() => {
            this.canMove = true;
        }, 400);
    }

    update() {
        this.x += this.horizontalSpeed;
        this.y += this.verticalSpeed;
        if (this.x < this.size) this.x = this.size;
        if (this.x + this.size > canvas.width) this.x = canvas.width - this.size;
        if (this.y < this.size) this.y = this.size;
        if (this.y + this.size > canvas.height) this.y = canvas.height - this.size;
    }

    startMove(e) {
        if (!this.canMove) return;
        switch (e.key) {
            case "ArrowLeft":
                this.horizontalSpeed = -this.maximalHorizontalSpeed;
                break;
            case "ArrowRight":
                this.horizontalSpeed = +this.maximalHorizontalSpeed;
                break;
            case "ArrowUp":
                this.verticalSpeed = -this.maximalVerticalSpeed;
                break;
            case "ArrowDown":
                this.verticalSpeed = +this.maximalVerticalSpeed;
                break;
        }
    }

    stopMove(e) {
        if (!this.canMove) return;
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
            this.horizontalSpeed = 0;
            this.verticalSpeed = 0;
        }
    }

    addControls() {
        document.addEventListener("keydown", (e) => this.startMove(e));
        document.addEventListener("keyup", (e) => this.stopMove(e));
    }

    collidesWith(rectangle) {
        return (
            this.y + this.size > rectangle.y &&
            this.y - this.size < rectangle.y + rectangle.height &&
            this.x + this.size > rectangle.x &&
            this.x - this.size < rectangle.x + rectangle.width
        );
    }

    isContainedIn(rectangle) {
        return (
            this.x - this.size >= rectangle.x &&
            this.x + this.size <= rectangle.x + rectangle.width &&
            this.y - this.size >= rectangle.y &&
            this.y + this.size <= rectangle.y + rectangle.height
        );
    }
}
