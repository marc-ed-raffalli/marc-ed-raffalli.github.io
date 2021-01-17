---
layout:       topic
lang:         en
ref:          declarative-test-structure-generator
parent:       projects
permalink:    /en/projects/declarative-test-structure-generator
hasCodeBlock: true

title:        declarative-test-structure-generator
description:  Node based declaration driven test structure generator. Used as dependency and central point for docs.
tags:         [Automation, Bdd, Generator, TypeScript, js, Mocha, Jest, Jasmine, Node, NPM, Structure, Test]
---

{% include project-tags.html ref=page.ref typescript=true %}

The TypeScript typings are provided with the package.

This page is dedicated to the latest version.
The documentation for v0 is available [here](./declarative-test-structure-generator-v0).

`declarative-test-structure-generator` allows writing tests in an object definition style.

```js
{
  'Object syntax': {
    tests: {
      'sample test 1': {
        test: () => {
          expect(1 + 2).toEqual(3);
        }
      },
      'skipped test': {
        skip: true,
        test: () => {
          expect(5 + 8).toEqual(13);
        }
      }
    }
  }
}
```

As of version 1, the API has been refactored to be standalone, it no longer packs any specific test framework.
The API needs to be mapped using pre-built or custom mappers (see below).

## Motivations

The main motivation for this package was to isolate and reuse the test generation mechanism implemented in
[another of my projects](./lb-declarative-e2e-test).
Mapping the test framework API to be object based allows to generate tests more simply (as well as reduce code required).

## Disclaimer

This package has not been written as a new way to write tests.

## Installation

```bash
npm install -D declarative-test-structure-generator

# or
yarn add -D declarative-test-structure-generator
```

## Test framework API

As mentioned above, no test framework is provided with the package in order to ease the update and offer more flexibility.
The structure definition syntax stays exactly the same between frameworks.

In order to facilitate the usage, the mapping for `jasmine`, `jest` and `mocha` is provided.

```typescript
import {api, run, TestSuiteDefinition} from 'declarative-test-structure-generator';

run(definition, {api: api.jest});
// or
run(definition, {api: api.mocha});
// or
run(definition, {api: api.jasmine});
```

See examples for all 3 in the [GitHub repository][apiMapperExamples].

It is possible to provide a custom mapper to the `api` config by following the `IApiMapper` interface (see Jest example):

```typescript
const jestApiExample = {
  describe,
  it,
  before: beforeAll,
  beforeEach,
  after: afterAll,
  afterEach,
  only: {
    describe: describe.only,
    it: it.only
  },
  skip: {
    describe: describe.skip,
    it: it.skip
  }
}
```

## Examples

### Syntax - Object / Array

```typescript
import {api, run, TestSuiteDefinition} from 'declarative-test-structure-generator';

const definition: TestSuiteDefinition = {
  'Object syntax': {
    tests: {
      'sample test 1': {
        test: () => {
          expect(1 + 2).toEqual(3);
        }
      },
      'skipped test': {
        skip: true,
        test: () => {
          expect(5 + 8).toEqual(13);
        }
      }
    }
  },
  'Array syntax': {
    tests: [
      {
        name: 'sample test 1',
        test: () => {
          expect(1 + 2).toEqual(3);
        }
      },
      {
        name: 'sample test 2',
        test: () => {
          expect(5 + 8).toEqual(13);
        }
      }
    ]
  }
};

run(definition, {api: api.jest});
```

As illustrated above, both syntaxes are supported: object / array based.
The provided `definition` (top-level) can either be an object or an array.
Note the `name` property is required when using the array syntax.

Read the [test suite definition](#test-suite-definition) and the [test definition](#test-definition) for additional details on the API.

### Nesting test suites

The test suite definition allows for nested structure in both syntax:

```js
{
  'Object syntax': {
    tests: {
      'sample test 1': {
        test: () => {
        }
      },
      'Nested Test suite lvl 2': {
        tests: {
          'nested test': {
            test: () => {
            }
          },
          'Nested Test suite lvl 3': {
            // each definition is independent
            // you can set hooks, skip, only...
            skip: true,
            tests: {
              'nested test': {
                test: () => {
                }
              },
              'nested test 2': {
                test: () => {
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Run only / skip

The properties `skip` and `only` allow to skip or only run a particular test.

It is a time saver when focusing / debugging a test.
Read more extensively on the documentation of your test framework.

See usage in the [test suite definition](#test-suite-definition) / [test definition](#test-definition).

```typescript
{
  'sample test 1': {
    only: true,
    test: () => {
      expect(1 + 2).toEqual(3);
    }
  },
  'skipped test': {
    skip: true,
    test: () => {
      expect(1 + 2).toEqual(3);
    }
  },
}
```

### Test hooks

It is possible to run one or many functions at different phase of the test.

The hook definition is as follow:
- `before`: is called once, before all tests.
- `beforeEach`: is called before each test.
- `after`: is called once, after all tests.
- `afterEach`: is called after each test.

Multiple hooks of the same type are supported using an array.
Each hook is called in the specified order.

Additionally, provided your test library supports it, the following features are supported:
- Set context in the `before` or `beforeEach` hook via `this` and a `function() {}` used for the hook.
- Async hooks via:
  - done callback
  - return of Promise

```typescript
run({
  'Object syntax': {
    before: function() {
      this.definedValue = 'Bill'
    },
    beforeEach: [
      () => {
        // do something
      },
      (done) => {
        // do something async
        done();
      },
      () => {
        // do something async
        return somePromise;
      }
    ],
    after: () => {
    },
    afterEach: () => {
    },
    tests: {
      'sample test 1': {
        test: function() {
          // illustrates value set in the context of the before hook
          expect(sayHello(this.definedValue)).toEqual('Hello Bill');
        }
      }
    }
  }
})
```


## Definitions

### Test suite definition

The test suite definition accepts the following:

```text
{
  skip:       {boolean}
  only:       {boolean}
  before:     {function | Array[function]}
  beforeEach: {function | Array[function]}
  after:      {function | Array[function]}
  afterEach:  {function | Array[function]}
  tests:      {Array<TestSuiteDefinition | TestDefinition> | Object<string, TestSuiteDefinition | TestDefinition>}
}
```

`tests` accepts either tests suites or tests as an object or an array.

Refer to the examples:
- [Test hooks](#test-hooks)
- [Run only / skip](#run-only--skip)
- [Nesting test suites](#nesting-test-suites)


### Test definition

The test definition accepts the following:

```text
{
  skip:       {boolean}
  only:       {boolean}
  test:       {function}
}
```
The `name` must be provided when using the array syntax.

- `test`: test function.

Refer to the examples:
- [Run only / skip](#run-only--skip)


[apiMapperExamples]: https://github.com/marc-ed-raffalli/declarative-test-structure-generator/tree/master/docs
