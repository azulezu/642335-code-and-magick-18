'use strict';

var wizards = [];

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
// случайный индекс массива с числом элементов length
var getRandomIndex = function (length) {
  return Math.floor(Math.random() * (length));
};

// случайное число от min до max
// var getRandomNumber = function (min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// случайное логическое значение
var getRandomBoolean = function () {
  return !!(Math.round(Math.random()));
};

// случайный элемент массива
var getRandomArrayElement = function (array) {
  return array[window.getRandomIndex(array.length)];
};

// создает функцию, которая возвращает уникальное
// случайное число от 0 до length
var makeUnique = function (length) {
  var listNumber = [];
  for (var i = 0; i < length; i++) {
    listNumber[i] = i;
  }

  var getRandomUniqueNumber = function () {
    if (listNumber.length > 0) {
      var index = getRandomIndex(listNumber.length);
      var number = listNumber[index];
      listNumber[index] = listNumber[listNumber.length - 1];
      listNumber.splice(listNumber.length - 1, 1);
      return number;
    }
    return NaN;
  };

  return getRandomUniqueNumber;
};
// -------------------------------------------------

// функция генерации уникального имени персонажа
var getCharacterRandomName = function () {
  var shuffleName = getRandomBoolean();
  var nameIndex = charactersData.getUniqueNameIndex();

  return shuffleName ? charactersData.NAMES[nameIndex] + ' ' + charactersData.SURNAMES[nameIndex] :
    charactersData.SURNAMES[nameIndex] + ' ' + charactersData.NAMES[nameIndex];
};

// функция генерации случайного персонажа
var createCharacter = function () {
  var character = {};

  character.name = getCharacterRandomName();
  character.coatColor = getRandomArrayElement(charactersData.COAT_COLORS);
  character.eyesColor = getRandomArrayElement(charactersData.EYES_COLORS);

  return character;
};

// функция генерации массива персонажей
var createCharacters = function () {
  // создать генератор уникального номера
  charactersData.getUniqueNameIndex = makeUnique(charactersData.NAMES.length);
  for (var i = 0; i < charactersData.COUNT; i++) {
    wizards.push(createCharacter());
  }
  // return wizards;
};

// функция создания DOM-элемента на основе JS-объекта
var renderWizard = function (template, characterData) {
  var element = template.cloneNode(true);

  element.querySelector('.setup-similar-label').textContent = characterData.name;
  element.querySelector('.wizard-coat').style.fill = characterData.coatColor;
  element.querySelector('.wizard-eyes').style.fill = characterData.eyesColor;
  return element;
};

// функция заполнения блока DOM-элементами на основе массива JS-объектов
var fillWizardsList = function (template, charactersArray) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < charactersArray.length; i++) {
    var wizardElement = renderWizard(template, charactersArray[i]);
    fragment.appendChild(wizardElement);
  }
  return fragment;
};

// показывает окно настройки персонажа
var initSetup = function () {
  // показать контейнер с персонажами
  var setupSimilarElement = document.querySelector('.setup-similar');
  setupSimilarElement.classList.remove('hidden');
  // показать окно
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
};

// заполняет список на основе шаблона
var fillTemplate = function () {
  // шаблон
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  // элемент-контейнер
  var similarListElement = document.querySelector('.setup-similar-list');
  // заполнить список внутри контейнера
  similarListElement.appendChild(fillWizardsList(similarWizardTemplate, wizards));
};

// ----------------------------------------------
// заполнить массив случайными данными
createCharacters();
// подготовить список персонажей
fillTemplate();
// вывести окно
initSetup();
