(function () {
  const farewellMessage = "Good bye";

  function speak(name) {
    console.log(`${farewellMessage} ${name}`);
  }

  window.speekGoodBye = speak;
})();