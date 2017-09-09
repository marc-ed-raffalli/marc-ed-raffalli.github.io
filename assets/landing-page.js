/**
 * Copyright (c) 2017 - Marc Ed Raffalli
 */
(function () {

  document.addEventListener('DOMContentLoaded', function () {
    var locale = getBestMatchingLocale(supportedLocales);

    getElt('.mer-js-alert').style.display = 'none';

    redirectTimeout(5, locale);
  });

  function getElt(s) {
    return document.querySelector(s);
  }

  function getBestMatchingLocale(supportedLocales) {
    var defaultLocale = 'en';

    if (!window.navigator) {
      return defaultLocale;
    }

    var browserLocales = navigator.languages !== undefined ? navigator.languages : [navigator.language];

    for (var i = 0, l = browserLocales.length; i < l; i++) {
      var baseLocale = browserLocales[i].toLocaleLowerCase().split('-')[0];

      if (supportedLocales.indexOf(baseLocale) !== -1) {
        return baseLocale;
      }
    }

    return defaultLocale;
  }

  function redirectTimeout(timeout, locale) {
    var countdownRedirectElt = getElt('.mer-redirectCountdown');

    getElt('.mer-redirectLabel').textContent = 'Redirecting in';

    countdownRedirectElt.textContent = timeout;

    setInterval(function () {
      timeout--;

      countdownRedirectElt.textContent = timeout;

      if (timeout <= 0) {
        window.location.href = locale;
      }
    }, 1000);
  }

}());
