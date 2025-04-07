function quickSort(arr, ascending = true) {
    const counter = createCounter();
    const workingArr = handleSparseArrays([...arr]);
  
    function partition(array, low, high) {
      const pivot = array[high];
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        counter.comparisons++;
        const shouldSwap = ascending
          ? array[j] <= pivot
          : array[j] >= pivot;
        if (shouldSwap) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];
          counter.swaps++;
        }
      }
      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      counter.swaps++;
      return i + 1;
    }
  
    function quickSortHelper(array, low, high) {
      if (low < high) {
        const pi = partition(array, low, high);
        quickSortHelper(array, low, pi - 1);
        quickSortHelper(array, pi + 1, high);
      }
    }
  
    quickSortHelper(workingArr, 0, workingArr.length - 1);
    counter.log();
    return workingArr;
  }
  