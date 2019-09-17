'use strict';

var TITLE = 'Ура вы победили!\nСписок результатов:';
var COLOR_WHITE = '#fff';
var COLOR_BLACK = '#000';

var fontStyle = {
  SIZE: '16px',
  FAMILY: 'PT Mono',
  getLineHeight: function () {
    return 1.3 * parseInt(this.SIZE, 10);
  },
  getFont: function () {
    return this.SIZE + ' ' + this.FAMILY;
  },
};

// отступ от левого края "облака"
var MARGIN_LEFT = 30;
// отступ от верха "облака"
var MARGIN_TOP = 20;

var cloudSize = {
  X: 100,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270,

  getShadow: function (offset) {
    var shadowSize = {};

    for (var prop in this) {
      if (typeof prop !== 'function') {
        shadowSize[prop] = this[prop];
      }
    }
    shadowSize.X += offset;
    shadowSize.Y += offset;
    return shadowSize;
  },
};

var barSize = {
  GAP: 50,
  WIDTH: 40,
  HEIGHT: 150,
};

var renderCloud = function (ctx, cloud, color) {
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(cloud.X, cloud.Y);
  ctx.lineTo(cloud.X + cloud.WIDTH / 2, cloud.Y + 5);
  ctx.lineTo(cloud.X + cloud.WIDTH, cloud.Y);
  ctx.lineTo(cloud.X + cloud.WIDTH - 5, cloud.Y + cloud.HEIGHT / 2);
  ctx.lineTo(cloud.X + cloud.WIDTH, cloud.Y + cloud.HEIGHT);
  ctx.lineTo(cloud.X + cloud.WIDTH / 2, cloud.Y + cloud.HEIGHT - 5);
  ctx.lineTo(cloud.X, cloud.Y + cloud.HEIGHT);
  ctx.lineTo(cloud.X + 5, cloud.Y + cloud.HEIGHT / 2);
  ctx.closePath();

  ctx.stroke();
  ctx.fill();
};

var renderText = function (ctx, txt, txtPosition, font, color) {
  ctx.fillStyle = color;
  ctx.font = font.getFont();
  ctx.textAlign = txtPosition.alignX;
  ctx.textBaseline = txtPosition.alignY;
  ctx.fillText(txt, txtPosition.x, txtPosition.y);
};

var renderBar = function (ctx, index, barScaleRate, name, time) {
  var textPosition = {};
  var barHeight = time * barScaleRate;
  var barColor = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + getRandomPercent() + '%, 50%)';

  // столбик диаграммы
  ctx.fillStyle = barColor;
  ctx.fillRect(index * (barSize.GAP + barSize.WIDTH), barSize.HEIGHT - barHeight, barSize.WIDTH, barHeight);

  // время игрока
  textPosition.x = index * (barSize.GAP + barSize.WIDTH) + barSize.WIDTH / 2;
  textPosition.y = barSize.HEIGHT - barHeight - fontStyle.getLineHeight();
  textPosition.alignX = 'center';
  textPosition.alignY = 'top';
  renderText(ctx, Math.round(time), textPosition, fontStyle, COLOR_BLACK);

  // имя игрока
  textPosition.x = index * (barSize.GAP + barSize.WIDTH);
  textPosition.y = barSize.HEIGHT + fontStyle.getLineHeight();
  textPosition.alignX = 'start';
  textPosition.alignY = 'bottom';
  renderText(ctx, name, textPosition, fontStyle, COLOR_BLACK);
};

var getMaxElement = function (arr) {
  if (arr.length > 0) {
    return Math.max.apply(null, arr);
  }
  return undefined;
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
  renderCloud(ctx, cloudSize.getShadow(10), 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, cloudSize, COLOR_WHITE);

  // вывести заголовок
  textPosition.x = cloudSize.X + cloudSize.WIDTH / 2;
  textPosition.y = cloudSize.Y + MARGIN_TOP;
  textPosition.alignX = 'center';
  renderText(ctx, lines[0], textPosition, fontStyle, COLOR_BLACK);

  textPosition.x = cloudSize.X + MARGIN_LEFT;
  textPosition.y += fontStyle.getLineHeight();
  textPosition.alignX = 'start';
  renderText(ctx, lines[1], textPosition, fontStyle, COLOR_BLACK);

  // перености начало координат в верхний левый угол диаграммы
  ctx.translate(cloudSize.X + 2 * MARGIN_LEFT, cloudSize.Y + MARGIN_TOP + 3 * fontStyle.getLineHeight());

  // определить параметры диаграммы
  var maxTime = Math.round(getMaxElement(times));
  var barScaleRate = barSize.HEIGHT / maxTime;

  // вывести диаграмму
  for (var i = 0; i < names.length; i++) {
    renderBar(ctx, i, barScaleRate, names[i], times[i]);
  }

  // вернуть начальные значения
  ctx.restore();
};
