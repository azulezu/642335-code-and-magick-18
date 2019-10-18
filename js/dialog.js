'use strict';

// -------------------------------------------------
// модуль подготавливает окно настроек
// -------------------------------------------------

(function () {
  // ----------------------------------------------
  // обработчики открытия/закрытия окна настроек

  var popupEscPressHandler = function (evt) {
    window.utils.isEscEvent(evt, closePopup.bind(null, setup));
  };

  var openPopup = function (popup) {
    popup.classList.remove('hidden');
    document.addEventListener('keydown', popupEscPressHandler);
  };

  var closePopup = function (popup) {
    popup.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  // ----------------------------------------------
  var setup = document.querySelector('.setup');
  // интерактивные элементы окна
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupClose = setup.querySelector('.setup-close');

  // доступность интерфейса с клавиатуры
  setupOpenIcon.tabIndex = 0;
  setupClose.tabIndex = 0;

  //  добавляет обработчик перемещения окна
  var dialogHandle = setup.querySelector('.upload');
  window.doMovable(setup, dialogHandle);

  //  добавляет обработчики открытия/закрытия окна настроек
  // чтобы показать блок setup
  setupOpen.addEventListener('click', function () {
    openPopup(setup);
  });
  setupOpen.addEventListener('keydown', function evt() {
    window.utils.isEnterEvent(evt, openPopup.bind(null, setup));
  });
  // чтобы скрыть блок setup
  setupClose.addEventListener('click', function () {
    closePopup(setup);
  });
  setupClose.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup.bind(null, setup));
  });
})();
