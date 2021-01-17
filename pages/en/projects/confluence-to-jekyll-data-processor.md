---
layout:       topic
lang:         en
ref:          confluence-to-jekyll-data-processor
parent:       projects
permalink:    /en/projects/confluence-to-jekyll-data-processor

title:        Confluence to Jekyll data processor
description:  Node based data processor extracting data from HTML to a specific syntax in markdown for Jekyll generator.
              This script was implemented in order to facilitate the migration of IBM Loopback Confluence documentation towards Jekyll templates.
tags:         [Node, Confluence, Jekyll, Async, Cheerio, Chai, Mocha, data processor]
---

{{page.description}}

{% assign project=site.data.projects.list | where:'ref', page.ref | first %}
{% include project-links.html project=project showLabel=true %}
