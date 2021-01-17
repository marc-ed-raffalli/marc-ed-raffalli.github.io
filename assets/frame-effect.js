/**
 * Copyright (c) 2021 - Marc Ed Raffalli
 * https://marc-ed-raffalli.github.io/
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

  function onDOMContentLoaded() {

    document.querySelectorAll('.mer-frame')
      .forEach(elt => {
        elt.addEventListener('mouseenter', () => {
          elt.classList.add('mer-view_enter');
        }, {passive: true});
        elt.addEventListener('mousemove', evt => onMouseMoveInFrame(evt, elt), {passive: true});
        elt.addEventListener('mouseleave', () => routeParallaxEffect(elt), {passive: true});
      });
  }

  function onMouseMoveInFrame(evt, elt) {
    const rect = elt.getBoundingClientRect(),
      // allow move within defined range X deg
      range = 40,
      posCenteredInElt = {
        x: (evt.clientX - rect.left) - (rect.width / 2),
        y: (evt.clientY - rect.top) - (rect.height / 2),
      };

    const
      positionPctInEltX = getPct(100 * 2, rect.width, posCenteredInElt.x),
      positionPctInEltY = getPct(100 * 2, rect.height, posCenteredInElt.y),
      xAxis = getPct(range, rect.height, posCenteredInElt.y),
      yAxis = -getPct(range, rect.width, posCenteredInElt.x);

    routeParallaxEffect(
      elt,
      positionPctInEltX, positionPctInEltY,
      xAxis.toFixed(1), yAxis.toFixed(1)
    );
  }

  function routeParallaxEffect(elt, positionPctInEltX = 0, positionPctInEltY = 0, xAxis = 0, yAxis = 0) {
    switch (elt.dataset.frameId) {
      case 'fxClick':
        return frameAnimationFxClick(elt, positionPctInEltX, positionPctInEltY, xAxis, yAxis);
    }
  }

  function frameAnimationFxClick(elt, positionPctInEltX, positionPctInEltY, xAxis, yAxis) {
    const
      translationFactor = .075,
      translationX = (-positionPctInEltX * translationFactor).toFixed(1),
      translationY = (-positionPctInEltY * translationFactor).toFixed(1);

    const
      screenElt = elt.querySelector('.mer-screen'),
      headerElt = elt.querySelector('.mer-header');

    screenElt.style.transform = `rotateX(${xAxis}deg) rotateY(${yAxis}deg)`;
    headerElt.style.transform = `translateX(${translationX}px) translateY(${translationY}px)`;
    applyShadow(headerElt, translationX, translationY, true);

    elt.querySelectorAll('.mer-bar').forEach(barElt => {
      barElt.style.transform = `translateX(${translationX}px) translateY(${translationY}px)`;
      applyShadow(barElt, translationX, translationY);
    });
  }

  function applyShadow(elt, x, y, isText) {
    const shadow = `${x}px ${y}px 2px rgba(0, 0, 0, .2)`;

    if (isText) {
      elt.style.textShadow = shadow;
      return;
    }

    elt.style.boxShadow = shadow;
  }

  function getPct(base, total, pos) {
    return (base / total) * pos;
  }

}());
