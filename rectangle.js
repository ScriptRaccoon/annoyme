import { ctx } from "./canvas.js";

export class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "black";
        this.horizontalSpeed = 0;
        this.verticalSpeed = 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x += this.horizontalSpeed;
        this.y += this.verticalSpeed;
    }

    swingHorizontally(xmin, xmax) {
        if (this.x <= xmin) {
            this.x = xmin;
            this.horizontalSpeed *= -1;
        } else if (this.x + this.width >= xmax) {
            this.x = xmax - this.width;
            this.horizontalSpeed *= -1;
        }
    }

    swingVertically(ymin, ymax) {
        if (this.y <= ymin) {
            this.y = ymin;
            this.verticalSpeed *= -1;
        } else if (this.y + this.height >= ymax) {
            this.y = ymax - this.height;
            this.verticalSpeed *= -1;
        }
    }

    moveInL(cross, speed) {
        if (this.x <= 0 && this.verticalSpeed === 0) {
            this.x = 0;
            this.horizontalSpeed = speed;
        } else if (this.x >= cross && this.verticalSpeed === 0) {
            this.x = cross;
            this.horizontalSpeed = 0;
            this.verticalSpeed = -speed;
        } else if (this.y <= 0 && this.horizontalSpeed === 0) {
            this.y = 0;
            this.verticalSpeed = speed;
        } else if (this.y >= cross && this.horizontalSpeed === 0) {
            this.y = cross;
            this.horizontalSpeed = -speed;
            this.verticalSpeed = 0;
        }
    }

    moveInRectangle(xmin, ymin, xmax, ymax, speed) {
        if (this.y <= ymin && this.horizontalSpeed === 0) {
            this.y = ymin;
            this.horizontalSpeed = -speed;
            this.verticalSpeed = 0;
        } else if (this.x <= xmin && this.verticalSpeed === 0) {
            this.x = xmin;
            this.horizontalSpeed = 0;
            this.verticalSpeed = speed;
        } else if (this.y + this.height >= ymax && this.horizontalSpeed === 0) {
            this.y = ymax - this.height;
            this.horizontalSpeed = speed;
            this.verticalSpeed = 0;
        } else if (this.x + this.width >= xmax && this.verticalSpeed === 0) {
            this.x = xmax - this.width;
            this.horizontalSpeed = 0;
            this.verticalSpeed = -speed;
        }
    }

    animate() {
        return;
    }
}
