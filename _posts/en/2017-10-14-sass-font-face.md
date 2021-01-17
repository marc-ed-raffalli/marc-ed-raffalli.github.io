---
layout:       topic
lang:         en
ref:          scss-font-face
parent:       posts
title:        SASS font-face mixin
description:  Import fonts using a simple SASS mixin.
date:         2017-10-14
hasCodeBlock: true
tags:         [tutorials, frontend, css, scss]
keywords:     [
advice,
css,
css3,
font,
font-face,
font-family,
font-style,
font-weight,
lesson,
mixin,
recommendation,
short,
scss,
tutorial,
variations,
web,
woff,
woff2
]
---

Importing the variations of a font can be a very tedious job with CSS only.
Languages like SASS help a lot to reduce the burden.

{% include skipToArrow.html
href='#code'
message='Go to code'
%}

**Audience**

Anybody interested in web development, with the basic knowledge of SASS.

**Objective**

Create a SASS mixin allowing to import a complex set of font variations.

**Targeted / tested browsers**

- Chrome  (latest)
- Firefox (latest)
- Chrome for Android (latest)

**Techniques used**

- SASS Mixin
- SASS Map
- SASS Array
- SASS Function

**References**

- [MDN: CSS @font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/%40font-face)
- [CSS Tricks: Using @font-face](https://css-tricks.com/snippets/css/using-font-face/)
- [Sass documentation](http://sass-lang.com/documentation/)

## Code

The implementation below is based on maps to describe the variation details such as `file`, `weight` and `style`.
`addFontFace` receives:

- the name of the font-family
- the base path where the font files are stored
- the list of supported formats, will be used in `format('...')` and to decide the file extension)
- the list of font definition as returned by `createFontMap`

It could also be done with a 2 dimensions array.
It would be required to check the array length before accessing an index in order to avoid getting errors.

```scss
@function createFontMap($file, $weight:normal, $style:normal) {
  $def: (
    file: $file,
    weight: $weight,
    style: $style
  );
  @return $def;
}

@mixin addFontFace($fontFamily, $basePath, $formats, $defList) {
  @each $def in $defList {
    $src: ();
    @each $format in $formats {
      $ext: $format;

      @if ($format == 'truetype') {
        $ext: 'ttf';
      }

      $url: url('#{$basePath}/#{map_get($def, 'file')}.#{$ext}') format(quote($format));
      $src: append($src, $url, comma);
    }

    @font-face {
      font-family: quote($fontFamily);
      font-weight: map_get($def, 'weight');
      font-style: map_get($def, 'style');
      src: $src;
    }
  }
}
```

Writing this post for a font with a couple of variations would appear overkill.
This is the reason why I choose the font
[Montserrat](https://fonts.google.com/specimen/Montserrat) and its 18 styles for the demo below.

```scss
@include addFontFace(Montserrat, 'tutorials/fonts/montserrat', ('woff', 'woff2'), (
  createFontMap('montserrat-latin-100', 100),
  createFontMap('montserrat-latin-100italic', 100, italic),
  createFontMap('montserrat-latin-200', 200),
  createFontMap('montserrat-latin-200italic', 200, italic),
  createFontMap('montserrat-latin-300', 300),
  createFontMap('montserrat-latin-300italic', 300, italic),
  createFontMap('montserrat-latin-400', 400),
  createFontMap('montserrat-latin-400italic', 400, italic),
  createFontMap('montserrat-latin-500', 500),
  createFontMap('montserrat-latin-500italic', 500, italic),
  createFontMap('montserrat-latin-600', 600),
  createFontMap('montserrat-latin-600italic', 600, italic),
  createFontMap('montserrat-latin-700', 700),
  createFontMap('montserrat-latin-700italic', 700, italic),
  createFontMap('montserrat-latin-800', 800),
  createFontMap('montserrat-latin-800italic', 800, italic),
  createFontMap('montserrat-latin-900', 900),
  createFontMap('montserrat-latin-900italic', 900, italic)
));
```

This implementation allows adding fonts supported by modern browsers.
If you want to support older browsers (e.g. add eot font), update the `addFontFace` mixin.
