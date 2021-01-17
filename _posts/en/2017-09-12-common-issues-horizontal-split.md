---
layout:       topic
lang:         en
parent:       post-common-issues
ref:          post-common-issues-horizontal-split
title:        Horizontal split
description:  This tutorial explains the reason why two element width 50% may not always render as we think (side by side).
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
float,
font-size,
full-height,
full-screen,
horizontal,
html,
inline-block,
layout,
lesson,
markup,
recommendation,
short,
tutorial,
web,
width
]
---

Assume a regular horizontal split screen 50-50.

You would expect the following markup and styles to render the two elements side by side.

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

<div class="mer-resizable">
    <div>
        <div style="display: inline-block; width: 50%">
            <p>Left side</p>
<pre>
display: inline-block;
width: 50%;
</pre>
        </div>
        <div style="display: inline-block; width: 50%">
            <p>Right side</p>
<pre>
display: inline-block;
width: 50%;
</pre>
        </div>
    </div>
</div>

**Why?**

The reason is the indentation of the code, did you notice the white spaces?
While it is **crucial** to keep your code clean and easy to read, it introduces issues with the white space it inserts.

## Don't

### Don't use magic numbers

Many people would be tempted to slightly reduce the width of the elements until both elements align correctly.
Reducing the width compensates the additional width taken by the white space.

```css
.split-50{
    /* /!\ magic numbers are a trap */
    width: 49%;
}
```

Although it offers quick results, reducing the size of the screen or changing the font size will quickly make it break.

**Why is it not appropriate?**

It is not appropriate because the width taken by the white space is constant.
The width taken by 1% varies in function of the width of the parent element.
Removing 1% or 2% will be enough on big screens, but not for small ones.

<div class="mer-resizable">
    <div>
        <div style="display: inline-block; width: 49%">
            <p>Left side</p>
<pre>
display: inline-block;
width: 49%;
</pre>
        </div>
        <div style="display: inline-block; width: 49%">
            <p>Right side</p>
<pre>
display: inline-block;
width: 49%;
</pre>
        </div>
    </div>
</div>

### Don't use position absolute

Placing the element absolutely solves the problem caused by the white space but has other downsides.

```css
.container {
    position: relative;
}

.split-50-left,
.split-50-right {
    position: absolute;
    top: 0;
    width: 50%;
}

.split-50-left {
    left: 0;
}
.split-50-right {
    right: 0;
}
```

```html
<div class="container">
    <div class="split-50-left">Left side</div>
    <div class="split-50-right">Right side</div>
</div>
```

Absolute elements are not *in the flow* of the document (it does not mean they are out of fashion, well... kind off).
As a direct effect, all elements coming after will place themselves ignoring the space taken by the split panels.

Elements *in the flow* have their width and height influencing other elements.

**Why is it not appropriate?**

One of the many reasons why is because the element's height differs based on the screen space.
As the lines wrap on smaller screens, the element will need more height and should push the rest below.
Elements positioned absolutely cannot do that.

<div class="mer-resizable" style="height: 250px">
    <div style="position: relative;">
        <div style="position: absolute; top:40px; left: 0; width: 50%">
            <p>Left side</p>
<pre>
position: absolute;
top:40px;
left:0;
width: 50%;
</pre>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </div>
        <div style="position: absolute; top:40px; right: 0; width: 50%">
            <p>Right side</p>
<pre>
position: absolute;
top:40px;
right: 0;
width: 50%;
</pre>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </div>
    </div>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</div>

In general, you should use `position: absolute` only when you want the element to be "*detached*" from the flow.
e.g. rendering independently of everything like a side panel, a modal dialog, snow flakes animation...

Finishing with a side joke, "For life as for layouts, not everything is absolute".


### Don't use white-space: nowrap;

```css
.container {
    white-space: nowrap;
}

.split-50 {
    display: inline-block;
    width: 50%;
}
```

```html
<div class="container">
    <div class="split-50">Left side</div>
    <div class="split-50">Right side</div>
</div>
```

`white-space: nowrap;` allows to force the browser not to wrap on a new line when a white space is present.
When you set it on an element, you will need to reset the default behavior on its children.

While so far it is the less of many evils, it is still not perfect.
You can see on the example below the gap caused by the white space as well as the content hidden on the right edge.

<div class="mer-resizable" style="height: 250px">
    <div style="white-space: nowrap; background-color: red;">
        <div style="display: inline-block; width: 50%; white-space: normal; background-color: #ccc;">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
<pre>
display: inline-block;
width: 50%;
white-space: normal;
background-color: #ccc;
</pre>
        </div>
        <div style="display: inline-block; width: 50%; white-space: normal; background-color: #ccc;">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
<pre>
display: inline-block;
width: 50%;
white-space: normal;
background-color: #ccc;
</pre>
        </div>
    </div>
</div>


### Don't hack the font-size

In the rare case your browser does not support `display: flex`,
this solution could be the simplest and the least prone to side issues.
However, following [Caniuse#Flexbox](http://caniuse.com/#feat=flexbox);
it should be supported by over 90% of the devices.

Set the font-size to 0 to void the space taken by the white space.
Then reset the font-size on the children elements.

```css
.container {
    font-size: 0;
}

.text {
    font-size: 1.2rem;
}
```

```html
<div class="container">
    <div class="text">Left side</div>
    <div class="text">Right side</div>
</div>
```

## DO instead

### Flex boxes

The flex boxes are very handy in many situations.
In this case, they can be used in the following way to solve the issue:

```css
.container {
    display: flex;
    flex-wrap: nowrap;
}
.split-50 {
    flex-basis: 50%;
}
```

That simple? yes!

<div class="mb-3">
<p data-height="500" data-theme-id="light" data-slug-hash="qPwNLN" data-default-tab="html,result" data-user="marc-ed-raffalli" data-embed-version="2" data-pen-title="Flex box demo for horizontal split" class="codepen">See the Pen <a href="https://codepen.io/marc-ed-raffalli/pen/qPwNLN/">Flex box demo for horizontal split</a> by Marc Ed Raffalli (<a href="https://codepen.io/marc-ed-raffalli">@marc-ed-raffalli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</div>
