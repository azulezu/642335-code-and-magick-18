'use strict';

// -------------------------------------------------
// модуль подготавливает окно настроек
// -------------------------------------------------

(function () {

  var setup = document.querySelector('.setup');
  // начальное положение окна
  var SETUP_TOP = setup.style.top;
  var SETUP_LEFT = setup.style.left;


  // обработчики открытия/закрытия окна настроек

  var popupEscPressHandler = function (evt) {
    window.utils.isEscEvent(evt, closePopup.bind(null, setup));
  };

  var openPopup = function (popup) {
    popup.style.top = SETUP_TOP;
    popup.style.left = SETUP_LEFT;
    popup.classList.remove('hidden');
    document.addEventListener('keydown', popupEscPressHandler);
  };

  var closePopup = function (popup) {
    popup.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  // ----------------------------------------------
  // интерактивные элементы окна
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupClose = setup.querySelector('.setup-close');

  // доступность интерфейса с клавиатуры
  setupOpenIcon.tabIndex = 0;
  setupClose.tabIndex = 0;

  //  добавляет обработчик перемещения окна
  var setupHandle = setup.querySelector('.upload');
  window.makeMovable(setup, setupHandle);

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
