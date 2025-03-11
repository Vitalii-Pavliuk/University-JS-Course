(function () {
    var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
  
    for (var i = 0; i < names.length; i++) {
      var firstLetter = names[i].charAt(0).toLowerCase();
  
      if (firstLetter === 'j') {
        goodbyeSpeaker.speak(names[i]);
      } else {
        helloSpeaker.speak(names[i]);
      }
    }
  
    console.log("\nAdditional selection: Names with odd ASCII sum");
  
    for (var i = 0; i < names.length; i++) {
      var asciiSum = names[i].split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  
      if (asciiSum % 2 !== 0) {
        console.log(names[i]);
      }
    }
  })();
  