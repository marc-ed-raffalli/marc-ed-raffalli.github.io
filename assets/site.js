/**
 * Copyright (c) 2021 - Marc Ed Raffalli
 * https://marc-ed-raffalli.github.io/
 */
(function () {

  document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

  function onDOMContentLoaded() {
    addTargetBlank(document.querySelectorAll('a[href^="http"]'));
    addAnimateOnScreen(document.querySelectorAll('.mer-aos'));
  }

  function addTargetBlank(links) {
    links.forEach(function (elt) {
      elt.setAttribute('target', '_blank');
      elt.setAttribute('rel', 'noopener noreferrer');
    });
  }

  function addAnimateOnScreen(elts) {
    const CLASS_INITIAL = 'mer-initial';
    const CLASS_NO_TRANSITION = 'mer-no-transition';
    const CLASS_ENTER = 'mer-enter';
    const SCREEN_SIZE_COEFFICIENT = .9;

    const throttledAnimationHandler = throttleFunction((coefficient) => {
      const animateAtPoint = window.innerHeight * coefficient;

      for (const elt of elts) {
        const eltRect = elt.getBoundingClientRect();
        const isInViewPort = animateAtPoint > eltRect.top;

        if (isInViewPort) {
          elt.classList.remove(CLASS_INITIAL);
          elt.classList.add(CLASS_ENTER);
          continue;
        }

        // all items are positioned relatively
        // skip the reminder of the list is the first item is not in the viewport
        break;
      }
    }, 100);

    // prevent animation on load
    elts.forEach((elt) => elt.classList.add(CLASS_INITIAL, CLASS_NO_TRANSITION));
    setTimeout(() => elts.forEach((elt) => elt.classList.remove(CLASS_NO_TRANSITION)), 1000);

    window.addEventListener('scroll', () => throttledAnimationHandler(SCREEN_SIZE_COEFFICIENT), {passive: true});
    window.addEventListener('resize', () => throttledAnimationHandler(SCREEN_SIZE_COEFFICIENT), {passive: true});

    // add class for all elements visible on the screen
    throttledAnimationHandler(1);
  }

  function throttleFunction(cb, delay) {
    let lastTimeoutId;

    return function () {
      if (lastTimeoutId) {
        return;
      }

      lastTimeoutId = setTimeout(() => {
        lastTimeoutId = undefined;
        cb.apply(null, arguments);
      }, delay);
    };
  }

}());
