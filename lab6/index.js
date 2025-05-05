  import { levelLoader } from './components/levelLoader.js';
  import { gameLogic } from './components/gameLogic.js';
  import { gameRenderer } from './components/gameRenderer.js';
  import { ui } from './components/ui.js';

  const boardElement = document.getElementById('gameBoard');

  levelLoader.fetchLevels().then(levels => {
  console.log(levels);
    if (!levels.length) return;

    const loadLevel = (index) => {
      console.log(`index ${index}`); 
      gameLogic.setBoard(levels[index].matrix);
      ui.updateSteps(gameLogic.steps);
      gameRenderer.render(boardElement);
    };
    

    ui.populateLevelSelect(levels, loadLevel);
    loadLevel(0); 
  });
