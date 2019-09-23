'use strict';

var COUNT = 4;

// случайное число от 0 до max
var getRandom = function (max) {
  return Math.floor(Math.random() * (max + 1));
};

// функция генерации случайных данных
var createCharacters = function () {
  var arr = [];
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

  for (var i = 0; i < COUNT; i++) {
    arr[i] = {};

    var randomIndex = getRandom(NAMES.length - 1);
    arr[i].name = NAMES[randomIndex] + ' ' + SURNAMES[randomIndex];
    NAMES.splice(randomIndex, 1);
    SURNAMES.splice(randomIndex, 1);

    randomIndex = getRandom(coatColors.length - 1);
    arr[i].coatColor = coatColors[randomIndex];

    randomIndex = getRandom(eyesColors.length - 1);
    arr[i].eyesColor = eyesColors[randomIndex];
  }
  return arr;
};

// функция создания DOM-элемента на основе JS-объекта
var createElement = function (template, arrElement) {
  var element = template.cloneNode(true);

  element.querySelector('.setup-similar-label').textContent = arrElement.name;
  element.querySelector('.wizard-coat').style.fill = arrElement.coatColor;
  element.querySelector('.wizard-eyes').style.fill = arrElement.eyesColor;
  return element;
};

// функция заполнения блока DOM-элементами на основе массива JS-объектов
var fillContainer = function (template, arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var wizardElement = createElement(template, arr[i]);
    fragment.appendChild(wizardElement);
  }
  return fragment;
};

// ----------------------------------------------

var userDialog = document.querySelector('.setup');
if (userDialog) {
  // показать окно настройки персонажа
  userDialog.classList.remove('hidden');
  // заполнить массив случайными данными
  var wizards = createCharacters();
  // шаблон
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  // элемент-контейнер
  var similarListElement = document.querySelector('.setup-similar-list');
  // заполнить список внутри контейнера
  similarListElement.appendChild(fillContainer(similarWizardTemplate, wizards));
  // показать контейнер с персонажами
  var setupSimilarElement = document.querySelector('.setup-similar');
  setupSimilarElement.classList.remove('hidden');
}
