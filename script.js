(function () {
  'use strict';

  var screen1 = document.getElementById('screen1');
  var screen2 = document.getElementById('screen2');
  var btnYes = document.getElementById('btn-yes');
  var btnNo = document.getElementById('btn-no');

  var RUN_AWAY_THRESHOLD = 100;
  var RUN_AWAY_STRENGTH = 1.2;
  var MAX_OFFSET = 180;

  var offsetX = 0;
  var offsetY = 0;

  function getCenter(el) {
    var rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  function distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function onPointerMove(e) {
    var clientX = e.clientX != null ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    var clientY = e.clientY != null ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

    var center = getCenter(btnNo);
    var dist = distance(clientX, clientY, center.x, center.y);

    if (dist < RUN_AWAY_THRESHOLD && dist > 0) {
      var dx = (center.x - clientX) / dist;
      var dy = (center.y - clientY) / dist;
      var move = (RUN_AWAY_THRESHOLD - dist) * RUN_AWAY_STRENGTH;
      offsetX = clamp(offsetX + dx * move, -MAX_OFFSET, MAX_OFFSET);
      offsetY = clamp(offsetY + dy * move, -MAX_OFFSET, MAX_OFFSET);
    } else {
      offsetX *= 0.85;
      offsetY *= 0.85;
    }

    btnNo.style.transform = 'translate(' + offsetX + 'px, ' + offsetY + 'px)';
  }

  function showScreen2() {
    screen1.setAttribute('aria-hidden', 'true');
    screen2.setAttribute('aria-hidden', 'false');
  }

  btnYes.addEventListener('click', showScreen2);

  document.addEventListener('mousemove', onPointerMove);
  document.addEventListener('touchmove', onPointerMove, { passive: true });
})();
