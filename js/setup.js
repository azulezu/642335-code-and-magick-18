'use strict';

var charactersData = {
  COUNT: 4,
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
};

// -------------------------------------------------
// вспомогательные функции
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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
// создание случайных персонажей и разметки для них

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

// функция подготавливает окно настроек
var initSetup = function () {
  // заполнить массив случайными данными
  var wizards = createCharacters(charactersData.COUNT);

  // заполнить список внутри контейнера
  var similarListElement = document.querySelector('.setup-similar-list');
  similarListElement.appendChild(createWizardsMarkup(wizards));

  // показать контейнер с персонажами
  var setupSimilarElement = document.querySelector('.setup-similar');
  setupSimilarElement.classList.remove('hidden');
};

// ----------------------------------------------
// обработчики окна настроек

// ****** переменные не должны тут находиться ******
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupClose = setup.querySelector('.setup-close');


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
};

// функция добавляет обработчики окну настроек
var setSetupHandlers = function () {
  setupOpenIcon.tabIndex = 0;
  setupClose.tabIndex = 0;
  // Нажатие на элемент .setup-open удаляет класс hidden у блока setup
  setupOpen.addEventListener('click', function () {
    openPopup();
  });
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });
};

// ----------------------------------------------
// изменение цвета персонажа

// ****** переменные не должны тут находиться ******
var wizard = document.querySelector('.setup-wizard');
var wizardCoat = wizard.querySelector('.wizard-coat');
var wizardEyes = wizard.querySelector('.wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');

// функция заполняет поле ввода случайным цветом и красит элемент
var setColor = function (colors, element, name) {
  var currentColor = getRandomArrayElement(colors);
  document.querySelector('input[name="' + name + '"]').value = currentColor;
  if (element.classList.value === 'setup-fireball-wrap') {
    element.style.backgroundColor = currentColor;
  } else {
    element.style.fill = currentColor;
  }
};

var onWizardCoatClick = function () {
  setColor(charactersData.COAT_COLORS, wizardCoat, 'coat-color');
};

var onWizardEyesClick = function () {
  setColor(charactersData.EYES_COLORS, wizardEyes, 'eyes-color');
};

var onFireballClick = function () {
  setColor(charactersData.FIREBALL_COLORS, fireball, 'fireball-color');
};

// функция меняет цвета персонажа по клику
var setWizardColor = function () {
  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  fireball.addEventListener('click', onFireballClick);
};

// ----------------------------------------------
// действия с формой

// ****** переменные не должны тут находиться ******
var form = setup.querySelector('.setup-wizard-form');
var userNameInput = form.querySelector('.setup-user-name');

var setForm = function () {
  form.action = 'https://js.dump.academy/code-and-magick';
  // убирает выход по Esc при редактировании имени
  userNameInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });
  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле!');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

};

// ----------------------------------------------
initSetup();
setSetupHandlers();
setWizardColor();
setForm();
