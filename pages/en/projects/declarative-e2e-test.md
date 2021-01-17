---
layout:       topic
lang:         en
ref:          declarative-e2e-test
parent:       projects
permalink:    /en/projects/declarative-e2e-test

title:        declarative-e2e-test
description:  Node based declaration driven test generator for backend API.
tags:         [API, Automation, e2e, HTTP, JS, Node, NPM, REST, Supertest, Test, TypeScript]
---

{% include project-tags.html ref=page.ref typescript=true %}

The TypeScript typings are provided with the package.

Write End-to-End tests for your backend in an easy, clutter free, object based style!

The package `declarative-e2e-test` is replacing the older implementation `lb-declarative-e2e-test`.
This new implementation brings:
- TypeScript
- No dependency on any test library. In other words, you can use Jest, Jasmine, Mocha or any library you like
- Multiple expectation statements
- No longer specific to Loopback. You can test any backend using the endpoint URL.

{% assign project=site.data.projects.list | where:'ref', page.ref | first %}
{% include project-links.html project=project showLabel=true %}


[testGen]: ./declarative-test-structure-generator
[testGen#testSuiteDefinition]: ./declarative-test-structure-generator#test-suite-definition
[testGen#testDefinition]: ./declarative-test-structure-generator#test-definition
[testGen#testSuiteDefinitionStructure]: ./declarative-test-structure-generator#test-suites-definition-structure
[testGen#hooks]: ./declarative-test-structure-generator#test-hooks
[testGen#runOnlySkip]: ./declarative-test-structure-generator#run-only--skip

[debug]: https://www.npmjs.com/package/debug
[chaiDeepMatch]: https://www.npmjs.com/package/chai-deep-match
[loopback]: https://loopback.io/
[mocha]: https://mochajs.org/
[supertest]: https://github.com/visionmedia/supertest/
[superagent]: https://visionmedia.github.io/superagent/
