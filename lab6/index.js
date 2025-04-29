import { levelLoader } from './components/levelLoader.js';


levelLoader.fetchLevels().then(levels => {
  console.log(levels)
  levels.forEach((level, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${level.name} (мін. кроків: ${level.minSteps})`;
    levelSelect.appendChild(option);
  });


});
