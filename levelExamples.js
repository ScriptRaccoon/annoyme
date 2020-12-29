import { squareSize } from "./canvas.js";
import { Rectangle } from "./rectangle.js";
import { Level } from "./level.js";

const w = squareSize;

// LEVEL 1
const level1 = new Level({ x: 0, y: 0 }, { x: 9, y: 9 });
for (let i = 1; i < 9; i++) {
    const T = new Rectangle(canvas.width / 2 - w / 2, w * i, w, w);
    T.color = "#005000";
    T.horizontalSpeed = i % 2 === 0 ? 7 : -7;
    T.animate = () => {
        T.swingHorizontally(0, 10 * w);
    };
    level1.addObstacle(T);
}

// LEVEL 2
const level2 = new Level({ x: 0, y: 0 }, { x: 9, y: 9 });
for (let i = 1; i < 9; i++) {
    const T = new Rectangle(w * i, canvas.width / 2 - w / 2, w, w);
    T.color = "#A00080";
    T.verticalSpeed = i % 2 === 0 ? 10 : -10 + i;
    T.animate = () => {
        T.swingVertically(0, 10 * w);
    };
    level2.addObstacle(T);
}

// LEVEL 3
const level3 = new Level({ x: 0, y: 0 }, { x: 7, y: 9 });
for (let i = 2; i < 10; i++) {
    const T = new Rectangle(0, i * w, w, w);
    T.color = "blue";
    T.horizontalSpeed = 8;
    T.verticalSpeed = 0;
    T.animate = () => {
        T.moveInL(i * w, 8);
    };
    level3.addObstacle(T);
}

// LEVEL 4
const level4 = new Level({ x: 0, y: 0 }, { x: 5, y: 5 });
for (let i = 0; i < 4; i++) {
    const R = new Rectangle(i, (10 - i) * w, w, w);
    R.color = "#AEAEAE";
    level4.addObstacle(R);
    R.verticalSpeed = 10;
    R.animate = () => {
        R.moveInRectangle(i * w, i * w, (10 - i) * w, (10 - i) * w, 10);
    };
}

// LEVEL 5
const level5 = new Level({ x: 0, y: 0 }, { x: 7, y: 9 });
const T = new Rectangle(8 * w, 8 * w, w, w);
T.color = "#600000";
level5.addObstacle(T);
let ballIsInMiddle = false;
T.animate = () => {
    T.moveInRectangle(w, w, 9 * w, 9 * w, 10);
    if (
        Math.abs(level5.ball.x - canvas.width / 2) <= 4 &&
        Math.abs(level5.ball.y - canvas.height / 2) <= 4
    ) {
        ballIsInMiddle = true;
    }
    if (ballIsInMiddle === false) {
        level5.ball.size = (level5.ball.x + level5.ball.y) / 10;
    } else {
        level5.ball.size = 10;
    }
};

// LEVEL 6
const level6 = new Level({ x: 0, y: 0 }, { x: 7, y: 9 });
for (let i = 0; i < 10; i = i + 2) {
    const T = new Rectangle(i * w, 9 * w, w, w);
    T.color = `rgb(${i}0,0,${10 - i - 1}0)`;
    T.verticalSpeed = -4 * (i + 1);
    T.animate = () => {
        T.swingVertically(w, 10 * w);
    };
    level6.addObstacle(T);
}
for (let i = 0; i < 10; i = i + 2) {
    const S = new Rectangle(w, i * w, w, w);
    S.color = `rgb(${i}0,${10 - i - 1}0,0)`;
    S.horizontalSpeed = -3 * (10 - i);
    S.animate = () => {
        S.swingHorizontally(w, 10 * w);
    };
    level6.addObstacle(S);
}

// LEVEL 7
const level7 = new Level({ x: 9, y: 0 }, { x: 0, y: 9 });
for (let i = 0; i < 10; i = i + 2) {
    const T = new Rectangle(0, (i + 1) * w, 2 * w, w);
    T.color = "#7020F0";
    T.horizontalSpeed = 3;
    T.animate = () => {
        T.swingHorizontally(0, 4 * w);
    };
    level7.addObstacle(T);
    const S = new Rectangle(4 * w, (i + 2) * w, 2 * w, w);
    S.color = "#0000B0";
    S.horizontalSpeed = 3;
    S.animate = () => {
        S.swingHorizontally(4 * w, 8 * w);
    };
    level7.addObstacle(S);
    const V = new Rectangle(8 * w, (i + 3) * w, 2 * w, w);
    V.color = "#87CEEB";
    V.horizontalSpeed = 3;
    V.animate = () => {
        V.swingHorizontally(8 * w, 12 * w);
    };
    level7.addObstacle(V);
    const P = new Rectangle(i * w, w, w, 2 * w);
    P.color = "#40A000";
    P.horizontalSpeed = 5;
    P.animate = () => {
        P.swingHorizontally(i * w, (i + 3) * w);
    };
    level7.addObstacle(P);
    const Q = new Rectangle((i - 3) * w, 5 * w, w, 2 * w);
    Q.color = "#00A050";
    Q.horizontalSpeed = 5;
    Q.animate = () => {
        Q.swingHorizontally((i - 3) * w, i * w);
    };
    level7.addObstacle(Q);
}

export const levels = [level1, level2, level3, level4, level5, level6, level7];
