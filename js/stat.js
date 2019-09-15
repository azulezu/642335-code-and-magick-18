'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var TITLE = 'Ура вы победили!\nСписок результатов:';
var GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var FONT_SIZE = '16px';
var lineHeight = 1.3 * parseInt(FONT_SIZE, 10);

// отступ от левого края "облака"
var marginLeft = 20;

// отступ от верха "облака" для текущего блока
// должен учитывать уже отрисованные блоки
var marginTop = 20; // начальное значение


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};


var renderTitle = function (ctx, txt) {
  var lines = txt.split('\n');
  ctx.fillStyle = 'black';
  ctx.font = FONT_SIZE + ' PT Mono';
  ctx.textBaseline = 'top';

  ctx.textAlign = 'center';
  ctx.fillText(lines[0], CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + marginTop);

  ctx.textAlign = 'start';
  ctx.fillText(lines[1], CLOUD_X + marginLeft, CLOUD_Y + marginTop + lineHeight);
};


var getMaxElement = function (arr) {
  var maxElement = -Infinity;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};


var renderBar = function (ctx, index, namePlayer, timePlayer, heightPlayerBar, colorBar) {
  marginLeft = 40;
  // время игрока
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(Math.round(timePlayer), CLOUD_X + marginLeft + index * (BAR_WIDTH + GAP) + BAR_WIDTH / 2, CLOUD_Y + marginTop + BAR_HEIGHT - heightPlayerBar);

  // столбик диаграммы
  ctx.fillStyle = colorBar;
  ctx.fillRect(CLOUD_X + marginLeft + index * (BAR_WIDTH + GAP), CLOUD_Y + marginTop + lineHeight + BAR_HEIGHT - heightPlayerBar,
      BAR_WIDTH, heightPlayerBar);

  // имя игрока
  ctx.fillStyle = '#000';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText(namePlayer, CLOUD_X + marginLeft + index * (BAR_WIDTH + GAP), CLOUD_Y + marginTop + BAR_HEIGHT + 2 * lineHeight);
};


var randomPercent = function () {
  return Math.floor(Math.random() * 101);
};


window.renderStatistics = function (ctx, names, times) {
  var currentColor = ctx.fillStyle;

  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderTitle(ctx, TITLE);
  marginTop += 2 * lineHeight;

  var maxTime = Math.round(getMaxElement(times));
  for (var i = 0; i < names.length; i++) {
    var colorBar = 'hsl(240, ' + randomPercent() + '%, 50%)';
    if (names[i] === 'Вы') {
      colorBar = 'rgba(255, 0, 0, 1)';
    }
    renderBar(ctx, i, names[i], times[i], (times[i] * BAR_HEIGHT / maxTime), colorBar);
  }

  // вернуть начальные значения
  marginTop = 20;
  ctx.fillStyle = currentColor;
};
