function shellSort(arr, ascending = true) {
    const counter = createCounter();
    const workingArr = handleSparseArrays([...arr]);
    const n = workingArr.length;
  
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        const temp = workingArr[i];
        let j = i;
        while (j >= gap) {
          counter.comparisons++;
          const shouldMove = ascending
            ? workingArr[j - gap] > temp
            : workingArr[j - gap] < temp;
          if (shouldMove) {
            workingArr[j] = workingArr[j - gap];
            counter.swaps++;
            j -= gap;
          } else break;
        }
        workingArr[j] = temp;
      }
    }
  
    counter.log();
    return workingArr;
  }
  