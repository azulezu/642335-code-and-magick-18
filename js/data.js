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
    var randomName = window.utils.getRandomArrayElement(names);
    var randomSurname = window.utils.getRandomArrayElement(surnames);

    return window.utils.getRandomBoolean() ? randomName + ' ' + randomSurname :
      randomSurname + ' ' + randomName;
  };

  // функция генерации случайного персонажа
  var createCharacter = function (charactersInfo) {
    return {
      name: getCharacterRandomFullName(charactersInfo.NAMES, charactersInfo.SURNAMES),
      coatColor: window.utils.getRandomArrayElement(charactersInfo.COAT_COLORS),
      eyesColor: window.utils.getRandomArrayElement(charactersInfo.EYES_COLORS),
    };
  };

  // функция генерации массива персонажей
  var createCharacters = function (charactersCount) {
    var characters = [];

    for (var i = 0; i < charactersCount; i++) {
      characters.push(createCharacter(charactersData));
    }
    return characters;
  };

  // -------------------------------------------------

  window.data = {
    wizards: createCharacters(charactersData.COUNT),
    FIREBALL_COLORS: charactersData.FIREBALL_COLORS,
    COAT_COLORS: charactersData.COAT_COLORS,
    EYES_COLORS: charactersData.EYES_COLORS
  };
})();
