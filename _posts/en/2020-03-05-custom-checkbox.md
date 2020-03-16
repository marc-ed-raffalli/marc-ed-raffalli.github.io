---
layout:      topic
lang:        en
ref:         custom-checkbox
parent:      posts
title:       How to create a custom checkbox
description: Quick tutorial showing a basic implementation for a custom checkbox.
date:        2020-03-05
tags:        [tutorials, frontend, css]
keywords:    [
css,
html,
custom,
layout,
markup,
short,
tutorial,
web
]
---

This post is both to preserve a quick experiment for later use and to show how easy it is to implement a custom checkbox.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="marc-ed-raffalli" data-slug-hash="OJVxqbw" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Custom checkbox">
  <span>See the Pen <a href="https://codepen.io/marc-ed-raffalli/pen/OJVxqbw">
  Custom checkbox</a> by Marc Ed Raffalli (<a href="https://codepen.io/marc-ed-raffalli">@marc-ed-raffalli</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


```css
.checkbox {
  position: relative;
  padding: 8px 8px 8px 40px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 2px;
  margin: .25rem 0;
  user-select: none;
}

.checkbox:hover {
  background-color: rgba(0, 0, 0, .15);
}

.checkbox:hover:before {
  border-right: 1px solid #999;
}

.checkbox:active {
  background-color: rgba(0, 0, 0, .25);
}

.checkbox:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;

  width: 30px;
  height: 30px;
  margin: auto;
  line-height: 30px;
  border-right: 1px solid #ccc;
  text-align: center;
  font-size: 1.25rem;
}

.checkbox.checked:before {
  content: '✓';
}
```

```html
<div class="checkbox">Default state</div>
<div class="checkbox checked">Checked state</div>
```

```js
document.querySelectorAll('.checkbox').forEach(e => {
  e.addEventListener('click', toggleCheckbox);
  e.addEventListener('keypress', keyPressProxy);
});

function keyPressProxy(e) {
  e.preventDefault();

  if (e.code === 'Enter' || e.code === 'Space') {
    toggleCheckbox(e);
  }
}

function toggleCheckbox(e) {
  e.preventDefault();
  e.stopPropagation();

  const elt = e.target;

  if (elt.classList.contains('checked')) {
    elt.classList.remove('checked');
    return;
  }

  elt.classList.add('checked');
}
```
