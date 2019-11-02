'use strict';

// -------------------------------------------------
// модуль для работы с сервером данных
// -------------------------------------------------

(function () {
  var TIMEOUT = 10000; // 10s
  var STATUS = {SUCCESS: 200};

  // -------------------------------------------------
  // выполняет запрос данных к серверу
  var loadData = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);

    // ответ от сервера получен
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case STATUS.SUCCESS:
          onSuccess(xhr.response);
          break;
        default:
          onError('Статус запроса: ' + xhr.status + '\nОшибка ' + xhr.statusText);
      }
    });

    // обработчики, если сервер не ответил
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open('GET', URL);
    xhr.send();
  };

  // -------------------------------------------------
  // отправляет данные формы на сервер
  var saveData = function (formData, onSuccess, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    // ответ от сервера получен
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        default:
          onError('Статус запроса: ' + xhr.status + xhr.statusText);
      }
    });

    // обработчики, если сервер не ответил
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT; // 10s
    xhr.open('POST', URL);
    xhr.send(formData);
  };

  window.backend = {
    load: loadData,
    save: saveData
  };

})();
