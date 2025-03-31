(function () {
  const greetingMessage = "Hello";

  function speak(name) {
    console.log(`${greetingMessage} ${name}`);
  }

  window.speekHello = speak;
})();