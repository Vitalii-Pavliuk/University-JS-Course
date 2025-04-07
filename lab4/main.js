const regularArray = Array.from({ length: 100 }, () =>
    Math.floor(Math.random() * 1000)
  );
  const sparseArray = Array.from({ length: 100 }, () =>
    Math.random() > 0.2 ? Math.floor(Math.random() * 1000) : undefined
  );
  
  const methods = [
    ["Bubble Sort", bubbleSort],
    ["Selection Sort", selectionSort],
    ["Insertion Sort", insertionSort],
    ["Shell Sort", shellSort],
    ["Quick Sort", quickSort],
  ];
  
  console.log("\n=== Звичайний масив (довжина: 100) ===");
  methods.forEach(([name, method]) => {
    console.log(`\n${name}:`);
    const result = method(regularArray, true);
    console.log(`[${result}]`);
  });
  
  console.log("\n=== Розріджений масив (довжина: 100) ===");
  methods.forEach(([name, method]) => {
    console.log(`\n${name}:`);
    const result = method(sparseArray, true);
    console.log(`[${result}]`);
  });
  