'use strict';

// -------------------------------------------------
// функции для получения случайных значений
// -------------------------------------------------

(function () {
  window.random = {
    // случайный индекс массива с числом элементов length
    getRandomArrayIndex: function (length) {
      return Math.floor(Math.random() * length);
    },

    // случайное логическое значение
    getRandomBoolean: function () {
      return !!(Math.round(Math.random()));
    },

    // случайный элемент массива
    getRandomArrayElement: function (array) {
      return array[window.random.getRandomArrayIndex(array.length)];
    }
  };
})();
