function insertionSort(arr, ascending = true) {
    const counter = createCounter();
    const workingArr = handleSparseArrays([...arr]);
  
    for (let i = 1; i < workingArr.length; i++) {
      const current = workingArr[i];
      let j = i - 1;
      while (j >= 0) {
        counter.comparisons++;
        const shouldMove = ascending
          ? workingArr[j] > current
          : workingArr[j] < current;
        if (shouldMove) {
          workingArr[j + 1] = workingArr[j];
          counter.swaps++;
          j--;
        } else break;
      }
      workingArr[j + 1] = current;
    }
  
    counter.log();
    return workingArr;
  }
  