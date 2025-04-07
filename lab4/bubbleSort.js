function bubbleSort(arr, ascending = true) {
    const counter = createCounter();
    const workingArr = handleSparseArrays([...arr]);
  
    for (let i = 0; i < workingArr.length - 1; i++) {
      for (let j = 0; j < workingArr.length - 1 - i; j++) {
        counter.comparisons++;
        const shouldSwap = ascending
          ? workingArr[j] > workingArr[j + 1]
          : workingArr[j] < workingArr[j + 1];
        if (shouldSwap) {
          [workingArr[j], workingArr[j + 1]] = [workingArr[j + 1], workingArr[j]];
          counter.swaps++;
        }
      }
    }
  
    counter.log();
    return workingArr;
  }
  