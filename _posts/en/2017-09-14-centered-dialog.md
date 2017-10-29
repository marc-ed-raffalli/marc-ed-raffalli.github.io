---
layout:       topic
lang:         en
ref:          centered-dialog
parent:       posts
title:        Centered dialog
description:  This tutorial covers step by step how to implement a dialog box with a dimmed overlay.
date:         2017-09-12
tags:         [tutorials, frontend, css]
keywords:     [
absolute,
advice,
background,
beginner,
css,
css3,
dialog,
flex,
flex-basis,
flex-grow,
flex-shrink,
flexbox,
float,
html,
layout,
lesson,
markup,
recommendation,
short,
tutorial,
web,
]
---

Welcome on this series of short CSS tutorials.

{% include skipToTutorial.html %}

**Audience**

Anybody interested in web development, with the basic knowledge of HTML and CSS.

**Objective**

Show a horizontally and vertically centered element on top of an overlay.
All the styles are kept to the minimum for simplicity.

**Targeted / tested browsers**

- Chrome  (latest)
- Firefox (latest)
- Chrome for Android (latest)

**Techniques used**

- Flex boxes to center the dialog message
- Absolute positioning for overlay
- CSS pseudo element for overlay
- NO JavaScript


## Tutorial

### Content box

The content box, or the box containing the dialog, should be `position: relative`.
It does not need to be the direct parent of the dialog as long as it is the **first** parent positioned relatively.

No specific size is required as long as the height is greater than the height of the dialog's message.
We will cover this case further below.

```html
<div class="box">
    <!-- Dialog will go here -->
    <!-- Dummy box content -->
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</div>
```

```css
.box {
    position: relative;
}
```

### Dialog

The dialog the the element showing both the message and the overlay.

Setting `position: absolute` allows it to take the full height / width of its nearest relative parent.
In this example, it will be `.box`.

The dialog markup can be placed *anywhere* inside `.box`.

```html
<div class="dialog">
    <div class="message">Foo</div>
</div>
```

```css
.dialog {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    
    display: flex;
    justify-content: center; /* centers horizontally */
    align-items: center;     /* centers vertically */
}
```

### Overlay

Whichever method below is used, 
the overlay should be `position: absolute` with `top: 0` and `left: 0`.

#### Method 1: element

One way to display the overlay is to add it as an element, we will give it the class `overlay`.

```html
<div class="dialog">
    <div class="overlay"></div>
    <div class="message">Foo</div>
</div>
```

```css
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(160, 160, 160, 0.4);
}
```

This method is especially useful when the overlay requires to be styled dynamically, e.g. custom background color / image.
If this is not the case, you may be interested in the alternative method. 

#### Method 2: pseudo-element

It is possible to avoid adding the overlay as a DOM element by using CSS pseudo elements e.g. `:before`, `:after`. 

```html
<div class="dialog">
    <div class="message">Foo</div>
</div>
```

```css
.dialog:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(160, 160, 160, 0.4);
}
```

### Message

The dialog message should have `z-index: 1` to be displayed on top.

### Demo

<div class="mb-3">
<p data-height="500" data-theme-id="light" data-slug-hash="OxqKqK" data-default-tab="html,result" data-user="marc-ed-raffalli" data-embed-version="2" data-pen-title="Simple CSS only modal dialog" class="codepen">See the Pen <a href="https://codepen.io/marc-ed-raffalli/pen/OxqKqK/">Simple CSS only modal dialog</a> by Marc Ed Raffalli (<a href="https://codepen.io/marc-ed-raffalli">@marc-ed-raffalli</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
</div>

### Common issues

**Rendering issues** 

Check the following:

- The content box has `display: block` or similar. (Not `inline` / `none`)
- If the pseudo element (method 2) is used, `.dialog:before` has `content: ''`

**Message text overflows horizontally**

- If your message is longer than a couple of words, you may consider using `max-width: 75%` (or any % value).
- If your message is one long word without break, you can either:
  - force it to wrap to the next line with `word-break: break-word;`
  - keep one line and display `...` by applying these rules to the element containing the text
    ```css
    .message { 
      text-overflow: ellipsis;
      overflow: hidden;
    }
    ```

**Message text overflows vertically**

- If your message height is greater than your box height, 
  you should apply these styles:
  ```css
  .message {
    max-height: 50%;  /* force a specific maximum height */
    overflow-y: auto; /* show a scrollbar when the maximum height is reached */
  }
  ```

### Conclusion

Glad you reached this part!

I hope at this point your dialog is showing correctly.
If not, make sure to check out the section about common issues!
