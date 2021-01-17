---
layout:       topic
lang:         en
ref:          time-sheet-automation-chrome-extension
parent:       projects
permalink:    /en/projects/time-sheet-automation-chrome-extension
hasCodeBlock: true

title:        Timesheet Automation Chrome Extension
description:  Simple solution to automate timesheet reporting.
              Save yourself the hassle of writing the same time-in, time-out for every worked day of the month!
tags:         [Chrome extension, Timesheet, Automation, Don't repeat... automate, HTML, CSS, js]
---

<div class="text-center">
  <div class="font-italic font-weight-bold fs-4">
    "How would you feel if you could sort out your timesheet reporting in 3 clicks?"
  </div>

  This project is to palliate for bad UX in some timesheet reporting software.

  <div class="mt-3">
    <a href="https://chrome.google.com/webstore/detail/fill-my-timesheet/ghjamlegpfehemlapljopkoaacihgapg">Visit store page</a>
  </div>
</div>

## Motivations

We probably all went through the same thing at one moment or another... repetitive timesheet reporting.

Over and over again, every month, probably the same hour in and out, which makes about 40 manual actions on some UIs.

```js
switch (comment) {
  case `Smarty pants: "use copy paste!"`:
    return 'Yes, but it is still 40 actions.';

  case `Jane Doe: "We don't use timesheet at work"`:
    return 'Lucky you :D';

  case `John Doe: "I'm payed anyway"`:
    throw Error('Nope');

  default:
    return 'There is surely a better way'
}
```

Timesheet reporting is not always put in place by an evil sadistic management.
Yes, despite some common beliefs.

Main argument to attempt to bust this myth:

**It is a money sink on so many levels**

- Timesheet service fee
- Timesheet solution maintenance
- Time lost by employees to fill the report
- Time lost by employees ranting about it ;)
- probably more...

The main reason is simply
[legal compliance](https://www.citizensinformation.ie/en/employment/employment_rights_and_conditions/hours_of_work/employment_working_time_records.html).


## Vision

Let's close our eyes and think what would be the best solution!

> A world without timesheet? - well tried `¯\_(ツ)_/¯`

> Switch to the perfect timesheet software? - `( ^ ᗜ ^ )` 🦄

> A frictionless timesheet report? - That's doable, let's see how

While we cannot update the whole interface, we can automate the report by leveraging the power of browser extensions.

Since most of you arrive and leave roughly at the same time everyday, but probably not everybody works on the same days.

- Input field for time in
- Input field for time out
- Checkboxes to select the days

- Some auto-magic
- The submit button left to click

We can improve this further by caching the form data and repopulating the values next time.


## Implementation

### High level concepts / getting started

#### How to write a Chrome extension

There is a great video published by [Traversy Media](https://www.youtube.com/TraversyMedia)
which is going through the whole process in less than 30 minutes.
While it only covers a part of the API required to implement the vision, it was very helpful and encouraging regarding the complexity.

<iframe
  width="560" height="315" style="max-width: 100%;"
  src="https://www.youtube.com/embed/wHZCYi1K664"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

The extension file revolves around a manifest file:
[Manifest File Format](https://developer.chrome.com/apps/manifest)

Declare the permissions required for the extension:
[Declare Permissions](https://developer.chrome.com/apps/declare_permissions)

Chrome extensions page: [chrome://extensions/](chrome://extensions/)

**Tips:**
- The tab with the page action should be refreshed after reloading the extension changes.
- Some of the changes are visible without being reloaded e.g. popup styles.


##### Execute script on the page

Script execution on the page is possible via the
[Content Scripts](https://developer.chrome.com/extensions/content_scripts)

> Content scripts are files that run in the context of web pages.
> By using the standard Document Object Model (DOM), they are able to read details of the web pages the browser visits, make changes to them and pass information to their parent extension.

The content script is associated to the target page using the
[Match Patterns](https://developer.chrome.com/extensions/match_patterns).

In the `manifest.json`:

```json
{
  "content_scripts": [
    {
      "matches": [
        "domain match pattern"
      ],
      "js": [
        "content.js"
      ]
    }
  ]
}
```


##### Display a popup to trigger an action on the page

There are two ways to display a popup:

- [Page Action](https://developer.chrome.com/extensions/pageAction):
  Most suited as the extension needs to be active only on a limited set of pages.
- [Browser Action](https://developer.chrome.com/extensions/browserAction):
  Shows the popup for all pages, not suited for our use case.

In the `manifest.json`:

```json
{
  "page_action": {
    "default_title": "Complete form to automatically fill the timesheet",
    "default_popup": "popup.html"
  }
}
```


##### Popup to page script communication

The scopes of the script running on the page and the popup are isolated.
The communication is achieved through messaging system.

```js
chrome.tabs.sendMessage(tabId, message, responseCallback);
```

```js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // message handler
});
```

Promisified wrapper to get the current tab:

```js
return new Promise(resolve => {
  chrome.tabs.query({currentWindow: true, active: true}, (tabs) => resolve(tabs[0]));
});
```


##### Enable popup on specific URL

The type of popup used is not enabled by default.
In order to enable it for specific pages, we should listen to tab updates in a background task.

[Manage Events with Background Scripts](https://developer.chrome.com/extensions/background_pages)

In the `manifest.json`:

```json
{
  "background": {
    "scripts": [
      "background.js"
    ],
    "persistent": false
  }
}
```

The permission to access tab URL needs to be added to the existing list in the `manifest.json`:

```json
{
  "permissions": [
    "tabs"
  ]
}
```

In `background.js`:

```js
function onUpdate(tabId, changeInfo, tab) {
  // the status will change a lot based on the page
  // only carry on when the page is loaded
  if (!tab || !tab.url || changeInfo.status !== 'complete') {
    return;
  }

  const siteSupported = tab.url.match(/some logic here/) !== null;

  if (siteSupported) {
    chrome.pageAction.show(tabId);
  }
}

chrome.tabs.onUpdated.addListener(onUpdate);
```


##### Give the form some memory

In order to improve the UX of the extension, the form should remember the previously submitted values.

The permission to access the storage needs to be added to the existing list in the `manifest.json`:
```json
{
  "permissions": [
    "storage"
  ]
}
```

Promisified wrapper for the storage API:

```js
function getStoredValue(key) {
  return new Promise(resolve => {
    chrome.storage.sync.get([key], (res) => resolve(
      res && res.hasOwnProperty(key)
        ? res[key]
        : undefined
    ));
  });
}
```

```js
function storeValue(d) {
  return new Promise(resolve => chrome.storage.sync.set(d, resolve));
}
```


#### Automate the timesheet report page

This part covers more plain JS rather than Chrome extension specific topics.


##### Isolate and reuse when possible

It is very common to address similar issues in different location of a program.
Generally, a dedicated module would be created and common logic placed there.

The manifest allows to load multiple files for the `content_scripts` or it is also possible to load any script files from the popup.

Each JS file is executed in a similar way as for a standard page.
Functions, constants, etc impact the global scope and can potentially affect other files.

IIFE helps to isolate scope and prevent polluting the global scope.
[MDN IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)


Create a file e.g. `shared.js` and import it where the common logic is needed.

```js
const shared = (() => {

  const sharedConstant = 123;
  const privateConstant = 456;

  function sharedLogic() {
    // some code there
  }

  function privateLogic() {
    // some code there
  }

  return {
    sharedLogic,
    sharedConstant
  };
})();
```


##### Hack your way in the console first

Reverse engineering a web page could be tricky.
Luckily, the DevTools allows to run scripts and probe event handlers programmatically in the console.
These scripts form the core of the screen interactions and are then integrated in the extension along with few stability improvements.

**Tips:**

- You can quickly access an element in the console by pointing it on the element panel.
  It will be accessible under the alias `$0` in the console.
- You can view all event handlers for a given element using `getEventListeners($0)`.

##### Wait for a condition, not a specific timeout

The script needs to fill a text area in a modal dialog.
In order to do this, it should wait until the dialog is opened, not how long it should take to open.

Doing this will allow to make the script more robust and limit the wait.
This concept is paramount in testing, it applies too in many areas.

**Tips:**

When waiting for a condition to be true, an infinite loop will probably be used.
It is important to plan an escape hatch (simple timeout) in case the condition is never met e.g. unexpected screen state.

```js
// part of shared API, see above.
const utils = {
  wait: (delay) => {
    return new Promise((res) => setTimeout(res, delay));
  },
  waitForIt: async (cb, timeout = 2000) => {
    let res = cb();
    const ts = Date.now();

    while (!res) {
      if (Date.now() - ts > timeout) {
        throw new Error('Timeout for wait callback');
      }

      await utils.wait(100);
      res = cb();
    }

    return res;
  }
};
```


### First phase

The first implementation had the following popup and message on the page.

{% include img.html src='/assets/projects/fill-my-timesheet/v1-popup.png' alt='Popup screenshot - v1' %}
{% include img.html src='/assets/projects/fill-my-timesheet/v1-screenshot.png' alt='General screenshot - v1' %}


### Second phase

Unfortunately, some parts of part one had to be re-visited due to a re-painting issue in the popup on the items located below ~250px.
The simplest version of the popup did not comfortably fit the form without having re-painting issues.

As a solution the form was moved to an options page and the popup updated with a select box.
[Options page](https://developer.chrome.com/extensions/options)


{% include img.html src='/assets/projects/fill-my-timesheet/v2-popup.png' alt='Popup screenshot - v2' %}
{% include img.html src='/assets/projects/fill-my-timesheet/v2-screenshot.png' alt='General screenshot - v2' %}

## Issues encountered

It is worth mentioning the following issues:

- Repainting issues encountered on the items located below ~250px:

  Forced to refactor the UI to isolate the form into an option page.

- `url` property undefined in tab object:

  Permission for `"tabs"` missing.

- Message handler does not trigger when the message is sent within the same context:

  The goal was to decouple files in the `content_scripts`.
  Finally after finding no solution online, I implemented a simple proxy for message handling.


## Extending to other timesheet software

The current implementation is tailored for PurelyHR platform but only a few changes would be required to add support for another platform.

The `content_scripts` handles the common steps e.g. show the message with the backdrop, then emits the message `timesheet-fill` with the details.

In order to support another timesheet report, add it to the `manifest.json` and script the filling of the form.

The code is available in
[Github](https://github.com/marc-ed-raffalli/fill-my-timesheet)
