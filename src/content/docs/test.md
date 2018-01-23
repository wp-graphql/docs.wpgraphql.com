---
title: Test
path: test
---

## Getting Started with GraphQL Queries 

This is an example of a simple GraphQL query, querying for a Post and asking for the Post ID and Title.

<Playground title="Query for a with ID and Title">
{
  post {
    id
    title
  }
}
</Playground>

## Asking for more fields

This is an example of a simple GraphQL query, asking for a Post with more fields.

<Playground title="Query for a Post with more fields">
{
  post {
    id
    title
    date
    excerpt
  }
}
</Playground>

<Playground title="hugh momma">
{
  post {
    id
  }
}
</Playground>