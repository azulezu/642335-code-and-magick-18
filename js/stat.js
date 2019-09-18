'use strict';

// отступ от левого края "облака"
var MARGIN_LEFT = 30;
// отступ от верха "облака"
var MARGIN_TOP = 20;


// значения параметров "облака" и тени
var cloudParams = {
  X: 100,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270,
  COLOR: '#fff',
};

var SHADOW_OFFSET = 10;

var shadowParams = {
  X: cloudParams.X + SHADOW_OFFSET,
  Y: cloudParams.Y + SHADOW_OFFSET,
  WIDTH: cloudParams.WIDTH,
  HEIGHT: cloudParams.HEIGHT,
  COLOR: 'rgba(0, 0, 0, 0.7)',
};


// значения параметров заголовка
var TITLE = 'Ура вы победили!\nСписок результатов:';

var titleParams = {
  X: cloudParams.X + MARGIN_LEFT,
  Y: cloudParams.Y + MARGIN_TOP,
  alignX: 'start',
  alignY: 'top',
};

var fontStyle = {
  SIZE: '16px',
  FAMILY: 'PT Mono',
  LINE_HEIGHT: 20,
  COLOR: '#000',
};

// значения параметров диаграммы
var chartStart = {
  X: cloudParams.X + 2 * MARGIN_LEFT,
  Y: cloudParams.Y + MARGIN_TOP + 2 * fontStyle.LINE_HEIGHT,
};

var barSize = {
  GAP: 50,
  WIDTH: 40,
  HEIGHT: 150,
};


// функции вывода
var renderCloud = function (ctx, cloud) {
  ctx.fillStyle = cloud.COLOR;

  ctx.beginPath();
  ctx.moveTo(cloud.X, cloud.Y);
  ctx.lineTo(cloud.X + cloud.WIDTH / 2, cloud.Y + 5);
  ctx.lineTo(cloud.X + cloud.WIDTH, cloud.Y);
  ctx.lineTo(cloud.X + cloud.WIDTH - 10, cloud.Y + cloud.HEIGHT / 2);
  ctx.lineTo(cloud.X + cloud.WIDTH, cloud.Y + cloud.HEIGHT);
  ctx.lineTo(cloud.X + cloud.WIDTH / 2, cloud.Y + cloud.HEIGHT - 5);
  ctx.lineTo(cloud.X, cloud.Y + cloud.HEIGHT);
  ctx.lineTo(cloud.X + 10, cloud.Y + cloud.HEIGHT / 2);
  ctx.closePath();

  ctx.stroke();
  ctx.fill();
};

var renderText = function (ctx, txt, txtParams, font) {
  ctx.font = font.SIZE + ' ' + font.FAMILY;
  ctx.fillStyle = font.COLOR;
  ctx.textAlign = txtParams.alignX;
  ctx.textBaseline = txtParams.alignY;
  txt.split('\n').forEach(function (line, index) {
    ctx.fillText(line, txtParams.X, txtParams.Y + index * font.LINE_HEIGHT);
  });
};

var renderBar = function (ctx, index, maxScale, label, value) {
  var barHeight = Math.round(value * barSize.HEIGHT / maxScale);
  var labelParams = {
    X: index * (barSize.GAP + barSize.WIDTH),
    Y: barSize.HEIGHT + 2 * fontStyle.LINE_HEIGHT,
    alignX: 'start',
    alignY: 'bottom',
  };
  var valueParams = {
    X: index * (barSize.GAP + barSize.WIDTH) + barSize.WIDTH / 2,
    Y: barSize.HEIGHT - barHeight,
    alignX: 'center',
    alignY: 'top',
  };
  var barColor = (label === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + getRandomPercent() + '%, 50%)';

  // столбик диаграммы
  ctx.fillStyle = barColor;
  ctx.fillRect(index * (barSize.GAP + barSize.WIDTH), fontStyle.LINE_HEIGHT + barSize.HEIGHT - barHeight, barSize.WIDTH, barHeight);

  // время игрока
  renderText(ctx, Math.round(value).toString(), valueParams, fontStyle);

  // имя игрока
  renderText(ctx, label, labelParams, fontStyle);
};


// вспомогательные функции
var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
};

var getRandomPercent = function () {
  return Math.floor(Math.random() * 100 + 1);
};


// основная функция
window.renderStatistics = function (ctx, names, times) {
  // сохранить исходные настройки рисования
  ctx.save();

  // нарисовать облако с тенью
  renderCloud(ctx, shadowParams);
  renderCloud(ctx, cloudParams);

  // вывести заголовок
  renderText(ctx, TITLE, titleParams, fontStyle);

  // перенести начало координат в верхний левый угол диаграммы
  ctx.translate(chartStart.X, chartStart.Y);

  // определить масштаб диаграммы
  var maxTime = getMaxElement(times);

  // вывести диаграмму
  for (var i = 0; i < names.length; i++) {
    renderBar(ctx, i, maxTime, names[i], times[i]);
  }

  // вернуть начальные настройки рисования
  ctx.restore();
};
