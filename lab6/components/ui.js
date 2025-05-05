export const ui = {
    updateSteps(steps) {
      document.getElementById('stepCounter').textContent = `Кроків: ${steps}`;
    },
  
    populateLevelSelect(levels, callback) {
      const levelSelect = document.getElementById('levelSelect');

      levels.forEach((level, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${level.name} (мін. кроків: ${level.minSteps})`;
        levelSelect.appendChild(option);
      });
      levelSelect.addEventListener('change', () => {
        console.log(levelSelect.value);
        callback(parseInt(levelSelect.value));
      });
      
    }
  };
  