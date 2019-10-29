'use strict';

(function () {

  // -------------------------------------------------
  // функции для клавиатурных обработчиков
  // -------------------------------------------------
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  // -------------------------------------------------
  // функции для получения случайных значений
  // -------------------------------------------------

  // случайный индекс массива с числом элементов length
  var getRandomArrayIndex = function (length) {
    return Math.floor(Math.random() * length);
  };

  // случайное логическое значениеF
  var getRandomBoolean = function () {
    return !!(Math.round(Math.random()));
  };

  // случайный элемент массива
  var getRandomArrayElement = function (array) {
    return array[getRandomArrayIndex(array.length)];
  };

  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomArrayIndex: getRandomArrayIndex,
    getRandomBoolean: getRandomBoolean,
    getRandomArrayElement: getRandomArrayElement
  };

})();
