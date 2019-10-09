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
// создает случайный набор данных для персонажей

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

// -------------------------------------------------
// создание разметки для персонажей

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

// ----------------------------------------------
// обработчики открытия/закрытия окна настроек

var popupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    var setup = document.querySelector('.setup');
    closePopup(setup);
  }
};

var openPopup = function (popup) {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
};

var closePopup = function (popup) {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
};

// функция добавляет обработчики окну настроек
var setSetupHandlers = function (setup, setupOpen, setupClose) {

  // Нажатие на элемент .setup-open удаляет класс hidden у блока setup
  setupOpen.addEventListener('click', function () {
    openPopup(setup);
  });
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup(setup);
    }
  });
  setupClose.addEventListener('click', function () {
    closePopup(setup);
  });
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup(setup);
    }
  });
};

// ----------------------------------------------
// изменение цвета персонажа

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

// функция устанавливает обработчики изменения цвета персонажа по клику
var setWizardColor = function () {
  var wizard = document.querySelector('.setup-wizard');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');

  wizardCoat.addEventListener('click', function () {
    setColor(charactersData.COAT_COLORS, wizardCoat, 'coat-color');
  });
  wizardEyes.addEventListener('click', function () {
    setColor(charactersData.EYES_COLORS, wizardEyes, 'eyes-color');
  });
  fireball.addEventListener('click', function () {
    setColor(charactersData.FIREBALL_COLORS, fireball, 'fireball-color');
  });
};

// ----------------------------------------------
// функция подготавливает окно настроек
var initSetup = function () {
  var setup = document.querySelector('.setup');

  // заполнить массив случайными данными
  var wizards = createCharacters(charactersData.COUNT);
  // создать разметку списка внутри контейнера
  var similarListElement = document.querySelector('.setup-similar-list');
  similarListElement.appendChild(createWizardsMarkup(wizards));
  // показать контейнер с персонажами
  var setupSimilarElement = document.querySelector('.setup-similar');
  setupSimilarElement.classList.remove('hidden');
  // интерактивные элементы окна
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupClose = setup.querySelector('.setup-close');
  // доступность интерфейса с клавиатуры
  setupOpenIcon.tabIndex = 0;
  setupClose.tabIndex = 0;
  //  добавть обработчики открытия/закрытия окна
  setSetupHandlers(setup, setupOpen, setupClose);
};

// ----------------------------------------------
// действия с формой
var setForm = function () {
  var setup = document.querySelector('.setup');
  var setupClose = setup.querySelector('.setup-close');
  var form = setup.querySelector('.setup-wizard-form');
  var userNameInput = form.querySelector('.setup-user-name');

  // добавляет недостающие атрибуты
  form.action = 'https://js.dump.academy/code-and-magick';
  userNameInput.minLength = 2;
  // убирает отправку формы нажатием Enter при крестике в фокусе
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.stopPropagation();
    }
  });
  // убирает выход по Esc при редактировании имени
  userNameInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });
  // обработчик для проверки поля ввода
  var checkUserNameInputHandler = function (evt) {
    var input = evt.target;
    if (input.validity.tooShort) {
      input.setCustomValidity('Имя персонажа не может содержать менее 2 символов');
    } else if (input.validity.tooLong) {
      input.setCustomValidity('Максимальная длина имени персонажа — 25 символов');
    } else if (userNameInput.validity.valueMissing) {
      input.setCustomValidity('Обязательное поле!');
    } else {
      input.setCustomValidity('');
    }
  };
  userNameInput.addEventListener('invalid', checkUserNameInputHandler);
  userNameInput.addEventListener('input', checkUserNameInputHandler);
  // меняет цвет персонажа
  setWizardColor();
};

// ===============================================

initSetup();
setForm();
