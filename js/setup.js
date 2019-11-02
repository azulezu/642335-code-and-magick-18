'use strict';

// -------------------------------------------------
// создает разметку для списка персонажей
// -------------------------------------------------

(function () {
  var NUMBER_OF_SIMILAR_WIZARDS = 4;

  // функция создания DOM-элемента на основе JS-объекта
  var createWizard = function (template, charactersArrayElement) {
    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = charactersArrayElement.name;
    wizardElement.querySelector('.wizard-coat').style.fill = charactersArrayElement.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = charactersArrayElement.colorEyes;
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

  // выбрать несколько случайных волшебников из массива
  var getSomeWizards = function () {
    var someWizards = [];
    var numberSimilarElements = Math.min(NUMBER_OF_SIMILAR_WIZARDS, window.data.wizards.length);
    for (var i = 0; i < numberSimilarElements; i++) {
      someWizards.push(window.utils.getRandomArrayElement(window.data.wizards));
    }
    return someWizards;
  };

  // функция показывает выбранных волшебников
  var renderWizards = function (list, listElement, wizards) {
    listElement.innerHTML = '';
    listElement.appendChild(createWizardsMarkup(wizards));
    // показывает контейнер с персонажами
    list.classList.remove('hidden');
  };

  // функция заполняет список волшебников
  var showSimilarWizards = function () {
    var setupSimilarElement = document.querySelector('.setup-similar');
    var similarListElement = document.querySelector('.setup-similar-list');

    if (window.data.wizards.length) {
      renderWizards(setupSimilarElement, similarListElement, getSomeWizards());
    } else {
      window.data.loadWizards(function () {
        renderWizards(setupSimilarElement, similarListElement, getSomeWizards());
      });
    }
  };

  window.setup = {
    showWizards: showSimilarWizards
  };
})();
