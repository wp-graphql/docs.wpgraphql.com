---
title: About
description: About the WPGraphQL WordPress plugin
path: about
---

## What is WPGraphQL

WPGraphQL is a free, [open-source](https://github.com/wp-graphql/wp-graphql) WordPress plugin that provides an 
extendable GraphQL schema and API for any WordPress site.

Here you can read about major concepts, dive into technical details or follow practical examples to learn how WPGraphQL works.

> ### Beta Software Notice
> Until WPGraphQL hits a 1.0.0 release, it is still considered beta software. This doesn't mean that the plugin isn't 
> ready for use, it just means that there might still be bugs and that there might be breaking changes to the shape of 
> the API or internal functions as we work toward a stable release.
> 
> Don't hesitate to start using the plugin, but just be sure to follow along with releases and keep up to date with 
> conversations in Slack [join here](https://wpgql-slack.herokuapp.com/)
> 
> WPGraphQL is already in use in production on several sites, including [work.qz.com](http://work.qz.com), 
> [hopelabs.org](http://hopelab.org) and more.

## Why WPGraphQL?

WordPress has evolved from a blog, to a CMS and now to a full-fledged application platform. As WordPress has evolved, many APIs
have evolved or been introduced to push forward the WordPress platform. The theme and plugin APIs made WordPress approachable
to the wider developer ecosystem. The custom post type and custom taxonomy APIs pushed WordPress into the age of being a full
CMS. And with the introduction of the REST API WordPress began to show potential for being a full application platform.

While the REST API is a great advancement for WordPress, building applications with REST can be problematic. REST APIs 
tend to lead to a lot of simultaneous over & under fetching of data, lots of endpoints – often with poor or no documentation,
a lot of duplicate code on the server, and difficulties versioning. 

When REST is used heavily for application development, the pain points can be overwhelming. For Facebook, it was an existential crisis tha needed to be solved.

When Facebook first launched their native apps, they were slow. The overhead and complexity of using REST endpoints caused poor performance in their 
applications. They needed a way to send as little data across the wire in as few requests as possible. Thus came GraphQL.

[GraphQL](http://graphql.org) is a query language for APIs and a runtime for fulfilling those queries with your existing data.

<Info>Facebook's mobile apps have been powered by GraphQL since 2012. A GraphQL spec was open sourced in 2015 and is now available in many environments and used by teams of all sizes.</Info>

