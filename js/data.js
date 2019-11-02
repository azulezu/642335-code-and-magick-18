'use strict';

// -------------------------------------------------
// создает набор данных для персонажей
// -------------------------------------------------

(function () {
  window.data = {
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
      'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
    ],
    EYES_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    wizards: [],
    loadWizards: function (cb) {
      window.backend.load(
          function (data) { // onSuccess
            window.data.wizards = data;
            if (cb !== undefined) {
              cb();
            }
          },
          function (errorResponce) { // onError
            var HAS_ERROR = true;
            window.message.show('Не удалось загрузить волшебников с сервера \n' + errorResponce, HAS_ERROR);
          });
    }
  };

  // -------------------------------------------------
  window.data.loadWizards();
})();
