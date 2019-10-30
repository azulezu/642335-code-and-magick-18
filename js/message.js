'use strict';

// -------------------------------------------------
// показывает информационное окно
// -------------------------------------------------

(function () {
  var messageBox = document.createElement('div');

  var setupMessageBox = function (infoString, isError) {
    var MESSAGE_BOX_MARKUP =
        '<h3><\/h3>'
        + '<p class="message-box__string"><\/p>'
        + '<button class="message-box__button">Закрыть<\/button>';

    messageBox.classList.add('hidden');
    messageBox.className = 'message-box';
    messageBox.innerHTML = MESSAGE_BOX_MARKUP;
    var titleElement = messageBox.querySelector('h3');
    var infoStringElement = messageBox.querySelector('.message-box__string');
    infoStringElement.textContent = infoString;

    if (isError) {
      titleElement.textContent = 'Ошибка!';
      messageBox.classList.add('message-box--error');
    } else {
      titleElement.textContent = 'Информация';
      messageBox.classList.add('message-box--info');
    }

    var buttonElement = messageBox.querySelector('button');
    buttonElement.addEventListener('click', function () {
      closeMessageBox();
    });
    document.querySelector('footer').insertAdjacentElement('afterend', messageBox);
  };

  var showMessageBox = function (infoString, isError) {
    setupMessageBox(infoString, isError);
    messageBox.classList.remove('hidden');
  };

  var closeMessageBox = function () {
    messageBox.remove();
  };

  window.message = {
    show: showMessageBox,
    close: closeMessageBox
  };
})();
