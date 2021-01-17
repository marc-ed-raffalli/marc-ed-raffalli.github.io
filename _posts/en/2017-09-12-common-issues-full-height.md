---
layout:       topic
lang:         en
parent:       post-common-issues
ref:          post-common-issues-full-height
title:        Full height
description:  This tutorial explains the reason why an element height 100% may not always render as we think.
date:         2017-09-12
hasCodeBlock: true
tags:         [tutorials, frontend, css]
keywords:     [
absolute,
advice,
beginner,
css,
css3,
flex,
flex-basis,
flex-grow,
flex-shrink,
flexbox,
full-height,
full-screen,
height,
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

Assume a regular full height element `h-100`.

Would you expect the following markup and styles to render the `.h-100` element on the full screen / view port?

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

**Why?**

The reason is simple, the dimensions in `%` are relative to the parent element.
The `html` and `body` tag do not have any height set by default.

## Don't

### Don't use fixed numbers

It would be easy to set the height of the element to the value of the height of the screen in pixels.

```css
.h-100 {
    height: 1234px;
    background-color: #cccccc;
}
```

**Why is it not appropriate?**

It is not appropriate because of the variety of devices accessing the web; all different width and height.
The value set would only work for a limited set of devices.

### Don't use position absolute

Placing the element absolutely solves the problem in some cases.

```css
.h-100 {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}
```

But it would not be appropriate for all cases.
In general, you should use `position: absolute` only when you want the element to be "*detached*" from the flow.
e.g. rendering independently of everything like a side panel, a modal dialog, snow flakes animation...
Elements *in the flow* have their width and height influencing other elements.

## Do

### Set the height of the parent

```css
html,
body,
.h-100{
    height: 100%;
}
```

```html
<html>
<body>
    <div class="h-100">Element with full height</div>
</body>
</html>
```
