'use strict';

var charactersData = {
  COUNT: 4,
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
};

// -------------------------------------------------
// вспомогательные функции

// случайный индекс массива с числом элементов length
var getRandomArrayIndex = function (length) {
  return Math.floor(Math.random() * length);
};

// случайное логическое значение
var getRandomBoolean = function () {
  return !!(Math.round(Math.random()));
};

// случайный элемент массива
var getRandomArrayElement = function (array) {
  return array[getRandomArrayIndex(array.length)];
};
// -------------------------------------------------

// функция генерации имени персонажа
var getCharacterRandomFullName = function (names, surnames) {
  var randomName = getRandomArrayElement(names);
  var randomSurname = getRandomArrayElement(surnames);

  return getRandomBoolean() ? randomName + ' ' + randomSurname :
    randomSurname + ' ' + randomName;
};

// функция генерации случайного персонажа
var createCharacter = function () {
  return {
    name: getCharacterRandomFullName(charactersData.NAMES, charactersData.SURNAMES),
    coatColor: getRandomArrayElement(charactersData.COAT_COLORS),
    eyesColor: getRandomArrayElement(charactersData.EYES_COLORS),
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

// функция создания DOM-элемента на основе JS-объекта
var createWizard = function (template, charactersArrayElement) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = charactersArrayElement.name;
  wizardElement.querySelector('.wizard-coat').style.fill = charactersArrayElement.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = charactersArrayElement.eyesColor;
  return wizardElement;
};

// функция заполнения блока DOM-элементами на основе массива JS-объектов
// возвращает готовый фрагмент разметки
var createWizardsMarkup = function (charactersArray) {
  var fragment = document.createDocumentFragment();
  // шаблон разметки для одного волшебника
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // заполняет разметку данными
  for (var i = 0; i < charactersArray.length; i++) {
    var wizardElement = createWizard(similarWizardTemplate, charactersArray[i]);
    fragment.appendChild(wizardElement);
  }
  return fragment;
};

var initSetup = function () {
  // заполнить массив случайными данными
  var wizards = createCharacters(charactersData.COUNT);

  // заполнить список внутри контейнера
  var similarListElement = document.querySelector('.setup-similar-list');
  similarListElement.appendChild(createWizardsMarkup(wizards));

  // показать контейнер с персонажами
  var setupSimilarElement = document.querySelector('.setup-similar');
  setupSimilarElement.classList.remove('hidden');

  // показать окно
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
};

// ----------------------------------------------

initSetup();
