---
layout:       topic
lang:         en
ref:          apollo-hooks-extended
parent:       projects
permalink:    /en/projects/apollo-hooks-extended

title:        apollo-hooks-extended
description:  Library of additional hooks and wrappers for Apollo Client
tags:         [Apollo, GraphQL, React, NPM, TypeScript]
---

{% include project-tags.html ref=page.ref typescript=true %}

The TypeScript typings are provided with the package.

This package is a complementary library providing additional features for
[@apollo/client](https://www.apollographql.com/docs/react/).


{% assign project=site.data.projects.list | where:'ref', page.ref | first %}
{% include project-links.html project=project showLabel=true %}
