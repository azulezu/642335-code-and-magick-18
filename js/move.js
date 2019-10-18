'use strict';

// -------------------------------------------------
// позволяет перемещать элемент
// -------------------------------------------------

(function () {
  window.doMovable = function (element, handle) {

    // обработка нажатия
    var MouseDownHandler = function (mousedownEvt) {
      mousedownEvt.preventDefault();
      startCoords.x = mousedownEvt.clientX;
      startCoords.y = mousedownEvt.clientY;
      document.addEventListener('mousemove', MouseMoveHandler);
      document.addEventListener('mouseup', MouseUpHandler);
    };

    // обработка перемещения
    var MouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      element.style.top = (element.offsetTop - shift.y) + 'px';
      element.style.left = (element.offsetLeft - shift.x) + 'px';
    };

    // завершение перемещения
    var MouseUpHandler = function (mouseupEvt) {
      mouseupEvt.preventDefault();
      document.removeEventListener('mousemove', MouseMoveHandler);
      document.removeEventListener('mouseup', MouseUpHandler);
      if (dragged) {
        var clickPreventDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          handle.removeEventListener('click', clickPreventDefaultHandler);
        };
        handle.addEventListener('click', clickPreventDefaultHandler);
      }
    };

    // -------------------------------------------------
    var dragged = false;
    var startCoords = {};
    handle.addEventListener('mousedown', MouseDownHandler);
  };
})();
