---
layout:       topic
lang:         en
parent:       post-common-issues
ref:          post-common-issues-full-height-header-footer
title:        Full height body with header / footer
description:  This tutorial covers different aspects to address when creating a layout composed of
              a header, footer at the bottom and body taking the full available height.
date:         2017-09-12
hasCodeBlock: true
tags:         [tutorials, frontend, css]
keywords:     [
absolute,
advice,
beginner,
body,
calc,
css,
css3,
flex,
flex-basis,
flex-grow,
flex-shrink,
flexbox,
footer,
header,
height,
html,
layout,
lesson,
line,
line-break,
markup,
overflow,
percent,
percentage,
pixel,
position,
recommendation,
short,
text,
tutorial,
web,
white-space,
wrap
]
---

Assume a column with a header a body and a sticky footer.

There could be many challenges to address and different ways to address them:

- full height body
- text overflowing in header / footer:
  - force one line and show `...`
  - allow text to go on a new line

```
 ___________     ___________
| header... |   | multiline |
|-----------|   | header    |
| multiline |   |-----------|
| body      |   | multiline |
|           |   | body      |
|           |   |-----------|
|-----------|   | multiline |
| footer... |   | footer    |
|___________|   |___________|
```

We will work on the following markup:

```html
<div class="column">
    <h2 class="column-header">The column header</h2>
    <div class="column-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</div>
    <footer class="column-footer">The column footer</footer>
</div>
```

Both single and multi line are easy to style using flex boxes.
Other approaches have several downsides.

**Single line**

Forcing the text to a single line can easily be done with

```css
white-space: nowrap;
overflow: hidden;
```

Then, `text-overflow`
- `ellipsis` to show `...` at the end of the line.
- `clip` cut the text overflowing

**Multiple line**

Forcing the text to show on multiple lines is sometimes required when dealing with dynamic content where the words may be long.
[MDN: CSS Word-break](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break)

```css
word-break: break-all;
```

## Don't

### Don't use magic numbers

In this case as in the [split panel](./horizontal-split.html), you **should not** use approximate percentage values.
The following style will seem to give full height to the body in some cases:

```css
.column-body {
    height: 80%;
}
```

**Why is it not appropriate?**

It is not appropriate because the height taken by the `.column-body` is constant.
The height taken by 1% varies in function of the height of the parent element.
Removing 20% may remove enough height to place the header and footer on big screens, but it won't for small devices.


### Don't use position absolute

Although placing the elements absolutely would be enough for a fixed height header and footer, we will cover a better way
(spoiler alert, flex is part of the solution).

Assuming the height of the header and footer is 50px, a common way to style it could be:

```css
.column-body {
    position: absolute;
    top: 50px;
    bottom: 50px;
}

.column-footer {
    position: absolute;
    bottom: 0;
}
```

**Why is it not appropriate?**

The main reason why in this case is the maintainability of the code.
Because the height is calculated on a fixed value, any change in the header / footer height will involve a change in the positioning of the body.


### Don't use css calc()

CSS has a very nice feature called `calc`.
It allows to compute values from a mix of units e.g. %, px, etc.

This method would be enough for a fixed height header and footer but we will cover a better way.

Assuming the height of the header and footer is 50px, a common way to style it could be:

```css
.column-body {
    height: calc(100% - 2 * 50px);
}
```

This method sets the height of `.column-body` to the full height less the height of the header and footer.

**Why is it not appropriate?**

The main reason why in this case is the maintainability of the code.
Because the height is calculated on a fixed value, any change in the header / footer height will require to change the height of the body.


## DO instead

### Flex boxes

The flex boxes are very handy in many situations.
In this case, they can be used in the following way to solve the issue:

```css
.column {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.column-body {
    flex: 1 1 auto;
}

.column-header,
.column-footer {
    flex: 0 0 auto;
}
```

The `flex` syntax may be a bit scary at first sight, let's explain that bit:

`flex` is the short version for:

- `flex-grow`
- `flex-shrink`
- `flex-basis`

In this example, `.column-body`'s height can grow and shrink.
`.column-header` and `.column-footer`'s height should only match the height of their respective content.

For a more complete guide, see [CSS Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

**Why is it better?**

The big advantage of flex boxes is in the flexibility.
The height of `.column-header` and `.column-footer` could change, the body would adapt automatically.
