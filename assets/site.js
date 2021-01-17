/**
 * Copyright (c) 2021 - Marc Ed Raffalli
 * https://marc-ed-raffalli.github.io/
 */
(function () {

  document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

  function onDOMContentLoaded() {
    addTargetBlank(document.querySelectorAll('a[href^="http"]'));
  }

  function addTargetBlank(links) {
    links.forEach(function (elt) {
      elt.setAttribute('target', '_blank');
      elt.setAttribute('rel', 'noopener noreferrer');
    });
  }
}());
