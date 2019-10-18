'use strict';

// -------------------------------------------------
// создает набор данных для персонажей
// -------------------------------------------------

(function () {
  var charactersData = {
    COUNT: 4,
    NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
  };

  // функция генерации имени персонажа
  var getCharacterRandomFullName = function (names, surnames) {
    var randomName = window.random.getRandomArrayElement(names);
    var randomSurname = window.random.getRandomArrayElement(surnames);

    return window.random.getRandomBoolean() ? randomName + ' ' + randomSurname :
      randomSurname + ' ' + randomName;
  };

  // функция генерации случайного персонажа
  var createCharacter = function () {
    return {
      name: getCharacterRandomFullName(charactersData.NAMES, charactersData.SURNAMES),
      coatColor: window.random.getRandomArrayElement(charactersData.COAT_COLORS),
      eyesColor: window.random.getRandomArrayElement(charactersData.EYES_COLORS),
    };
  };

  // функция генерации массива персонажей
  var createCharacters = function (charactersCount) {
    var wizards = [];

    for (var i = 0; i < charactersCount; i++) {
      wizards.push(createCharacter());
    }
    return wizards;
  };

  // -------------------------------------------------
  var wizards = createCharacters(charactersData.COUNT);

  window.data = {
    wizards: wizards,
    FIREBALL_COLORS: charactersData.FIREBALL_COLORS,
    COAT_COLORS: charactersData.COAT_COLORS,
    EYES_COLORS: charactersData.EYES_COLORS
  };
})();
