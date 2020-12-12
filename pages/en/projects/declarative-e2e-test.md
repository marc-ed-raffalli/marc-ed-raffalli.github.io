---
layout:       topic
lang:         en

ref:          declarative-e2e-test
parent:       projects

title:        declarative-e2e-test

description:  Node based declaration driven test generator for backend API.

permalink:    /en/projects/declarative-e2e-test
tags:         [API, Automation, e2e, HTTP, JS, Node, NPM, REST, Supertest, Test, TypeScript]
---

[![Build Status](https://travis-ci.org/marc-ed-raffalli/declarative-e2e-test.svg?branch=master)](https://travis-ci.org/marc-ed-raffalli/declarative-e2e-test)
[![Coverage Status](https://coveralls.io/repos/github/marc-ed-raffalli/declarative-e2e-test/badge.svg?branch=master)](https://coveralls.io/github/marc-ed-raffalli/declarative-e2e-test?branch=master)
[![NPM version](https://img.shields.io/npm/v/declarative-e2e-test.svg)](https://www.npmjs.com/package/declarative-e2e-test)

Write End to End tests for your backend in an easy, clutter free, object based style!

The package `declarative-e2e-test` is replacing the older implementation `lb-declarative-e2e-test`.
This new implementation brings:
- TypeScript
- No dependency on any test library. In other words, you can use Jest, Jasmine, Mocha or any library you like
- Multiple expectation statements
- No longer specific to Loopback. You can test any backend using the endpoint URL.


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
