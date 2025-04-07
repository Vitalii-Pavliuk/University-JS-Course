function selectionSort(arr, ascending = true) {
    const counter = createCounter();
    const workingArr = handleSparseArrays([...arr]);
  
    for (let i = 0; i < workingArr.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < workingArr.length; j++) {
        counter.comparisons++;
        const shouldUpdate = ascending
          ? workingArr[j] < workingArr[minIdx]
          : workingArr[j] > workingArr[minIdx];
        if (shouldUpdate) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [workingArr[i], workingArr[minIdx]] = [workingArr[minIdx], workingArr[i]];
        counter.swaps++;
      }
    }
  
    counter.log();
    return workingArr;
  }
  