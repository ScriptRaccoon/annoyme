export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export const squareCount = 10;
export const squareSize = 60;

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawText(txt, alpha = 1) {
    ctx.fillStyle = "black";
    ctx.globalAlpha = alpha;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.font = "30px Verdana";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(txt, canvas.width / 2, canvas.height / 2);
}

export function drawCheckerBoard() {
    for (let i = 0; i < squareCount; i++) {
        for (let j = 0; j < squareCount; j++) {
            ctx.fillStyle = (i + j) % 2 === 0 ? "#E2E2E2" : "#9090E0";
            ctx.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
        }
    }
}
