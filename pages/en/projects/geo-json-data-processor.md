---
layout:       topic
lang:         en
ref:          geo-json-data-processor
parent:       projects

title:        Countries GeoJson data processor

description:  Node based data processor, merges two sets of data into one.
              It provides each country geometry and different properties such as country name and capital as well as population, lat/lng, area, etc
              The generated data is used by another of my project, the game "World Geography Game".

permalink:    /en/projects/geo-json-data-processor
tags:         [Node, Async, Chai, Mocha, Geography, data processor]
---

{% assign projects=site.data.projects %}
{% assign translatedPages=site.pages | where:'lang', page.lang %}

{% assign geoGameProject=projects.list | where:'ref', page.ref | first %}
{% assign geoGameTranslatedPageDef=translatedPages | where:'ref', 'geo-game' | first %}

Node script extracting data from different sources in order to build the data set required for the
[{{geoGameTranslatedPageDef.title}}]({{site.baseurl}}{{geoGameTranslatedPageDef.url}}) v1 project.  

{% include gitHubCodeOn.html url=geoGameProject.repo %}

## Background

This project was driven by the need to get data for the first version of the
[{{geoGameTranslatedPageDef.title}}]({{site.baseurl}}{{geoGameTranslatedPageDef.url}}) project.

The sources available did not provide a data set fitting the game requirements.
The goal was to combines these data sets:

- [Ash Kyd](https://github.com/AshKyd/geojson-regions)
- [Mohammed Le Doze](https://github.com/mledoze/countries)


## Approach

The design was kept simple, a simple node script to read and extract the data from the sources.
The data sets should to be cloned before running the script.

The script receives the path for the targeted data in each sources as well as the output path.

**Example:**

```bash
node .  --geoJson     ../geojson-regions/countries/50m/all.geojson \ 
        --countries   ../countries/countries.json                  \ 
        --flags       ../countries/data/                           \
        --output      dist                                         \
        --outputFlags dist/flags    
```

- `geoJson`: Path to the file in the *geojson-regions* repository providing a collection of features
  50m precision is used in the example above, but any should work
- `countries`: Path to the file in the *countries* repository providing the list of country data
- `flags`: Path to the flags directory in the *countries* repository
- `output`: Path to the directory where to store the output data
- `outputFlags`: Path to the directory where to store the flags


## Implementation

### CLI & JS API

The project is mainly planned for CLI usage, however the `process.argv` is reduced to an Object mapping the key values. 
The resulting object is passed to the JS API (which can also be called directly).

### Flow based

Each step of the flow is a module in `src/steps` which is designed in a I/O fashion, making testing easy.

The steps are called serially using [Async/waterfall](https://caolan.github.io/async/docs.html#waterfall)

### Testing

As described above, each step is a function receiving the result from the previous step.
The tests written are using [Mocha](https://mochajs.org/) + [Chai BDD](http://chaijs.com/api/bdd/), which also have a good integration with WebStorm.


## Credits

Special thanks to 
[Ash Kyd - GeoJson regions](https://github.com/AshKyd/geojson-regions) 
and 
[Mohammed Le Doze - Countries](https://github.com/mledoze/countries)
for their projects gathering the countries data.

As well as:

- [Async](https://caolan.github.io/async/)
- [debug](https://www.npmjs.com/package/debug)
- [filecopy](https://www.npmjs.com/package/filecopy)
- [mkdirp](https://www.npmjs.com/package/mkdirp)
- [Mocha](https://mochajs.org/)
- [Chai](http://chaijs.com/api/bdd/)
