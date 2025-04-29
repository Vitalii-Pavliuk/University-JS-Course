export const levelLoader = {
    LEVELS_PATH: 'data/levels.json',

  
    async fetchLevels() {
      try {
        const response = await axios.get(this.LEVELS_PATH);
        return response.data.levels;
      } catch (error) {
        console.error("Помилка при завантаженні рівнів:", error);
        return [];
      }
    }
  };
  