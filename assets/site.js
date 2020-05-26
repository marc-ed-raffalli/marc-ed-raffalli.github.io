/**
 * Copyright (c) 2017 - Marc Ed Raffalli
 *
 * https://marc-ed-raffalli.github.io/
 *
 * See LICENCE file
 */
(function () {

  document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

  function onDOMContentLoaded() {

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

    if (window.mer === undefined) return;

    mer.locale = getBestMatchingLocale(mer.locales);

    runRouteScripts(window.location.pathname);
  }

  function getElt(s) {
    return document.querySelector(s);
  }

  function runRouteScripts(route) {
    switch (route) {
      case '/':
        loadIndex(mer.locale);
      /* falls through */
      default:
        loadDefaults();
    }
  }

  function loadIndex(locale) {
    window.location.href = locale;
  }

  function loadDefaults() {

    function addTargetBlank(links) {
      links.forEach(function (elt) {
        elt.setAttribute('target', '_blank');
      });
    }

    function loadSocials(locale) {

      function getFbScriptUrl(locale) {
        return ['//connect.facebook.net/', locale || 'en-US', '/sdk.js#xfbml=1&version=v2.10'].join('');
      }

      function getGooglePlusScriptUrl() {
        return 'https://apis.google.com/js/platform.js';
      }

      function addSocialScript(url) {
        const srcElt = document.createElement('script');
        srcElt.lang = locale;
        srcElt.src = url;
        document.body.appendChild(srcElt);
      }

      addSocialScript(getFbScriptUrl(locale));
      addSocialScript(getGooglePlusScriptUrl());
    }

    addTargetBlank(document.querySelectorAll('a[href^="http"]'));
    loadSocials(mer.locale);
  }

}());
