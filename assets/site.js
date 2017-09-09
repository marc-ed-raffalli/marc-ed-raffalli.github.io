/**
 * Copyright (c) 2017 - Marc Ed Raffalli
 * See LICENCE file
 */
(function () {

  document.addEventListener('DOMContentLoaded', function () {
    addTargetBlank(document.querySelectorAll('a[href^="http"]'));
  });

  function addTargetBlank(links) {
    links.forEach(function (elt) {
      elt.setAttribute('target', '_blank');
    });
  }

}());
