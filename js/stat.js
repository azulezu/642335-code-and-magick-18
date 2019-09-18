'use strict';

var TITLE = 'Ура вы победили!\nСписок результатов:';

var fontStyle = {
  SIZE: '16px',
  FAMILY: 'PT Mono',
  LINE_HEIGHT: 21,
  COLOR: '#000',
};

// отступ от левого края "облака"
var MARGIN_LEFT = 30;
// отступ от верха "облака"
var MARGIN_TOP = 20;

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

var barSize = {
  GAP: 50,
  WIDTH: 40,
  HEIGHT: 150,
};

var renderCloud = function (ctx, cloud) {
  ctx.fillStyle = cloud.COLOR;

  ctx.beginPath();
  ctx.moveTo(cloud.X, cloud.Y);
  ctx.lineTo(cloud.X + cloud.WIDTH / 2, cloud.Y + 5);
  ctx.lineTo(cloud.X + cloud.WIDTH, cloud.Y);
  ctx.lineTo(cloud.X + cloud.WIDTH - 15, cloud.Y + cloud.HEIGHT / 2);
  ctx.lineTo(cloud.X + cloud.WIDTH, cloud.Y + cloud.HEIGHT);
  ctx.lineTo(cloud.X + cloud.WIDTH / 2, cloud.Y + cloud.HEIGHT - 5);
  ctx.lineTo(cloud.X, cloud.Y + cloud.HEIGHT);
  ctx.lineTo(cloud.X + 15, cloud.Y + cloud.HEIGHT / 2);
  ctx.closePath();

  ctx.stroke();
  ctx.fill();
};

var renderText = function (ctx, txt, txtPosition, font) {
  ctx.fillStyle = font.COLOR;
  ctx.font = font.SIZE + ' ' + font.FAMILY;
  ctx.textAlign = txtPosition.alignX;
  ctx.textBaseline = txtPosition.alignY;
  ctx.fillText(txt, txtPosition.x, txtPosition.y);
};

var renderBar = function (ctx, index, maxScale, name, time) {
  var textPosition = {};
  var barHeight = Math.round(time * barSize.HEIGHT / maxScale);
  var barColor = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + getRandomPercent() + '%, 50%)';

  // столбик диаграммы
  ctx.fillStyle = barColor;
  ctx.fillRect(index * (barSize.GAP + barSize.WIDTH), barSize.HEIGHT - barHeight, barSize.WIDTH, barHeight);

  // время игрока
  textPosition.x = index * (barSize.GAP + barSize.WIDTH) + barSize.WIDTH / 2;
  textPosition.y = barSize.HEIGHT - barHeight - fontStyle.LINE_HEIGHT;
  textPosition.alignX = 'center';
  textPosition.alignY = 'top';
  renderText(ctx, Math.round(time), textPosition, fontStyle);

  // имя игрока
  textPosition.x = index * (barSize.GAP + barSize.WIDTH);
  textPosition.y = barSize.HEIGHT + fontStyle.LINE_HEIGHT;
  textPosition.alignX = 'start';
  textPosition.alignY = 'bottom';
  renderText(ctx, name, textPosition, fontStyle);
};

var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
};

var getRandomPercent = function () {
  return Math.floor(Math.random() * 100 + 1);
};

window.renderStatistics = function (ctx, names, times) {
  var textPosition = {
    x: 0,
    y: 0,
    alignX: 'start',
    alignY: 'top',
  };

  // разбить текст на строки
  var lines = TITLE.split('\n');

  // сохранить исходные настройки
  ctx.save();

  // нарисовать облако с тенью
  renderCloud(ctx, shadowParams);
  renderCloud(ctx, cloudParams);

  // вывести заголовок
  textPosition.x = cloudParams.X + cloudParams.WIDTH / 2;
  textPosition.y = cloudParams.Y + MARGIN_TOP;
  textPosition.alignX = 'center';
  renderText(ctx, lines[0], textPosition, fontStyle);

  textPosition.x = cloudParams.X + MARGIN_LEFT;
  textPosition.y += fontStyle.LINE_HEIGHT;
  textPosition.alignX = 'start';
  renderText(ctx, lines[1], textPosition, fontStyle);

  // перенести начало координат в верхний левый угол диаграммы
  ctx.translate(cloudParams.X + 2 * MARGIN_LEFT, cloudParams.Y + MARGIN_TOP + 3 * fontStyle.LINE_HEIGHT);

  // определить параметры диаграммы
  var maxTime = getMaxElement(times);

  // вывести диаграмму
  for (var i = 0; i < names.length; i++) {
    renderBar(ctx, i, maxTime, names[i], times[i]);
  }

  // вернуть начальные значения
  ctx.restore();
};
