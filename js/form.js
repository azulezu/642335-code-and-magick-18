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
    } else if (input.validity.valueMissing) {
      input.setCustomValidity('Обязательное поле!');
    } else {
      input.setCustomValidity('');
    }
  };

  // функция настройки поведения формы
  var initForm = function () {
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

    // заменяет стандартный submit и передает данные формы на сервер
    form.addEventListener('submit', function (evt) {
      window.backend.save(new FormData(form), function (response) {
        var HAS_ERROR = false;
        var setup = document.querySelector('.setup');
        window.closePopup(setup);
        window.message.show(JSON.stringify(response), HAS_ERROR);
      },
      function (response) {
        var HAS_ERROR = true;
        window.message.show(response, HAS_ERROR);
      });
      evt.preventDefault();
    });
  };

  // ----------------------------------------------
  // инициализация формы
  initForm();
  // изменение цвета персонажа по клику
  setWizardColor();
})();
