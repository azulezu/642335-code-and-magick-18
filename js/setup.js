'use strict';

(function () {

  // -------------------------------------------------
  // создание разметки для списка персонажей
  // -------------------------------------------------
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

  // ----------------------------------------------
  // создает и показывает список волшебников
  // **********************************************
  // здесь ошибка
  // **********************************************
  var showSimilarWizards = function () {
    var setupSimilarElement = document.querySelector('.setup-similar');
    var similarListElement = document.querySelector('.setup-similar-list');
    var NUMBER_OF_SIMILAR = 4;

    window.backend.load(function (data) {
      // выбрать несколько волшебников из массива
      var getWizards = function (wizards) {
        var someWizards = [];
        var numberSimilarElements = Math.min(NUMBER_OF_SIMILAR, wizards.length);
        for (var i = 0; i < numberSimilarElements; i++) {
          someWizards.push(window.utils.getRandomArrayElement(wizards));
        }
        return someWizards;
      };

      // показать выбранных волшебников
      var showWizards = function (list, listElement, wizards) {
        listElement.innerHTML = '';
        listElement.appendChild(createWizardsMarkup(wizards));
        // показывает контейнер с персонажами
        list.classList.remove('hidden');
      };

      window.data.wizards = getWizards(data);
      showWizards(setupSimilarElement, similarListElement, window.data.wizards);
    }, function (errorResponce) {
      var HAS_ERROR = true;
      window.message.show(errorResponce, HAS_ERROR);
    }
    );
  };

  window.setup = {
    showWizards: showSimilarWizards
  };
})();
