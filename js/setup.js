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
// -------------------------------------------------
// случайный индекс массива с числом элементов maxNumber
var getRandomNumber = function (maxNumber) {
  return Math.floor(Math.random() * maxNumber);
};

// случайное логическое значение
var getRandomBoolean = function () {
  return !!(Math.round(Math.random()));
};

// случайный элемент массива
var getRandomArrayElement = function (array) {
  return array[getRandomNumber(array.length)];
};
// -------------------------------------------------

// функция генерации имени персонажа
var getCharacterRandomName = function () {
  var randomName = getRandomArrayElement(charactersData.NAMES);
  var randomSurname = getRandomArrayElement(charactersData.SURNAMES);

  return getRandomBoolean() ? randomName + ' ' + randomSurname :
    randomSurname + ' ' + randomName;
};

// функция генерации случайного персонажа
var createCharacter = function () {
  return {
    name: getCharacterRandomName(),
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
var createWizard = function (template, characterData) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = characterData.name;
  wizardElement.querySelector('.wizard-coat').style.fill = characterData.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = characterData.eyesColor;
  return wizardElement;
};

// функция заполнения блока DOM-элементами на основе массива JS-объектов
var fillWizardsList = function (template, charactersArray) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < charactersArray.length; i++) {
    var wizardElement = createWizard(template, charactersArray[i]);
    fragment.appendChild(wizardElement);
  }
  return fragment;
};

var initSetup = function (wizards) {
  // шаблон
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // элемент-контейнер
  var similarListElement = document.querySelector('.setup-similar-list');
  // заполнить список внутри контейнера
  similarListElement.appendChild(fillWizardsList(similarWizardTemplate, wizards));

  var setupSimilarElement = document.querySelector('.setup-similar');
  // показать контейнер с персонажами
  setupSimilarElement.classList.remove('hidden');

  var userDialog = document.querySelector('.setup');
  // показать окно
  userDialog.classList.remove('hidden');
};

// ----------------------------------------------
// заполнить массив случайными данными
var wizards = createCharacters(charactersData.COUNT);

initSetup(wizards);
