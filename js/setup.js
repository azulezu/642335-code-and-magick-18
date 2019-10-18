'use strict';

// -------------------------------------------------
// создание разметки для персонажей
// -------------------------------------------------

(function () {
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
  // создает разметку списка внутри контейнера
  var similarListElement = document.querySelector('.setup-similar-list');
  similarListElement.appendChild(createWizardsMarkup(window.data.wizards));
  // показывает контейнер с персонажами
  var setupSimilarElement = document.querySelector('.setup-similar');
  setupSimilarElement.classList.remove('hidden');
})();
