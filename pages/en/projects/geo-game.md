---
layout:       topic
lang:         en
ref:          geo-game
parent:       projects

title:        World Geography Game

description:  Discover or refresh your geography in an easy and interactive way.
              Find the countries by name, capital or flag and learn much more about each country.

permalink:    /en/projects/geo-game
tags:         [React, Redux, React Router, Leaflet, Bootstrap 4, deployment, game]
---

{% assign projects=site.data.projects %}
{% assign geoGameProject=projects.list | where:'ref', page.ref | first %}

I long wanted to implement a game to help learning and remembering the countries of the world.
Sure, there is already a plethora of similar games already available online, but the motivation was more in the development aspect.

{% include gitHubCodeOn.html url=geoGameProject.repo %}

[**Play the game**]({{geoGameProject[0].page}}){:class="d-block text-center"}

## Principles

The principles planned for the first release were kept quite simple.

- Group the countries by area
- Support three game modes (country name, capital city or flag)
- Challenge the user to find a country within a defined area
- Set a timeout for each question
- Keep track of the current game score
- Show the answers to the questions at the end

![Landing page]({{site.baseurl}}/assets/img/projects/geo-game/landing-page.png){:class="mer-img mer-shadedFrame p-2 mb-2"}

**Update 05/02/2018**

The v2 focused on bringing multi languages support with 20 languages.

![Landing page v2]({{site.baseurl}}/assets/img/projects/geo-game/landing-page-v2.png){:class="mer-img mer-shadedFrame p-2 mb-2"}

## Data

{% assign translatedPages=site.pages | where:'lang', page.lang %}

### Data v1

{% assign geoJsonTranslatedPageDef=translatedPages | where:'ref', 'geo-json-data-processor' %}
  
Data sources:

- [Ash Kyd](https://github.com/AshKyd/geojson-regions)
- [Mohammed Le Doze](https://github.com/mledoze/countries)

The data was crunched together in the
[{{geoJsonTranslatedPageDef[0].title}}]({{site.baseurl}}{{geoJsonTranslatedPageDef[0].url}}) project.
The output is under the following format: (*abbreviated for simplicity*)

```json
{
  "properties": {
    "id": "ITA",
    "name": "Italy",
    "continent": "Europe",
    "populationEstimate": 58126212,
    "lastCensus": 2012,
    "capital": "Rome",
    "latlng": [
      42.83333333,
      12.83333333
    ],
    "area": 301336,
    "translations": {
      "deu": {
        "official": "Italienische Republik",
        "common": "Italien"
      },
      // ...
    },
    "flag": "dist/flags/ITA.svg"
  },
  "geometry":{
    "type":"MultiPolygon",
    "coordinates":[
      // ...
    ]
  }
}
```

- `properties`   used by some core game features but also to provide more info about the country.
- `geometry`     used to show the countries' shape and implement the interactive feature.  
- `translations` will be used in the second release which should support multiple languages.

### Data v2

{% assign worldGeoDataTranslatedPageDef=translatedPages | where:'ref', 'world-geography-data-processor' %}

Data sources:

- [Unicode CLDR](https://github.com/unicode-cldr/)
  - Country containment (equiv: Continent => Region => Country)
  - Translated names for:
    - Languages
    - Continents
    - Regions / Sub-regions
    - Countries / territories
    - Capitals
  
- [Ash Kyd](https://github.com/AshKyd/geojson-regions)
  - Geo Json geometries
- [Mohammed Le Doze](https://github.com/mledoze/countries)
  - area
  - borders
  - capital city (en only)
  - latlng
  - flag


The data for v2 was reorganized into two groups:

- translation sensitive data (country names, capital) 
- generic data (geojson, flag, etc)

The data was crunched together in the
[{{worldGeoDataTranslatedPageDef[0].title}}]({{site.baseurl}}{{worldGeoDataTranslatedPageDef[0].url}}) project.
The languages to target in the extraction are passed as params, making painless the selection of supported locales. 


#### Output folder structure

```
flags/
  ABW.svg
  AFG.svg
  AGO.svg
  ...
geo-json/
  africa.json
  asia.json
  europe.json
  ...
locales/          --- localized data  
  bg/             --- by locale code
    africa.json   --- by continent
    asia.json
    europe.json
    ...
  ca/
  cs/
  ...
status.json       --- support of one language compared to English (count, pct, missing)
locales.json
```

Localized data sample for English:

```json
{
 "IE": {
    "name": "Ireland",
    "continent": "Europe",
    "locatedIn": [
      "Europe",
      "Northern Europe"
    ],
    "capital": "Dublin"
  }
}
```


## Implementation

It has been a while I wanted to get my hands dirty with React and Redux.
The learning curve was greatly reduced thanks to *Dan Abramov* who published two series of great tutorials available for free on Egghead.io.

- [Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux)
- [Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)

- [A Dummy’s Guide to Redux and Thunk in React](https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3) by Matt Stow
- [A Beginner's Guide to Redux Middleware](https://www.codementor.io/vkarpov/beginner-s-guide-to-redux-middleware-du107uyud) by Valeri Karpov

The App skeleton and the build are handled by
[Create React App](https://github.com/facebookincubator/create-react-app). 

## Localization

*Added on 05/02/2018*

The App localization was achieved with [react-localize-redux](https://ryandrewjohnson.github.io/react-localize-redux/)
(see [author's article](https://medium.com/@ryandrewjohnson/adding-multi-language-support-to-your-react-redux-app-cf6e64250050)) 

The loading of the translated data is done using async ES6 import to allow chunking of the bundle and reduce bandwidth usage.

## Map

A core part of the game and a key to its usability is the interactive map.

It was implemented with the components from 
[React Leaflet](https://github.com/PaulLeCam/react-leaflet/)
(*wrapper for [Leaflet](http://leafletjs.com/)*)
and uses the tiles from the free
[Mapbox](https://www.mapbox.com/) service. 

### Geo JSON layer

The [`GeoJSON`](https://github.com/PaulLeCam/react-leaflet/blob/master/docs/Components.md#geojson)
layer component is used to display the `geometry` (*mentioned above*), style the area or to listen to the different mouse events.

![Geo JSON layer]({{site.baseurl}}/assets/img/projects/geo-game/geo-json-layer.png){:class="mer-img mer-shadedFrame p-2 mb-2"}

### Marker layer

The [`Marker`](https://github.com/PaulLeCam/react-leaflet/blob/master/docs/Components.md#marker)
layer component is used to display the results at the end of the game.
Each marker is placed on the coordinates pointed by `properties.latlng` and listens to the click event.
On click, the map shows a custom popup with the country flag and information. 
 
![Marker layer]({{site.baseurl}}/assets/img/projects/geo-game/popup-layer.png){:class="mer-img mer-shadedFrame p-2 mb-2"}


## Analytics

Having insights on the game usage and popularity is a great source of motivation.
No longer than a few days after the first beta version was deployed, users from 4 countries already visited the page.
It is for sure a motivator to prioritize multi languages support.
  
I added Google Analytics to the App router to gather insights on the page views and audience of the game.
The library [react-ga](https://github.com/react-ga/react-ga) helped a lot and the integration was quick.

The component below logs the page views during development and sends the data to the service in production.

```js
if (NODE_ENV_PRODUCTION) {
  ReactGA.initialize(gaTrackingId);
}

class GoogleAnalytics extends Component {

  static onRouteChange() {
    const location = window.location,
      page = location.pathname + location.hash;

    if (!NODE_ENV_PRODUCTION) {
      console.log('ReactGA', {page: page});
      return;
    }

    ReactGA.set({page: page});
    ReactGA.pageview(page);
  }

  componentDidMount() {
    this.stopListening = this.props.history.listen(GoogleAnalytics.onRouteChange);
    GoogleAnalytics.onRouteChange();
  }

  componentWillUnmount() {
    this.stopListening();
  }

  // ...
}

export default withRouter(connect()(GoogleAnalytics));
```


## Deploy to GitHub pages

GitHub provides a way to serve static files from a repository directory or branch
[GitHub Pages](https://pages.github.com/).
It was a very convenient way to deploy the game without additional complication.

The deployment is managed with the CLI utility of
[npm gh-pages](https://www.npmjs.com/package/gh-pages).

- [create-react-app: docs for gh-pages](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#github-pages)

The only required configuration is on the `package.json`:
```json
"scripts": {
  "deploy": "gh-pages -d build"
}
```

The app routing did not work correctly on GitHub pages after the first deployment.
The issue was coming from GitHub pages not being configured to support the `BrowserRouter` (React Router).

Few solutions were possible, changing to `HashRouter` was the most straight forward.

## Credits

A big thanks to the authors of these libraries / resources:

**Libraries:**

- [React](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/)
- [Bootstrap](https://v4-alpha.getbootstrap.com/)
- [React Router](https://reacttraining.com/react-router/web/guides/philosophy)
- [React Leaflet](https://github.com/PaulLeCam/react-leaflet/)
- [Leaflet](http://leafletjs.com/)
- [Create React App](https://github.com/facebookincubator/create-react-app)
- [gh-pages](https://www.npmjs.com/package/gh-pages) (NPM)
- [redux-logger](https://github.com/evgenyrodionov/redux-logger)
- [redux-thunk](https://github.com/gaearon/redux-thunk)
- [react-ga](https://github.com/react-ga/react-ga)
- **v1**
- [react-ionicons](https://zamarrowski.github.io/react-ionicons/)
- [ionicons](http://ionicons.com/)
- **v2**
- [react-icons](http://gorangajic.github.io/react-icons/)
- [React Localize Redux](https://ryandrewjohnson.github.io/react-localize-redux/)

**Images:**
- [World Map](https://commons.wikimedia.org/wiki/File:Continents.svg)
