const namesList = [
  "Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"
];

namesList.forEach(name => {
  const initialLetter = name[0].toLowerCase();
  (initialLetter === "j" ? speekGoodBye : speekHello)(name);
});

console.log("=====");

const asciiLimit = 110;
console.log("Ascii:");

namesList.forEach(name => {
  const lastCharAscii = name.slice(-1).toLowerCase().charCodeAt(0);
  console.log(`${name} (ascii sum last letters: ${lastCharAscii})`);

  (lastCharAscii > asciiLimit ? speekHello : speekGoodBye)(name);
});