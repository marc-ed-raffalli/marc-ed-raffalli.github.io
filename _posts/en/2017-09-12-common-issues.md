---
layout:      topic
lang:        en
ref:         post-common-issues
parent:      posts
title:       CSS Common issues and the ways to get around them
description: This page lists a series of short and focused tutorials based from concrete CSS examples.
             It shows the way some common challenges can be tackled as well as what are the pitfalls to avoid and why. 
date:        2017-09-12
tags:        [tutorials, frontend, css]
keywords:    [
advice,
beginner,
calc,
css,
css3,
flex,
flex-basis,
flex-grow,
flex-shrink,
flexbox,
html,
layout,
lesson,
markup,
recommendation,
short,
tutorial,
web
]
---

In this suite of tutorials, we will discuss about some common challenges and pitfalls when using CSS.
The tutorials are based from concrete examples, they explain the common issues with **do** and **don't** as well as reasons why.

**Audience**

Coderdojo web apprentice and anybody interested in web development, with the basic knowledge of HTML and CSS.

**Objective**

Cover a series of common pitfalls and their remedies. 

**Targeted / tested browsers**

- Chrome  (latest)
- Firefox (latest)
- Chrome for Android (latest)

**References**

- [MDN: Using CSS Flexible Boxes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
- [CSS Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Known issues of `display: flex`](https://github.com/philipwalton/flexbugs)

## Common issues

### Height 100%

Assume a regular full height element.

Would you expect the following markup and styles to render the `.h-100` element on the full screen?

```css
.h-100 {
    height: 100%;
    background-color: #cccccc;
}
```

```html
<html>
<body>
    <div class="h-100">Element with full height</div>
</body>
</html>
```

The element covers the height of its own content.

[See why and how to solve the issue](./common-issues-full-height.html)


### Horizontal split

Assume a regular split screen 50-50.

Would you expect the following markup and styles to render the two elements side by side?

```css
.split-50 {
    display: inline-block;
    width: 50%;
}
```

```html
<div>
    <div class="split-50">Left side</div>
    <div class="split-50">Right side</div>
</div>
```

What is most likely to happen is the two elements will be on a separate line.

[See why and how to solve the issue](./common-issues-horizontal-split.html)


### Full height body with header / footer

Assume a column with a header a body and a sticky footer.

There could be many challenges to address and different ways to address them:

- full height body
- text overflowing in header / footer:
  - force one line and show `...` 
  - allow text to go on a new line

[See how to solve these challenges](./common-issues-full-height-body-with-header-footer.html)

