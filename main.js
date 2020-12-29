import { Game } from "./game.js";
import { levels } from "./levelExamples.js";

const game = new Game();
game.addLevels(levels);

game.start();
