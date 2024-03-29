'use strict';

// ----------------------------------------------
// действия с формой
// ----------------------------------------------

(function () {
  // функция красит элемент случайным цветом и заполняет поле ввода
  var setColor = function (colors, element, name) {
    var currentColor = window.utils.getRandomArrayElement(colors);
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
      setColor(window.data.COAT_COLORS, wizardCoat, 'coat-color');
    });
    wizardEyes.addEventListener('click', function () {
      setColor(window.data.EYES_COLORS, wizardEyes, 'eyes-color');
    });
    fireball.addEventListener('click', function () {
      setColor(window.data.FIREBALL_COLORS, fireball, 'fireball-color');
    });
  };

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

  // ----------------------------------------------
  var form = document.querySelector('.setup-wizard-form');
  var userNameInput = form.querySelector('.setup-user-name');

  // добавляет форме недостающие атрибуты
  form.action = 'https://js.dump.academy/code-and-magick';
  userNameInput.minLength = 2;

  // убирает выход по Esc при редактировании имени
  userNameInput.addEventListener('keydown', function (evt) {
    window.utils.isEscEvent(evt, function () {
      evt.stopPropagation();
    });
  });

  userNameInput.addEventListener('invalid', checkUserNameInputHandler);
  userNameInput.addEventListener('input', checkUserNameInputHandler);
  // изменение цвета персонажа по клику
  setWizardColor();
})();
