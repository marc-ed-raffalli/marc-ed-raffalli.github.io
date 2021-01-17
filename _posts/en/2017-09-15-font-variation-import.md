---
layout:       topic
lang:         en
ref:          font-face-and-font-variations
parent:       posts
title:        '@font-face and font variations'
description:  This tutorial explains the basics of @font-face and how to import multiple variation of a single font-family.
date:         2017-09-15
hasCodeBlock: true
hasCustomCss: posts/font-face-and-font-variations.css
tags:         [tutorials, frontend, css]
keywords:     [
advice,
beginner,
css,
css3,
font,
font-face,
font-family,
font-style,
font-weight,
html,
lesson,
recommendation,
short,
sass,
tutorial,
variations,
web,
woff,
woff2
]
---

So you browsed the web and found a really nice font set to add to your web page and you might wonder:

> How can I import all the variations of a single font family into my project?

If it is indeed the case, you will find the answer below!
Else you can still wander around :)

{% include skipToTutorial.html %}

**Audience**

Anybody interested in web development, with the basic knowledge of HTML and CSS.

**Objective**

Import and display different variations of a same font family.

**Targeted / tested browsers**

- Chrome  (latest)
- Firefox (latest)
- Chrome for Android (latest)

**Techniques used**

- CSS `@font-face`

**References**

- [MDN: CSS @font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/%40font-face)
- [CSS Tricks: Using @font-face](https://css-tricks.com/snippets/css/using-font-face/)

## Tutorial

### Font face

You can import font using the `@font-face` in your CSS:

```css
@font-face {
    font-family: 'YourSuperFont';
    font-style:  'theStyle';
    font-weight: 'theWeight';
    src: url('path/to/your/superFont.woff2') format('woff2'),
         url('path/to/your/superFont.woff') format('woff');
}
```

Then you can use the font to style the element of your choice:

```css
p {
    font-family: 'YourSuperFont';
    font-style:  'theStyle';
    font-weight: 'theWeight';
}
```

*Notes:*
As obvious as it seems, `YourSuperFont`, `theStyle` and `theWeight` are not proper values ;)

The support for font types varies with older browsers, see support for
[Woff2](http://caniuse.com/#search=woff2),
[Woff](http://caniuse.com/#search=woff).


### Font variations

One font can have multiple variations changing aspects like font weight, font style, etc.
Each variation should be described using `@font-face` with the same `font-family`.

```css
@font-face {
    font-family: 'YourSuperFont';
    src: url('path/to/your/superFont-normal.woff2') format('woff2'),
         url('path/to/your/superFont-normal.woff')  format('woff');
}

@font-face {
    font-family: 'YourSuperFont';
    font-style:  italic;
    src: url('path/to/your/superFont-italic.woff2') format('woff2'),
         url('path/to/your/superFont-italic.woff')  format('woff');
}

@font-face {
    font-family: 'YourSuperFont';
    font-weight: 700;
    src: url('path/to/your/superFont-bold.woff2') format('woff2'),
         url('path/to/your/superFon-boldt.woff')  format('woff');
}
```

It becomes very tedious to write the `@font-face` for all variations.

One way to overcome the issue is to get the font from a service like
[Google Fonts](https://fonts.google.com/).
Using a compiler for CSS will help to reduce the tedious part of CSS... tremendously.

### DRY

DRY, DRY, DRY! (*sound of a crow screaming: "Winter is coming!"*)

Hmmm, not exactly no. Although yes, it's definitely colder these days :D

In the case it is the first time you see it, DRY stands for **D**on't **R**epeat **Y**ourself.
Easier to say than to do in this case and for CSS in general.

If you want to reduce the repetition aspect of CSS, you could use a language like [Sass](http://sass-lang.com)
which allows `mixin` (a kind of function to generate CSS).
Your stylesheet would then need to be compiled in order to be used in the HTML page.

Here's a quick mixin implementation to import the font:

```scss
@mixin addFontFace($fontFamily, $fontFilePath, $style:normal, $weight:normal) {
  @font-face {
    font-family: $fontFamily;
    font-style: $style;
    font-weight: $weight;
    src: url('#{$fontFilePath}.woff2') format('woff2'),
         url('#{$fontFilePath}.woff')  format('woff');
  }
}

@include addFontFace('YourSuperFont', 'path/to/your/superFont-normal');
@include addFontFace('YourSuperFont', 'path/to/your/superFont-italic', italic);
@include addFontFace('YourSuperFont', 'path/to/your/superFont-bold',   normal, 700);
```

In the example above, the mixin receives the `font-family`, font file path and format, `font-style` and `font-weight`.
`font-style` and `font-weight` are left as last parameters as they have default values (Sass specification).
The repetition are reduced but we can do even better, see
[SASS Font-face]({{site.baseurl}}{% post_url /en/2017-10-14-sass-font-face %})
post for more details.

### Demo

This demo uses the mixin presented in the
[SASS Font-face]({{site.baseurl}}{% post_url /en/2017-10-14-sass-font-face %}) post to import the font
[Montserrat](https://fonts.google.com/specimen/Montserrat) and its 18 styles!


<div style="font-family: 'Montserrat'" class="mt-3 mb-3">
  <div style="font-weight: 100">Thin</div>
  <div style="font-style: italic; font-weight: 100">Thin Italic</div>
  <div style="font-weight: 200">Extra-Light</div>
  <div style="font-style: italic; font-weight: 200">Extra-Light Italic</div>
  <div style="font-weight: 300">Light</div>
  <div style="font-style: italic; font-weight: 300">Light Italic</div>
  <div style="font-weight: 400">Regular</div>
  <div style="font-style: italic; font-weight: 400">Regular Italic</div>
  <div style="font-weight: 500">Medium</div>
  <div style="font-style: italic; font-weight: 500">Medium Italic</div>
  <div style="font-weight: 600">Semi-Bold</div>
  <div style="font-style: italic; font-weight: 600">Semi-Bold Italic</div>
  <div style="font-weight: 700">Bold</div>
  <div style="font-style: italic; font-weight: 700">Bold Italic</div>
  <div style="font-weight: 800">Extra-Bold</div>
  <div style="font-style: italic; font-weight: 800">Extra-Bold Italic</div>
  <div style="font-weight: 900">Black</div>
  <div style="font-style: italic; font-weight: 900">Black Italic</div>
</div>

### Common issues

**Font not rendered**

- Check out the font file is found by the browser.
  Open the browser developer tools and check the network tab. The font file should not show 404.
- The font family name should match.
- Check the `@font-face` is on top of your stylesheet.


### Conclusion

Glad you reached this part!

I hope at this point your font is showing correctly.
If not, make sure to check out the common issues section.
