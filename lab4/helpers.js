function createCounter() {
  return {
    comparisons: 0,
    swaps: 0,
    log() {
      console.log(`Comparisons: ${this.comparisons}, Swaps/Moves: ${this.swaps}`);
    },
  };
}

function handleSparseArrays(arr) {
  let hasUndefined = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === undefined) {
      arr[i] = null;
      hasUndefined = true;
    }
  }
  if (hasUndefined) {
    console.log("Warning: Sparse array detected. Undefined elements were replaced with null");
  }
  return arr;
}
